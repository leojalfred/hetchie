function nth(n) {
  if (n > 3 && n < 21) return 'th'
  switch (n % 10) {
    case 1:
      return 'st'
    case 2:
      return 'nd'
    case 3:
      return 'rd'
    default:
      return 'th'
  }
}

export default function formatDate(unformatted) {
  const parsed = new Date(unformatted)
  const month = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ][parsed.getMonth()]
  const date = parsed.getDate()

  return `${month} ${date + nth(date)}`
}
