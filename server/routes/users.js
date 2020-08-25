import express from 'express'
import bcrypt from 'bcryptjs'
import nodemailer from 'nodemailer'
import mongoose from 'mongoose'
import { RateLimiterMongo } from 'rate-limiter-flexible'
import jwt from 'jsonwebtoken'
import validateRegister from '../validation/register'
import validateLogin from '../validation/login'
import validatePreferences from '../validation/preferences'
import User from '../models/User'

const router = express.Router()
router.post('/register', async ({ body }, response) => {
  const { errors, isValid } = validateRegister(body)
  if (!isValid) return response.status(400).json(errors)

  try {
    const { first, last, email, school, year, password } = body
    const user = await User.findOne({ email })
    if (user)
      return response.status(400).json({ email: 'Email already exists.' })

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    const newUser = new User({
      first,
      last,
      email,
      school,
      year,
      password: hash,
      salt,
    })

    const savedUser = await newUser.save()
    response.json(savedUser)

    const testAccount = await nodemailer.createTestAccount()
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    })

    const url = `hetchie.com/api/users/verify?a=${salt}`
    const info = await transporter.sendMail({
      from: '"Leo Alfred" <leo@hetchie.com>',
      to: 'jon@doe.com',
      subject: 'Confirm your account',
      html: `<p>Confirm your account by clicking <a href="${url}">here</a></p>`,
    })

    const emailURL = nodemailer.getTestMessageUrl(info)
    console.log(`Preview URL: ${emailURL}`)
  } catch (error) {
    console.log(error)
  }
})

router.get('/verify', async (request, response) => {
  const salt = request.query.a

  try {
    const user = await User.findOne({ salt })
    if (user) {
      user.verified = true
      user.salt = undefined
      await user.save()
    }

    response.send('<p>User verified!</p>')
  } catch (error) {
    console.log(error)
  }
})

router.post('/login', async ({ ip, body }, response) => {
  const maxDailyFailedIP = 100
  const maxConsecutiveFailed = 10
  const day = 86400
  const dailyLimiter = new RateLimiterMongo({
    storeClient: mongoose.connection,
    keyPrefix: 'limiterDaily',
    points: maxDailyFailedIP,
    duration: day,
    blockDuration: day,
  })
  const consecutiveLimiter = new RateLimiterMongo({
    storeClient: mongoose.connection,
    keyPrefix: 'limiterConsecutive',
    points: maxConsecutiveFailed,
    duration: 90 * day,
    blockDuration: day / 24,
  })

  const { email } = body
  const key = email + ip
  const [dailyResponse, consecutiveResponse] = await Promise.all([
    dailyLimiter.get(ip),
    consecutiveLimiter.get(key),
  ])

  let retry = 0
  const round = before => Math.round(before / 1000) || 1
  if (
    dailyResponse !== null &&
    dailyResponse.consumedPoints >= maxDailyFailedIP
  )
    retry = round(dailyResponse.msBeforeNext)
  else if (
    consecutiveResponse !== null &&
    consecutiveResponse.consumedPoints >= maxConsecutiveFailed
  )
    retry = round(consecutiveResponse.msBeforeNext)

  const retryAfter = () => {
    response.set('Retry-After', String(retry))
    response
      .status(429)
      .json({ limiter: 'Too many bad requests, please try again later.' })
  }

  if (retry > 0) retryAfter()
  else {
    const { errors, isValid } = validateLogin(body)
    if (!isValid) return response.status(400).json(errors)

    try {
      const user = await User.findOne({ email })
        .select('-__v')
        .populate('locations')
        .populate('practices')
        .exec()
      if (!user) response.status(404).json({ email: 'Email not found.' })
      else if (!user.verified)
        response.status(412).json({ verified: 'Email not confirmed.' })

      const isMatch =
        user && (await bcrypt.compare(body.password, user.password))
      if (isMatch) {
        if (
          consecutiveResponse !== null &&
          consecutiveResponse.consumedPoints > 0
        )
          await consecutiveLimiter.delete(key)

        jwt.sign(
          user.toObject(),
          'secret',
          { expiresIn: 31556926 },
          (error, token) => {
            response.json({
              success: true,
              token: `Bearer ${token}`,
            })
          }
        )
      } else {
        try {
          const promises = [dailyLimiter.consume(ip)]
          if (user) {
            promises.push(consecutiveLimiter.consume(key))
            response
              .status(404)
              .json({ email: 'Email or password is incorrect.' })
          }

          await Promise.all(promises)
        } catch (error) {
          if (error instanceof Error) throw error
          else retryAfter()
        }
      }
    } catch (error) {
      console.log(error)
    }
  }
})

const query = '-verified -password -__v'
router.put('/', async ({ body }, response) => {
  const { errors, isValid } = validateRegister(body)
  if (!isValid) return response.status(400).json(errors)

  try {
    const { first, last, email, school, year, password, _id } = body
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    const update = {
      first,
      last,
      email,
      school,
      year,
      password: hash,
    }

    const user = await User.findByIdAndUpdate(_id, update, { new: true })
      .select(query)
      .populate('locations')
      .populate('practices')
      .exec()
    response.json(user)
  } catch (error) {
    console.log(error)
  }
})

router.put('/preferences', async ({ body }, response) => {
  const { errors, valid } = validatePreferences(body)
  if (!valid) return response.status(400).json(errors)

  try {
    const { _id, gpa, locations, practices } = body
    const update = { gpa, locations, practices }
    const user = await User.findByIdAndUpdate(_id, update, {
      new: true,
    })
      .select(query)
      .populate('locations')
      .populate('practices')
      .exec()

    response.json(user)
  } catch (error) {
    console.log(error)
  }
})

export default router
