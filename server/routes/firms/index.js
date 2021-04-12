import { Router } from 'express'
import Firm from '../../models/Firm'
import get from '../shared/get'
import post from './postFirm'

const router = Router()
router.get('/', get(Firm))
router.post('/', post)

export default router
