import Location from '../../models/Location'

export default async function getLocations(request, response) {
  try {
    const locations = await Location.find()
    response.json(locations)
  } catch (error) {
    console.log(error)
  }
}
