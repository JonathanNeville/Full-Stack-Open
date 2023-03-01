import { Gender, NewPatient } from "../types";

export const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
}

const isGender = (param: string): param is Gender => {
    return Object.values(Gender).map(g => g.toString()).includes(param)
}

export const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date))
}

const parseName = (name: unknown): string => {
    if (!name || !isString(name)) {
        throw new Error('incorrect or missing name')
    }
    return name
}

const parseSsn = (ssn: unknown): string => {
    if (!ssn || !isString(ssn)) {
        throw new Error('incorrect or missing ssn')
    }
    return ssn
}

const parseOccupation = (occupation: unknown): string => {
    if (!occupation || !isString(occupation)) {
        throw new Error('Incorrect or missing occupation')
    }
    return occupation
}

const parseGender = (gender: unknown): Gender => {
    if (!gender || !isString(gender) || !isGender(gender)) {
        throw new Error('incorrect or missing gender' + gender)
    }
    return gender
}

const parseDateOfBirth = (dateOfBirth: unknown): string => {
    if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
        throw new Error('incorrect or missing date of birth:' + dateOfBirth)
    }
    return dateOfBirth
}

const toNewPatient = (object: unknown): NewPatient => {
    if (!object || typeof object !== 'object') {
        throw new Error('incorrect or missing object')
    }
    if ('name' in object && 'ssn' in object && 'occupation' in object && 'gender' in object && 'dateOfBirth' in object) {
        const newPatient: NewPatient = {
            name: parseName(object.name),
            ssn: parseSsn(object.ssn),
            occupation: parseOccupation(object.occupation),
            gender: parseGender(object.gender),
            dateOfBirth: parseDateOfBirth(object.dateOfBirth),
            entries: []
        }
        
        return newPatient
    }
    throw new Error ('Incorrect Data: some fields are missing')
    
}

export default toNewPatient
