"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDate = exports.isString = void 0;
const types_1 = require("../types");
const isString = (text) => {
    return typeof text === 'string' || text instanceof String;
};
exports.isString = isString;
const isGender = (param) => {
    return Object.values(types_1.Gender).map(g => g.toString()).includes(param);
};
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
exports.isDate = isDate;
const parseName = (name) => {
    if (!name || !(0, exports.isString)(name)) {
        throw new Error('incorrect or missing name');
    }
    return name;
};
const parseSsn = (ssn) => {
    if (!ssn || !(0, exports.isString)(ssn)) {
        throw new Error('incorrect or missing ssn');
    }
    return ssn;
};
const parseOccupation = (occupation) => {
    if (!occupation || !(0, exports.isString)(occupation)) {
        throw new Error('Incorrect or missing occupation');
    }
    return occupation;
};
const parseGender = (gender) => {
    if (!gender || !(0, exports.isString)(gender) || !isGender(gender)) {
        throw new Error('incorrect or missing gender' + gender);
    }
    return gender;
};
const parseDateOfBirth = (dateOfBirth) => {
    if (!dateOfBirth || !(0, exports.isString)(dateOfBirth) || !(0, exports.isDate)(dateOfBirth)) {
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
            dateOfBirth: parseDateOfBirth(object.dateOfBirth),
            entries: []
        };
        return newPatient;
    }
    throw new Error('Incorrect Data: some fields are missing');
};
exports.default = toNewPatient;
