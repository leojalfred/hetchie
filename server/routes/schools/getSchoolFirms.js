import School from '../../models/School'

export default async function getSchoolFirms({ query }, response) {
  try {
    const { id } = query
    const school = await School.findById(id)
      .select('firms offices')
      .populate({
        path: 'firms.firm firms.offices',
        populate: {
          path: 'rankings.ranking locations practices qualifications',
        },
      })
      .lean()
      .exec()

    response.json(school)
  } catch (error) {
    console.log(error)
  }
}
