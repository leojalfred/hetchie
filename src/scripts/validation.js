import * as yup from 'yup';

export const name = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð,.'-]+$/u;
export const password = {
  message:
    'Password must contain at least one digit, upper- and lowercase letter, and symbol.',
  pattern: /.*(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[ !"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]).*/,
};
const date = new Date();
export const year = date.getUTCFullYear();

export const email = {
  email: yup.string().required('Email is required.').email('Email is invalid.'),
};

export let clientErrorKeys, serverErrorKeys;
export function getErrorKeys(clientErrors, touched, serverErrors) {
  clientErrorKeys = Object.keys(clientErrors).filter(
    (error) => touched[error] === true
  );
  serverErrorKeys = Object.keys(serverErrors);
}
