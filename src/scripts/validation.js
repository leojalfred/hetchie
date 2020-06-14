import * as yup from 'yup';

export const name = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð,.'-]+$/u;
export const password = {
  message:
    'Password must contain at least one digit, upper- and lowercase letter, and symbol.',
  pattern: /.*(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[ !"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]).*/,
};
const date = new Date();
export const year = date.getUTCFullYear();

export const login = {
  email: yup.string().required('Email is required.').email('Email is invalid.'),
  password: yup
    .string()
    .required('Password is required.')
    .matches(password.pattern, {
      message: password.message,
      excludeEmptyString: true,
    }),
};
