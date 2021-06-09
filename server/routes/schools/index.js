import { Router } from 'express'
import getSchoolFirms from './getSchoolFirms'
import putOffice from './putOffice'

const router = Router()
router.get('/', getSchoolFirms)
router.put('/', putOffice)

export default router
