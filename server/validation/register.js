import Validator from 'validator';
import isEmpty from 'is-empty';

export default function validateRegister({
  first,
  last,
  email,
  school,
  year,
  password,
  confirm,
}) {
  const errors = {
    first: [],
    last: [],
    email: [],
    school: [],
    year: [],
    password: [],
    confirm: [],
  };
  const namePattern = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð,.'-]+$/u;
  const passwordPattern = /.*(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[ !"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]).*/;
  const date = new Date();
  const yearOptions = {
    allow_leading_zeroes: false,
    min: date.getUTCFullYear(),
  };

  first = !isEmpty(first) ? first : '';
  last = !isEmpty(last) ? last : '';
  email = !isEmpty(email) ? email : '';
  school = !isEmpty(school) ? school : '';
  year = !isEmpty(year) ? year : '';
  password = !isEmpty(password) ? password : '';
  confirm = !isEmpty(confirm) ? confirm : '';

  if (Validator.isEmpty(first))
    errors.first.push('First name field is required');
  if (!Validator.matches(first, namePattern))
    errors.first.push('First name field is not valid');
  if (Validator.isEmpty(last)) errors.last.push('Last name field is required');
  if (!Validator.matches(last, namePattern))
    errors.last.push('Last name field is not valid');

  if (Validator.isEmpty(email)) errors.email.push('Email field is required');
  else if (!Validator.isEmail(email)) errors.email.push('Email is invalid');

  if (Validator.isEmpty(school)) errors.school.push('School field is required');
  if (Validator.isEmpty(year))
    errors.year.push('Graduation year field is required');
  else if (!Validator.isInt(year, yearOptions))
    errors.year.push('Graduation year is invalid');

  if (Validator.isEmpty(password))
    errors.password.push('Password field is required');
  if (!Validator.matches(password, passwordPattern))
    errors.password.push('Password field is not valid');
  if (Validator.isEmpty(confirm))
    errors.confirm.push('Confirm password field is required');
  if (!Validator.matches(confirm, passwordPattern))
    errors.confirm.push('Confirm password field is not valid');
  if (!Validator.equals(password, confirm))
    errors.confirm.push('Passwords must match');

  let isValid = true;
  Object.values(errors).forEach(value => {
    if (!isEmpty(value)) isValid = false;
  });

  return { errors, isValid };
}
