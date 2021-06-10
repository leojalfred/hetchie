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
  const gmtDate = new Date(unformatted)
  const pstDate = new Date(gmtDate.getTime() + 7 * 60 * 60 * 1000)

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
  ][pstDate.getMonth()]
  const date = pstDate.getDate()

  return `${month} ${date + nth(date)}`
}
