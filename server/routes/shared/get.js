const get = Model => async (request, response) => {
  try {
    const data = await Model.find().select('_id name').lean()
    response.json(data)
  } catch (error) {
    console.log(error)
  }
}

export default get
