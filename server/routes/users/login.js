import { RateLimiterMongo } from 'rate-limiter-flexible'
import { connection } from 'mongoose'
import bcrypt from 'bcryptjs'
import validate from '../../validation/login'
import User from '../../models/User'
import signResponse from '../../utils/signResponse'

export default async ({ ip, body }, response) => {
  const maxDailyFailedIP = 100
  const maxConsecutiveFailed = 10
  const day = 86400
  const dailyLimiter = new RateLimiterMongo({
    storeClient: connection,
    keyPrefix: 'limiterDaily',
    points: maxDailyFailedIP,
    duration: day,
    blockDuration: day,
  })
  const consecutiveLimiter = new RateLimiterMongo({
    storeClient: connection,
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
    response.status(429).send('Too many bad requests, please try again later.')
  }

  if (retry > 0) retryAfter()
  else {
    const { message, valid } = validate(body)
    if (!valid) return response.status(400).send(message)

    try {
      const user = await User.findOne({ email })
        .select('-__v')
        .populate('locations')
        .populate('practices')
        .exec()
      if (!user) response.status(404).send('Email not found.')
      else if (!user.verified) response.status(412).send('Email not confirmed.')

      const isMatch =
        user && (await bcrypt.compare(body.password, user.password))
      if (isMatch) {
        if (
          consecutiveResponse !== null &&
          consecutiveResponse.consumedPoints > 0
        )
          await consecutiveLimiter.delete(key)

        const userResponse = user.toObject()
        delete userResponse.verified
        delete userResponse.password

        signResponse(userResponse, response)
      } else {
        try {
          const promises = [dailyLimiter.consume(ip)]
          if (user) {
            promises.push(consecutiveLimiter.consume(key))
            response.status(404).send('Email or password is incorrect.')
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
}
