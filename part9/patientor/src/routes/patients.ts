import express from 'express'
import patientService from '../services/patientService'
import toNewEntry from '../utils/entryUtils'
import toNewPatient from '../utils/patientUtils'


const router = express.Router()

router.get('/', (_req, res) => {
    res.type('json').send(JSON.stringify(patientService.getNonSensitiveEntries()))
})

router.get('/:id', (req, res) => {
    const id = req.params.id
    
    try {
        const patient  = patientService.getPatientById(id)
        res.send(patient)
    }
    catch (error) {
        res.status(400).send(`Error: couldnt find patient with id ${id}`)
    }
    
})

router.post('/', (req, res) => {
    try {
        const newPatient = toNewPatient(req.body)
        const addedPatient  = patientService.addPatient(newPatient)
        res.json(addedPatient)
    } catch (error: unknown) {
        let errorMessage = 'Something went wrong'
        if (error instanceof Error) {
            errorMessage += 'Error: ' + error.message;
        }
        res.status(400).send(errorMessage)
    }
})

router.post('/:id/entries', (req, res) => {
    const id = req.params.id
 
    try {
        const newEntry = toNewEntry(req.body)
        const updatedPatient = patientService.addEntry(newEntry, id)
        res.send(updatedPatient)
    } catch (error: unknown) {
        let errorMessage = 'Something went wrong'
        if (error instanceof Error) {
            errorMessage += 'Error: ' + error.message;
        }
        res.status(400).send(errorMessage)
    }

})

export default router