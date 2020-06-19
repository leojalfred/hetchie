import express from 'express';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import keys from '../config/keys';
import validateRegister from '../validation/register';
import validateLogin from '../validation/login';
import User from '../models/User';

const router = express.Router();
router.post('/register', async ({ body }, response) => {
  const { errors, isValid } = validateRegister(body);
  if (!isValid) return response.status(400).json(errors);

  const user = await User.findOne({ email: body.email });
  if (user) return response.status(400).json({ email: 'Email already exists' });

  try {
    const salt = await bcrypt.genSalt(10);

    const { first, last, email, school, year, password } = body;
    const newUser = new User({
      first,
      last,
      email,
      school,
      year,
      password,
      salt,
    });

    const hash = await bcrypt.hash(newUser.password, salt);
    newUser.password = hash;

    const savedUser = await newUser.save();
    response.json(savedUser);

    const testAccount = await nodemailer.createTestAccount();
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });

    const url = `localhost:3001/users/verify?a=${salt}`;
    const info = await transporter.sendMail({
      from: '"Leo Alfred" <leo@hetchie.com>',
      to: 'jon@doe.com',
      subject: 'Confirm your account',
      html: `<p>Confirm your account by clicking <a href="${url}">here</a></p>`,
    });

    const emailURL = nodemailer.getTestMessageUrl(info);
    console.log(`Preview URL: ${emailURL}`);
  } catch (error) {
    console.log(error);
  }
});

router.post('/login', async ({ body }, response) => {
  const { errors, isValid } = validateLogin(body);
  if (!isValid) return response.status(400).json(errors);

  const { email, password } = body;
  const user = await User.findOne({ email });
  if (!user) return response.status(404).json({ email: 'Email not found.' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (isMatch) {
    const { id, name } = user;
    const payload = { id, name };
    jwt.sign(
      payload,
      keys.secretOrKey,
      { expiresIn: 31556926 }, // 1 year in seconds
      (error, token) => {
        response.json({
          success: true,
          token: `Bearer ${token}`,
        });
      }
    );
  } else return response.status(400).json({ password: 'Password is invalid.' });
});

export default router;
