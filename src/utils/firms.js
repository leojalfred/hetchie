import empty from './empty'

const roundDown = x => Math.floor(x * 10) / 10
function getFirmGPA(gpa) {
  if (empty(gpa)) return 0
  return roundDown(gpa)
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

export default function rank(gpa, locations, practices, firms) {
  const ids = Object.keys(firms)
  ids.forEach(id => {
    const firm = firms[id]

    const has = (user, firm) => !empty(user) && !empty(firm)
    const gpaScore = scoreGPA(gpa, firm.gpa)
    const location = has(locations, firm.locations)
      ? scoreOther(locations, firm.locations)
      : scores[5]
    const practice = has(practices, firm.practices)
      ? scoreOther(practices, firm.practices)
      : scores[5]

    firms[id].score = gpaScore * (location + practice)
  })

  ids.sort((a, b) => {
    if (firms[a].score === firms[b].score)
      return firms[a].name < firms[b].name ? -1 : 1

    return firms[b].score - firms[a].score
  })

  return ids
}
