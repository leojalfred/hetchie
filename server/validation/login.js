import Validator from 'validator';
import isEmpty from 'is-empty';

export default function validateLogin({ email, password }) {
  const errors = {};

  email = !isEmpty(email) ? email : '';
  password = !isEmpty(password) ? password : '';

  if (Validator.isEmpty(email)) errors.email = 'Email field is required';
  else if (!Validator.isEmail(email)) errors.email = 'Email is invalid';

  if (Validator.isEmpty(password))
    errors.password = 'Password field is required';

  return {
    errors,
    isValid: isEmpty(errors),
  };
}
