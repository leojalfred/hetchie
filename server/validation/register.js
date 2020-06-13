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

  if (Validator.isEmpty(first)) errors.first = 'First name is required';
  else if (!Validator.matches(first, namePattern))
    errors.first = 'First name is not valid';
  if (Validator.isEmpty(last)) errors.last = 'Last name is required';
  else if (!Validator.matches(last, namePattern))
    errors.last = 'Last name is not valid';

  if (Validator.isEmpty(email)) errors.email = 'Email field is required';
  else if (!Validator.isEmail(email)) errors.email = 'Email is invalid';

  if (Validator.isEmpty(school)) errors.school = 'School is required';
  if (Validator.isEmpty(year))
    errors.year = 'Graduation year field is required';
  else if (!Validator.isInt(year, yearOptions))
    errors.year = 'Graduation year is invalid';

  if (Validator.isEmpty(password))
    errors.password = 'Password field is required';
  else if (!Validator.matches(password, passwordPattern))
    errors.password = 'Password field is not valid';
  if (Validator.isEmpty(confirm))
    errors.confirm = 'Confirm password field is required';
  else if (!Validator.matches(confirm, passwordPattern))
    errors.confirm = 'Confirm password field is not valid';
  else if (!Validator.equals(password, confirm))
    errors.confirm = 'Passwords must match';

  let isValid = true;
  Object.values(errors).forEach(value => {
    if (!isEmpty(value)) isValid = false;
  });

  return { errors, isValid };
}
