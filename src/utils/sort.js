export default function sort(a, b) {
  if (a.label < b.label) return -1
  if (a.label > b.label) return 1
  return 0
}
