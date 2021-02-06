import validate from '../../validation/name'

const putName = Model => async ({ body }, response) => {
  const { message, valid } = validate(body)
  if (!valid) return response.status(400).send(message)

  try {
    const { name } = body
    const data = new Model({ name })
    const savedData = await data.save()

    response.json(savedData)
  } catch (error) {
    console.log(error)
  }
}

export default putName
