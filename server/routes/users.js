import express from 'express'
import bcrypt from 'bcryptjs'
import nodemailer from 'nodemailer'
import jwt from 'jsonwebtoken'
import keys from '../config/keys'
import validateRegister from '../validation/register'
import validateLogin from '../validation/login'
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

    const url = `localhost:3001/users/verify?a=${salt}`
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

router.post('/login', async ({ body }, response) => {
  const { errors, isValid } = validateLogin(body)
  if (!isValid) return response.status(400).json(errors)

  try {
    const { email, password } = body
    const user = await User.findOne({ email })
    if (!user) return response.status(404).json({ email: 'Email not found.' })
    if (!user.verified)
      return response.status(404).json({ verified: 'Email not confirmed.' })

    const isMatch = await bcrypt.compare(password, user.password)
    if (isMatch) {
      const { id, name } = user
      const payload = { id, name }
      jwt.sign(
        payload,
        keys.secretOrKey,
        { expiresIn: 31556926 },
        (error, token) => {
          response.json({
            success: true,
            token: `Bearer ${token}`,
          })
        }
      )
    } else response.status(400).json({ password: 'Password is invalid.' })
  } catch (error) {
    console.log(error)
  }
})

router.get('/', async (request, response) => {
  const { id } = request.query

  try {
    const user = await User.findById(id, '-date -password -verified -__v')
    response.json(user)
  } catch (error) {
    console.log(error)
  }
})

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

    const user = await User.findOneAndUpdate({ _id }, update, { new: true })
    response.json(user)
  } catch (error) {
    console.log(error)
  }
})

export default router
