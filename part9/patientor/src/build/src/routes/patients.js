"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientService_1 = __importDefault(require("../services/patientService"));
const entryUtils_1 = __importDefault(require("../utils/entryUtils"));
const patientUtils_1 = __importDefault(require("../utils/patientUtils"));
const router = express_1.default.Router();
router.get('/', (_req, res) => {
    res.type('json').send(JSON.stringify(patientService_1.default.getNonSensitiveEntries()));
});
router.get('/:id', (req, res) => {
    const id = req.params.id;
    try {
        const patient = patientService_1.default.getPatientById(id);
        res.send(patient);
    }
    catch (error) {
        res.status(400).send(`Error: couldnt find patient with id ${id}`);
    }
});
router.post('/', (req, res) => {
    try {
        const newPatient = (0, patientUtils_1.default)(req.body);
        const addedPatient = patientService_1.default.addPatient(newPatient);
        res.json(addedPatient);
    }
    catch (error) {
        let errorMessage = 'Something went wrong';
        if (error instanceof Error) {
            errorMessage += 'Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});
router.post('/:id/entries', (req, res) => {
    const id = req.params.id;
    try {
        const newEntry = (0, entryUtils_1.default)(req.body);
        const updatedPatient = patientService_1.default.addEntry(newEntry, id);
        res.send(updatedPatient);
    }
    catch (error) {
        let errorMessage = 'Something went wrong';
        if (error instanceof Error) {
            errorMessage += 'Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});
exports.default = router;
