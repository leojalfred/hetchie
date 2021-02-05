import axios from 'axios'

export default async function getData(endpoints, setters) {
  const promises = []
  for (const endpoint of endpoints) promises.push(axios.get(`/api/${endpoint}`))

  function sort(a, b) {
    if (a.label < b.label) return -1
    if (a.label > b.label) return 1
    return 0
  }

  const responses = await Promise.all(promises)
  for (let i = 0; i < responses.length; i++) {
    const data = responses[i].data
    const dataOptions = data.map(({ _id, name }) => ({
      value: _id,
      label: name,
    }))
    const sortedOptions = dataOptions.sort(sort)

    setters[i](sortedOptions)
  }
}
