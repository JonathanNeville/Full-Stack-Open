import { HealthCheckRating, NewEntry } from "../types";
import { isDate, isString } from "./patientUtils";

/* const isArrayOfStrings = (array: unknown): boolean => {
    if (Array.isArray(array) && array.every(i => typeof i === "string")) {
        return true
    }
    
    return false
}
 */


const parseDescription = (description: unknown): string => {
    if (!description || !isString(description)) {
        throw new Error("incorrect or missing description")
    }
    return description
}

const parseDate = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('incorrect or missing date' )
    }
    return date
}

const parseSpecialist = (specialist: unknown): string => {
    if (!specialist || !isString(specialist)) {
        throw new Error("incorrect or missing specialist") 
    }
    return specialist
}

const parseDiagnosisCodes = (diagnosisCodes: unknown): string[] => {
    if (!diagnosisCodes || !Array.isArray(diagnosisCodes) || !diagnosisCodes.every(i => typeof i === "string")) {
        throw new Error("incorrect or missing diagnosisCodes")
    }
    return diagnosisCodes
}

const parseCriteria = (criteria: unknown) : string => {
    if (!criteria || !isString(criteria)) {
        throw new Error("Incorrect or missing criteria in discharge field")
    }
    return criteria
}

const parseHealthCheckRating = (healthCheckRating: unknown) : HealthCheckRating => {
    if (!healthCheckRating || typeof healthCheckRating !== "number" ||!Number.isInteger(healthCheckRating) || healthCheckRating < 0 || healthCheckRating > 3) {
        throw new Error ("Incorrect or missing healthCheckRating")
    }
    return healthCheckRating
}

const parseEmployerName = (employerName: unknown) : string => {
    if (!employerName || !isString(employerName)) {
        throw new Error("Incorrect or missing criteria in discharge field")
    }
    return employerName
}

const toNewEntry = (object: unknown): NewEntry => {
    if (!object || typeof object !== 'object') {
        throw new Error('incorrect or missing object')
    }
    if ('type' in object) {
        switch (object.type) {
            case 'Hospital': {
                if ("description" in object && "date" in object && "specialist" in object && "discharge" in object) {
                    if (!object.discharge || typeof object.discharge !== 'object') {
                        throw new Error('incorrect or missing discharge')
                    }
                    let discharge = {
                        date: "",
                        criteria: ""
                    }
                    if ("date" in object.discharge && "criteria" in object.discharge) {
                        discharge = {
                            date: parseDate(object.discharge.date),
                            criteria: parseCriteria(object.discharge.criteria)
                        }
                    }
                    else {
                        throw new Error("incorrect data")
                    }
                    

                    const entry: NewEntry = {
                        type: "Hospital",
                        description: parseDescription(object.description),
                        date: parseDate(object.date),
                        specialist: parseSpecialist(object.specialist),
                        discharge: discharge
                    }
                    if ("diagnosisCodes" in object) {
                        entry.diagnosisCodes = parseDiagnosisCodes(object.diagnosisCodes)
                    }
                    return entry
                }
                throw new Error('Incorrect Data: some fields are missing')
                
            }
            case 'HealthCheck': {
                if ("description" in object && "date" in object && "specialist" in object && "healthCheckRating" in object) {
                    const entry: NewEntry = {
                        type: "HealthCheck",
                        description: parseDescription(object.description),
                        date: parseDate(object.date),
                        specialist: parseSpecialist(object.specialist),
                        healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
                    }
                    if ("diagnosisCodes" in object) {
                        entry.diagnosisCodes = parseDiagnosisCodes(object.diagnosisCodes)
                    }
                    return entry
                }
                throw new Error('Incorrect Data: some fields are missing')
            }
            case 'OccupationalHealthcare': {
                if ("description" in object && "date" in object && "specialist" in object && "employerName" in object) {
                    const entry: NewEntry = {
                        type: "OccupationalHealthcare",
                        description: parseDescription(object.description),
                        date: parseDate(object.date),
                        specialist: parseSpecialist(object.specialist),
                        employerName: parseEmployerName(object.employerName)
                    }
                    if ("diagnosisCodes" in object) {
                        entry.diagnosisCodes = parseDiagnosisCodes(object.diagnosisCodes)
                    }

                    if ("sickLeave" in object) {
                        if (!object.sickLeave || typeof object.sickLeave !== 'object') {
                            throw new Error('incorrect or missing sickLeave')
                        }
                        let sickLeave = {
                            startDate: "",
                            endDate: ""
                        }
                        if ("startDate" in object.sickLeave && "endDate" in object.sickLeave) {
                            sickLeave = {
                                startDate: parseDate(object.sickLeave.startDate),
                                endDate: parseDate(object.sickLeave.endDate)
                            }
                        }
                        else {
                            throw new Error("incorrect data")
                        }

                        entry.sickLeave = sickLeave
                    }

                    return entry
                }
                throw new Error('Incorrect Data: some fields are missing')
            }
        }
    }
    throw new Error("no type specified")
}

export default toNewEntry