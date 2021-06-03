import validate from '../../validation/putOffice'
import School from '../../models/School'

export default async function postFirm({ body }, response) {
  const { message, valid } = validate(body)
  if (!valid) return response.status(400).send(message)

  try {
    const { id, firm, ...office } = body
    const school = await School.findById(id).select('firms').exec()

    // if firm exists
    const i = school.firms.findIndex(existingFirm => firm === existingFirm.firm)
    if (i >= 0) school.firms[i].offices.push(office)
    else school.firms.push({ firm, offices: [office] })

    await school.save()
  } catch (error) {
    console.log(error)
  }
}
