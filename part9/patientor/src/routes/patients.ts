import express from 'express'
import patientService from '../services/patientService'


const router = express.Router()

router.get('/', (_req, res) => {
    res.type('json').send(JSON.stringify(patientService.getNonSensitiveEntries()))
})

export default router