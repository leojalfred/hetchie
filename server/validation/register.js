import validator from 'validator';
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
  const errors = {};
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

  if (validator.isEmpty(first)) errors.first = 'First name is required.';
  else if (!validator.matches(first, namePattern))
    errors.first = 'First name is invalid.';
  if (validator.isEmpty(last)) errors.last = 'Last name is required.';
  else if (!validator.matches(last, namePattern))
    errors.last = 'Last name is invalid.';

  if (validator.isEmpty(email)) errors.email = 'Email is required.';
  else if (!validator.isEmail(email)) errors.email = 'Email is invalid.';

  if (validator.isEmpty(school)) errors.school = 'School is required.';
  if (validator.isEmpty(year)) errors.year = 'Graduation year is required.';
  else if (!validator.isInt(year, yearOptions))
    errors.year = 'Graduation year is invalid.';

  if (validator.isEmpty(password)) errors.password = 'Password is required.';
  else if (!validator.matches(password, passwordPattern))
    errors.password = 'Password is invalid.';
  if (validator.isEmpty(confirm))
    errors.confirm = 'Confirm password is required.';
  else if (!validator.matches(confirm, passwordPattern))
    errors.confirm = 'Confirm password is invalid.';
  else if (!validator.equals(password, confirm))
    errors.confirm = 'Passwords must match.';

  let isValid = true;
  Object.values(errors).forEach(value => {
    if (!isEmpty(value)) isValid = false;
  });

  return { errors, isValid };
}
