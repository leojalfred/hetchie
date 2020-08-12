import * as yup from 'yup'

export const namePattern = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð,.'-]+$/u

const hexPattern = /^[\da-f]+$/
export const idSchema = schema =>
  yup
    .string()
    .required(`${schema} ID is required.`)
    .matches(hexPattern, {
      message: `${schema} ID is invalid.`,
      excludeEmptyString: true,
    })
export const idArraySchema = schema => yup.array().of(idSchema(schema))
