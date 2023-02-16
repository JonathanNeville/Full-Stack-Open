import diagnoseData from '../../data/diagnoses'

import { Diagnose } from '../types'

const diagnoses: Diagnose[] = diagnoseData

const getEntries = () => {
    return JSON.stringify(diagnoses)
}

const addDiagnose = () => {
    return null
}


export default {
    getEntries,
    addDiagnose,
}