import { Router } from 'express'
import School from '../../models/School'
import get from '../shared/get'
import putOffice from './putOffice'

const router = Router()
router.get('/', get(School))
router.put('/', putOffice)

export default router
