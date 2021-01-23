import express from 'express'
import Firm from '../../models/Firm'
import Location from '../../models/Location'
import Practice from '../../models/Practice'
import Qualification from '../../models/Qualification'
import Ranking from '../../models/Ranking'

async function getOrCreate(field, Model) {
  const ids = []
  if (field && field.length) {
    const promises = []
    for (const name of field)
      promises.push(Model.findOne({ name }, '_id name').lean().exec())

    const resolved = await Promise.all(promises)
    let filtered = field
    for (const entry of resolved) {
      if (entry !== null) {
        filtered = filtered.filter(name => name !== entry.name)
        ids.push(entry._id)
      }
    }

    for (const name of filtered) {
      const newEntry = new Model({ name })
      const { _id } = await newEntry.save()
      ids.push(_id)
    }
  }

  return ids
}

async function getOrCreateRankings(raw) {
  let rankings = []
  if (raw && raw.length) {
    const promises = []
    for (const { ranking } of raw)
      promises.push(
        Ranking.findOne({ name: ranking }, '_id name').lean().exec()
      )

    const resolved = await Promise.all(promises)
    let filtered = raw
    for (const entry of resolved) {
      if (entry !== null) {
        filtered = filtered.filter(({ ranking: name }) => name !== entry.name)

        const i = raw.findIndex(({ ranking }) => ranking === entry.name)
        rankings.push({ position: raw[i].position, ranking: entry._id })
      }
    }

    for (const ranking of filtered) {
      const newRanking = new Ranking({ name: ranking.ranking })
      const { _id } = await newRanking.save()
      rankings.push({ position: ranking.position, ranking: _id })
    }
  }

  return rankings
}

async function getNewFirm(firm) {
  const locationPromises = getOrCreate(firm.locations, Location)
  const practicePromises = getOrCreate(firm.practices, Practice)
  const rankingPromises = getOrCreateRankings(firm.rankings)
  const qualificationPromises = getOrCreate(firm.qualifications, Qualification)

  const [locations, practices, rankings, qualifications] = await Promise.all([
    locationPromises,
    practicePromises,
    rankingPromises,
    qualificationPromises,
  ])

  return {
    name: firm.name,
    links: firm.links,
    locations,
    practices,
    gpa: firm.gpa,
    salary: firm.salary,
    rankings,
    qualifications,
    date: firm.date,
  }
}

const router = express.Router()
router.put('/', async ({ body }, response) => {
  try {
    if (body.action === 'add') {
      const firmPromises = []
      for (const firm of body.data) {
        const newFirmPromise = getNewFirm(firm)
        const foundFirmPromise = Firm.findOne({ name: firm.name }, '_id')
          .lean()
          .exec()
        const [newFirmObject, foundFirm] = await Promise.all([
          newFirmPromise,
          foundFirmPromise,
        ])

        if (foundFirm === null) {
          const newFirm = new Firm(newFirmObject)
          firmPromises.push(newFirm.save())
        } else
          firmPromises.push(
            Firm.replaceOne({ _id: foundFirm._id }, newFirmObject)
          )
      }

      console.log(await Promise.all(firmPromises))
    } else {
    }

    response.send('Done')
  } catch (error) {
    console.log(error)
  }
})

export default router
