import { useRef } from 'react'
import axios from 'axios'
import parse from 'csv-parse'
import stringify from 'csv-stringify'
import { saveAs } from 'file-saver'
import './Admin.scss'
import Container from 'components/Container'
import Button from 'components/Buttons/Button'

export default function Admin() {
  const input = useRef()
  function importFirms(event) {
    event.preventDefault()

    const reader = new FileReader()
    reader.onloadend = () => {
      const options = { columns: ['_id', 'name', 'firmLink', 'chambersLink', 'vaultLink', 'locations', 'practices', 'requiredGPA', 'preferredGPA', 'largeSalary', 'smallSalary', 'rankings', 'qualifications', 'date'] }
      parse(reader.result, options, (error, records) => {
        if (!error) {
          const data = records.map(record => ({
            _id: record._id,
            name: record.name,
            links: {
              firm: record.firmLink,
              chambers: record.chambersLink,
              vault: record.vaultLink
            },
            locations: record.locations,
            practices: record.practices,
            gpa: {
              required: record.requiredGPA,
              band: record.preferredGPA
            },
            salary: {
              large: record.largeSalary,
              small: record.smallSalary
            },
            rankings: record.rankings,
            qualifications: record.qualifications,
            date: record.date
          }))
          console.dir(data)
        } else console.log(error)
      })
    }
    reader.readAsText(input.current.files[0])
  }

  async function exportFirms() {
    const { data: firms } = await axios.get('/api/firms')
    const data = firms.map(firm => {
      const getNames = array => {
        const names = array.map(({ name }) => name)
        return names.join('; ')
      }
      const locations = getNames(firm.locations)
      const practices = getNames(firm.practices)
      const qualifications = getNames(firm.qualifications)

      let requiredGPA = null
      let preferredGPA = null
      if (firm.gpa) {
        if (firm.gpa.required) requiredGPA = firm.gpa.required
        if (firm.gpa.band) preferredGPA = firm.gpa.band
      }

      let largeSalary = null
      let smallSalary = null
      if (firm.salary) {
        if (firm.salary.large) largeSalary = firm.salary.large
        if (firm.salary.small) smallSalary = firm.salary.small
      }

      const rankingsArray = firm.rankings.map(
        ({ ranking, position }) => `${ranking.name}: ${position}`
      )
      const rankings = rankingsArray.join('; ')

      const date = new Date(firm.date)

      return {
        id: firm._id,
        name: firm.name,
        firmLink: firm.links.firm,
        chambersLink: firm.links.chambers,
        vaultLink: firm.links.vault,
        locations,
        practices,
        requiredGPA,
        preferredGPA,
        largeSalary,
        smallSalary,
        rankings,
        qualifications,
        date: date.toLocaleDateString('en-US'),
      }
    })

    const options = {
      header: true,
      columns: {
        id: 'ID',
        name: 'Name',
        firmLink: 'Firm Link',
        chambersLink: 'Chambers Link',
        vaultLink: 'Vault Link',
        locations: 'Locations',
        practices: 'Practices',
        requiredGPA: 'Required GPA',
        preferredGPA: 'Preferred GPA',
        largeSalary: 'Large Salary',
        smallSalary: 'Small Salary',
        rankings: 'Rankings',
        qualifications: 'Qualifications',
        date: 'Date',
      },
    }
    stringify(data, options, (error, output) => {
      if (!error) {
        const blob = new Blob([output], { type: 'text/csv;charset=utf-8' })
        saveAs(blob, 'firm-data.csv')
      }
    })
  }

  return (
    <div className="admin">
      <Container>
        <h1 className="admin__heading">Admin tools</h1>
        <div className="admin__main">
          <div className="admin__group">
            <h2 className="admin__subheading">Import firm data</h2>
            <form onSubmit={importFirms}>
              <input className="admin__file" type="file" accept=".csv" ref={input} />
              <div className="admin__radios">
                <div className="admin__radio-line">
                  <input
                    id="add"
                    className="admin__radio"
                    type="radio"
                    name="action"
                    value="add"
                    defaultChecked
                  />
                  <label htmlFor="add">Add</label>
                </div>
                <div className="admin__radio-line">
                  <input
                    id="replace"
                    className="admin__radio"
                    type="radio"
                    name="action"
                    value="replace"
                  />
                  <label htmlFor="replace">Replace</label>
                </div>
              </div>
              <Button className="admin__button">Submit</Button>
            </form>
          </div>

          <div className="admin__group">
            <h2 className="admin__subheading">Export firm data</h2>
            <Button className="admin__button" onClick={exportFirms}>
              Export
            </Button>
          </div>
        </div>
      </Container>
    </div>
  )
}
