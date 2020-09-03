import empty from './empty'

const roundDown = x => Math.floor(x * 10) / 10
function getFirmGPA(firm) {
  if (empty(firm)) return 0

  if (empty(firm.band)) return roundDown(firm.required)
  return Math.min(roundDown(firm.required), roundDown(firm.band))
}

function scoreGPA(user, firm) {
  const adjustment = 0.03
  let difference = user - getFirmGPA(firm) - adjustment
  if (difference < 0) difference *= 1.9

  const standardDeviation = 0.2
  const coefficient = 1 / Math.sqrt(2 * Math.PI * standardDeviation ** 2)
  const exponent = Math.E ** (-(difference ** 2) / (2 * standardDeviation ** 2))

  const score = coefficient * exponent
  return score
}

const scores = [1, 0.86, 0.7, 0.52, 0.32, 0.1]
function scoreOther(user, firm) {
  const getID = other => other['_id']
  const userIDs = user.map(getID)
  const firmIDs = firm.map(getID)

  let score = scores[5]
  if (firmIDs.includes(userIDs[0])) return scores[0]
  else if (firmIDs.includes(userIDs[1])) score = scores[1]
  else
    for (let i = 2; i <= 4; i++)
      if (score < scores[i] && firmIDs.includes(userIDs[i])) score = scores[i]

  return score
}

export default function rank({ data: user }, firms) {
  const ids = Object.keys(firms)
  ids.forEach(id => {
    const firm = firms[id]

    const has = (user, firm) => !empty(user) && !empty(firm)
    const gpa = scoreGPA(user.gpa, firm.gpa)
    const location = has(user.locations, firm.locations)
      ? scoreOther(user.locations, firm.locations)
      : scores[5]
    const practice = has(user.practices, firm.practices)
      ? scoreOther(user.practices, firm.practices)
      : scores[5]

    firms[id].score = gpa * (location + practice)
  })

  ids.sort((a, b) => firms[b].score - firms[a].score)
  return ids
}
