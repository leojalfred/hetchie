import School from '../../models/School'

export default async function getSchoolFirms({ query }, response) {
  try {
    const { id } = query
    const school = await School.findById(id)
      .select('firms offices')
      .populate({
        path: 'firms.firm',
        populate: { path: 'rankings.ranking' },
      })
      .populate('firms.offices.locations')
      .populate('firms.offices.practices')
      .populate('firms.offices.qualifications')
      .lean()
      .exec()

    response.json(school)
  } catch (error) {
    console.log(error)
  }
}
