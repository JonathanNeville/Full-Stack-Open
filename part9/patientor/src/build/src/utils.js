"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
const isString = (text) => {
    return typeof text === 'string' || text instanceof String;
};
const isGender = (param) => {
    return Object.values(types_1.Gender).map(g => g.toString()).includes(param);
};
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
const parseName = (name) => {
    if (!name || !isString(name)) {
        throw new Error('incorrect or missing name');
    }
    return name;
};
const parseSsn = (ssn) => {
    if (!ssn || !isString(ssn)) {
        throw new Error('incorrect or missing ssn');
    }
    return ssn;
};
const parseOccupation = (occupation) => {
    if (!occupation || !isString(occupation)) {
        throw new Error('Incorrect or missing occupation');
    }
    return occupation;
};
const parseGender = (gender) => {
    if (!gender || !isString(gender) || !isGender(gender)) {
        throw new Error('incorrect or missing gender' + gender);
    }
    return gender;
};
const parseDateOfBirth = (dateOfBirth) => {
    if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
        throw new Error('incorrect or missing date of birth:' + dateOfBirth);
    }
    return dateOfBirth;
};
const toNewPatient = (object) => {
    if (!object || typeof object !== 'object') {
        throw new Error('incorrect or missing object');
    }
    if ('name' in object && 'ssn' in object && 'occupation' in object && 'gender' in object && 'dateOfBirth' in object) {
        const newPatient = {
            name: parseName(object.name),
            ssn: parseSsn(object.ssn),
            occupation: parseOccupation(object.occupation),
            gender: parseGender(object.gender),
            dateOfBirth: parseDateOfBirth(object.dateOfBirth)
        };
        return newPatient;
    }
    throw new Error('Incorrect Data: some fields are missing');
};
exports.default = toNewPatient;
