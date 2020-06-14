import validator from 'validator';
import isEmpty from 'is-empty';

export default function validateLogin({ email, password }) {
  const errors = { email: [], password: [] };

  email = !isEmpty(email) ? email : '';
  password = !isEmpty(password) ? password : '';

  if (validator.isEmpty(email)) errors.email.push('Email is required.');
  else if (!validator.isEmail(email)) errors.email.push('Email is invalid.');

  const passwordPattern = /.*(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[ !"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]).*/;
  if (validator.isEmpty(password))
    errors.password.push('Password is required.');
  if (!validator.matches(password, passwordPattern))
    errors.password.push('Password is invalid.');

  let isValid = true;
  Object.values(errors).forEach(value => {
    if (!isEmpty(value)) isValid = false;
  });

  return { errors, isValid };
}
