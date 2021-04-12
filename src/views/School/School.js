import Container from 'components/Container'
import RankingForm from './components/RankingForm'
import FirmForm from './components/FirmForm'
import OfficeForm from './components/OfficeForm'
import './School.scss'

export default function School() {
  return (
    <div className="school">
      <Container>
        <h1>School Tools</h1>
        <RankingForm />
        <FirmForm />
        <OfficeForm />
      </Container>
    </div>
  )
}
