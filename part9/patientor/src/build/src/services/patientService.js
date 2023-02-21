"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const patients_1 = __importDefault(require("../../data/patients"));
const patients = patients_1.default.map(p => (Object.assign(Object.assign({}, p), { entries: [] })));
const getEntries = () => {
    return JSON.stringify(patients);
};
const getNonSensitiveEntries = () => {
    return patients_1.default.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
};
const getPatientById = (id) => {
    const patient = patients.find(p => p.id === id);
    if (!patient) {
        throw new Error(`Error: Patient With id ${id} does not exist`);
    }
    return patient;
};
const addPatient = (newPatient) => {
    const addedPatient = Object.assign(Object.assign({}, newPatient), { id: (0, uuid_1.v1)() });
    patients.push(addedPatient);
    return addedPatient;
};
exports.default = {
    getEntries,
    getNonSensitiveEntries,
    getPatientById,
    addPatient
};
