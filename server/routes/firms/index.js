import { Router } from 'express'
import Firm from '../../models/Firm'
import get from '../shared/get'
import put from './putFirms'

const router = Router()
router.get('/', get(Firm))
router.put('/', put)

export default router
