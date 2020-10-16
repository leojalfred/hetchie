export default function isEmpty(object) {
  if (object === null || object === undefined) return true
  if (Array.isArray(object)) return !object.length

  for (const property in object)
    if (object.hasOwnProperty(property)) return false

  return JSON.stringify(object) === JSON.stringify({})
}
