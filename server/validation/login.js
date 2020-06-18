import validator from 'validator';
import isEmpty from 'is-empty';

export default function validateLogin({ email, password }) {
  const errors = {};

  email = !isEmpty(email) ? email : '';
  password = !isEmpty(password) ? password : '';

  if (validator.isEmpty(email)) errors.email = 'Email is required.';
  else if (!validator.isEmail(email)) errors.email = 'Email is invalid.';

  if (validator.isEmpty(password)) errors.password = 'Password is required.';

  let isValid = true;
  Object.values(errors).forEach(value => {
    if (!isEmpty(value)) isValid = false;
  });

  return { errors, isValid };
}
