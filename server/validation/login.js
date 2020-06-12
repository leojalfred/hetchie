import Validator from 'validator';
import isEmpty from 'is-empty';

export default function validateLogin({ email, password }) {
  const errors = { email: [], password: [] };

  email = !isEmpty(email) ? email : '';
  password = !isEmpty(password) ? password : '';

  if (Validator.isEmpty(email)) errors.email.push('Email field is required');
  else if (!Validator.isEmail(email)) errors.email.push('Email is invalid');

  const passwordPattern = /.*(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[ !"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]).*/;
  if (Validator.isEmpty(password))
    errors.password.push('Password field is required');
  if (!Validator.matches(password, passwordPattern))
    errors.password.push('Password field is not valid');

  let isValid = true;
  Object.values(errors).forEach(value => {
    if (!isEmpty(value)) isValid = false;
  });

  return { errors, isValid };
}
