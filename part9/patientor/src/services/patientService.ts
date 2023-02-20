import { v1 as uuid} from 'uuid'
import patientData from '../../data/patients'
import { NewPatient, NonSensitivePatient, Patient } from '../types'

const patients: Patient[] = patientData as Patient[]

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
    })) as NonSensitivePatient[]
}

const addPatient  = (newPatient: NewPatient): Patient => {
    const addedPatient: Patient = {
        ...newPatient,
        id: uuid()
    }
    patients.push(addedPatient)
    return addedPatient
}

export default {
    getEntries,
    getNonSensitiveEntries,
    addPatient
}