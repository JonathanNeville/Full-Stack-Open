import { v1 as uuid} from 'uuid'
import patientData from '../../data/patients'
import { Entry, NewEntry, NewPatient, NonSensitivePatient, Patient } from '../types'

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

const getPatientById = (id: string) : Patient  => {
    const patient =  patients.find(p => p.id === id)
    if (!patient) {
        throw new Error(`Error: Patient With id ${id} does not exist`)
    }
    return patient
}

const addPatient  = (newPatient: NewPatient): Patient => {
    const addedPatient: Patient = {
        ...newPatient,
        id: uuid()
    }
    patients.push(addedPatient)
    return addedPatient
}

const addEntry = (newEntry: NewEntry, patientId: Patient["id"]): Patient => {
    const addedEntry: Entry = {
        ...newEntry,
        id: uuid()
    }

    try {
        const patientIndex = patients.findIndex(obj => obj.id === patientId)
        patients[patientIndex].entries.push(addedEntry)
        return patients[patientIndex]
    } catch {
        throw new Error("couldnt add entry")
    }
}

export default {
    getEntries,
    getNonSensitiveEntries,
    getPatientById,
    addPatient,
    addEntry
}