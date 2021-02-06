import Practice from '../../models/Practice'

export default async function getPractices(request, response) {
  try {
    const practices = await Practice.find()
    response.json(practices)
  } catch (error) {
    console.log(error)
  }
}
