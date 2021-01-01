import bcrypt from 'bcryptjs'
import nodemailer from 'nodemailer'
import validate from '../../validation/register'
import User from '../../models/User'
import key from '../../config/key.json'

export default async function register({ body }, response) {
  const { message, valid } = validate(body)
  if (!valid) return response.status(400).send(message)

  try {
    const { first, last, email, school, year, password } = body
    const user = await User.findOne({ email })
    if (user) return response.status(400).send('Email already exists.')

    const [hashSalt, verificationSalt] = await Promise.all([
      bcrypt.genSalt(10),
      bcrypt.genSalt(10),
    ])
    const hash = await bcrypt.hash(password, hashSalt)
    const newUser = new User({
      first,
      last,
      email,
      school,
      year,
      password: hash,
      salt: verificationSalt,
    })

    const savedUser = await newUser.save()
    response.json(savedUser)

    let transporter
    let url = `/api/users/verify?a=${email}&b=${verificationSalt}`
    let logo = 'logo.png'
    const production = process.env.NODE_ENV === 'production'
    if (production) {
      transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          privateKey: key.private_key,
          serviceClient: key.client_id,
          type: 'OAuth2',
          user: 'contact@hetchie.com',
        },
      })

      url = 'www.hetchie.com' + url
    } else {
      const test = await nodemailer.createTestAccount()
      transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
          user: test.user,
          pass: test.pass,
        },
      })

      url = 'localhost:3001' + url
      logo = 'public/' + logo
    }

    const info = await transporter.sendMail({
      from: '"hetchie" <contact@hetchie.com>',
      to: email,
      subject: 'Confirm your account',
      html: `<div style="background-color: #f1f3f5;">
        <div style="color: #343a40; margin: 0 auto; padding: 2rem; width: 40rem;">
          <div style="background-color: #ffa94d; border-radius: .2rem .2rem 0 0; padding: 1.4rem;">
            <h2 style="color: #f8f9fa; font-size: 1.4rem; margin: 0; text-align: center;">Thanks for Signing Up!</h2>
          </div>
          <div style="background-color: #fff; border-radius: 0 0 .2rem .2rem; padding: 3rem 1.5rem;">
            <img src="cid:logo@hetchie.com" style="display: block; margin: 0 auto 3rem auto; width: 4rem;">
            <div style="margin: 0 auto; max-width: 24rem;">
              <h3 style="font-size: 1.2rem; margin-bottom: 1rem;">Hey ${first},</h3>
              <p style="margin-bottom: .5rem;">Welcome to hetchie! Thanks for registering with us.</p>
              <p style="margin: 0;">Before you begin, we just need you to verify your email.
              Please click the button below to verify your email and get started.</p>
            </div>
            <a href="${url}" style="background-color: #ffa94d; border-radius: 2rem; color: #f8f9fa; display: block; font-size: .9rem; font-weight: bold; margin: 3rem auto 0 auto; padding: 0.5rem 1rem; text-align: center; text-decoration: none; width: 8rem;">Verify Email</a>
          </div>
          <p style="margin: 1rem 0 0 0; text-align: center;">
            <small>Alternatively, click this link: <a href="${url}" style="color: #343a40; text-decoration: none;">${url}</a></small>
          </p>
        </div>
      </div>`,
      attachments: [
        {
          filename: 'logo.png',
          path: logo,
          cid: 'logo@hetchie.com',
        },
      ],
    })

    if (!production)
      console.log(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`)
  } catch (error) {
    console.log(error)
  }
}
