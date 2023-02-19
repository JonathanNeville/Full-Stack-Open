import patientData from '../../data/patients'
import { NonSensitivePatient, Patient } from '../types'

const patients: Patient[] = patientData

const getEntries = () => {
    return JSON.stringify(patients)
}

const getNonSensitiveEntries = (): NonSensitivePatient[] => {
    return patientData.map(({id, name, dateOfBirth, gender, occupation}) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }))
}

export default {
    getEntries,
    getNonSensitiveEntries
}