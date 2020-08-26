import bcrypt from 'bcryptjs'
import nodemailer from 'nodemailer'
import validate from '../../validation/register'
import User from '../../models/User'

export default async ({ body }, response) => {
  const { errors, isValid } = validate(body)
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

    const url = `/api/users/verify?a=${salt}`
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
}
