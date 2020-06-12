import express from 'express';
import bcrypt from 'bcryptjs';
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

  const { first, last, email, school, year, password } = body;
  const newUser = new User({
    first,
    last,
    email,
    school,
    year,
    password,
  });

  bcrypt.genSalt(10, (error, salt) => {
    bcrypt.hash(newUser.password, salt, async (error, hash) => {
      if (error) throw error;
      newUser.password = hash;

      try {
        const savedUser = await newUser.save();
        response.json(savedUser);
      } catch (error) {
        console.log(error);
      }
    });
  });
});

router.post('/validateLogin', async ({ body }, response) => {
  const { errors, isValid } = validateLogin(body);
  if (!isValid) return response.status(400).json(errors);

  const { email, password } = body;
  const user = await User.findOne({ email });
  if (!user)
    return response.status(404).json({ emailnotfound: 'Email not found' });

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
  } else
    return response
      .status(400)
      .json({ passwordincorrect: 'Password incorrect' });
});

export default router;
