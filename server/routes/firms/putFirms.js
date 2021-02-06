import express from 'express'
import Firm from '../../models/Firm'
// import Location from '../../models/Location'
// import Practice from '../../models/Practice'
// import Qualification from '../../models/Qualification'
import Ranking from '../../models/Ranking'

// async function getOrCreate(field, Model) {
//   const ids = []
//   if (field && field.length) {
//     const promises = []
//     for (const name of field)
//       promises.push(Model.findOne({ name }, '_id name').lean().exec())

//     const resolved = await Promise.all(promises)
//     let filtered = field
//     for (const entry of resolved) {
//       if (entry !== null) {
//         filtered = filtered.filter(name => name !== entry.name)
//         ids.push(entry._id)
//       }
//     }

//     for (const name of filtered) {
//       const newEntry = new Model({ name })
//       const { _id } = await newEntry.save()
//       ids.push(_id)
//     }
//   }

//   return ids
// }

async function getOrCreateRankings(raw) {
  let rankings = []
  if (raw && raw.length) {
    for (const { position, ranking } of raw) {
      const entry = await Ranking.findOne({ name: ranking }, '_id name').lean()
      if (entry) rankings.push({ position, ranking: entry._id })
      else {
        const newRanking = new Ranking({ name: ranking })
        const { _id } = await newRanking.save()
        rankings.push({ position, ranking: _id })
      }
    }
  }

  return rankings
}

async function getNewFirm(firm) {
  // const locationPromises = getOrCreate(firm.locations, Location)
  // const practicePromises = getOrCreate(firm.practices, Practice)
  const rankings = await getOrCreateRankings(firm.rankings)
  // const qualificationPromises = getOrCreate(firm.qualifications, Qualification)

  // const [locations, practices, qualifications] = await Promise.all([
  //   locationPromises,
  //   practicePromises,
  //   qualificationPromises,
  // ])

  return {
    name: firm.name,
    links: firm.links,
    // locations,
    // practices,
    // gpa: firm.gpa,
    // salary: firm.salary,
    rankings,
    // qualifications,
    // date: firm.date,
  }
}

const router = express.Router()
router.put('/', async ({ body }, response) => {
  try {
    if (body.action === 'add') {
      for (const firm of body.data) {
        const newFirmPromise = getNewFirm(firm)
        const foundFirmPromise = Firm.findOne({ name: firm.name }, '_id')
          .lean()
          .exec()
        const [newFirmObject, foundFirm] = await Promise.all([
          newFirmPromise,
          foundFirmPromise,
        ])

        if (foundFirm)
          await Firm.replaceOne({ _id: foundFirm._id }, newFirmObject)
        else {
          const newFirm = new Firm(newFirmObject)
          await newFirm.save()
        }
      }
    } else {
      await Firm.deleteMany({})

      const firmPromises = []
      for (const firm of body.data) {
        const newFirmObject = await getNewFirm(firm)
        const newFirm = new Firm(newFirmObject)
        firmPromises.push(newFirm.save())
      }

      await Promise.all(firmPromises)
    }

    response.send('Done')
  } catch (error) {
    error()
    console.log(error)
  }
})

export default router
