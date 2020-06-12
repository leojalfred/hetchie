import Validator from 'validator';
import isEmpty from 'is-empty';

export default function validateRegisterInput({
  first,
  last,
  email,
  school,
  year,
  password,
  confirm,
}) {
  const errors = {};

  first = !isEmpty(first) ? first : '';
  last = !isEmpty(last) ? last : '';
  email = !isEmpty(email) ? email : '';
  school = !isEmpty(school) ? school : '';
  year = !isEmpty(year) ? year : '';
  password = !isEmpty(password) ? password : '';
  confirm = !isEmpty(confirm) ? confirm : '';

  if (Validator.isEmpty(first)) errors.first = 'First name field is required';
  if (Validator.isEmpty(last)) errors.last = 'Last name field is required';

  if (Validator.isEmpty(email)) errors.email = 'Email field is required';
  else if (!Validator.isEmail(email)) errors.email = 'Email is invalid';

  if (Validator.isEmpty(school)) errors.school = 'School field is required';
  if (Validator.isEmpty(year))
    errors.year = 'Graduation year field is required';
  else if (!Validator.isInt(year)) errors.year = 'Graduation year is invalid';

  if (Validator.isEmpty(password))
    errors.password = 'Password field is required';
  if (Validator.isEmpty(confirm))
    errors.confirm = 'Confirm password field is required';
  if (!Validator.equals(password, confirm))
    errors.confirm = 'Passwords must match';

  return {
    errors,
    isValid: isEmpty(errors),
  };
}
