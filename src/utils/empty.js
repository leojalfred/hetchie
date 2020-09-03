export default function isEmpty(object) {
  if (object === null || object === undefined) return true
  else if (Array.isArray(object) && object.length) return false

  for (const property in object) {
    if (object.hasOwnProperty(property)) return false
  }

  return JSON.stringify(object) === JSON.stringify({})
}
