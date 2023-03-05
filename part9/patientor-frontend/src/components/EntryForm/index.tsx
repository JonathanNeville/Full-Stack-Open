import { Alert, Box, Button, FormControlLabel, Radio, RadioGroup, SelectChangeEvent, TextField, Typography } from "@mui/material"
import axios from "axios";
import { SetStateAction, SyntheticEvent, useState } from "react"
import patientService from "../../services/patients"
import { NewEntry, Patient } from "../../types"
import HealtcheckEntryForm from "./HealtcheckEntryForm";
import HospitalEntryForm from "./HospitalEntryForm";
import OccupationalHealtcareEntryForm from "./OccupationalHealthcareEntryForm";

interface Props {
    patientId: string;
    setPatient: React.Dispatch<React.SetStateAction<Patient | null>>;
    patient: Patient | null;
}

const EntryForm = (props: Props) => {
    const [entryType, setEntryType] = useState("")

    return (
        <div>
            <Box
            sx={{
                width: 800,
                border: "solid 1px",
                borderRadius: 1,
                padding: 1
            }}>
                <RadioGroup
                    row
                    value={entryType}
                    onChange={(event) => setEntryType(event.target.value)}
                    >
                    <FormControlLabel value="HealthCheck" label="HealthCheck" control={<Radio/>}></FormControlLabel>
                    <FormControlLabel value="OccupationalHealthcare" label="Occupational Healthcare" control={<Radio/>}></FormControlLabel>
                    <FormControlLabel value="Hospital" label="Hospital" control={<Radio/>}></FormControlLabel>
                </RadioGroup>
                <HealtcheckEntryForm patientId={props.patientId} setPatient={props.setPatient} patient={props.patient} entryType= {entryType} />
                <HospitalEntryForm patientId={props.patientId} setPatient={props.setPatient} patient={props.patient} entryType= {entryType} />
                <OccupationalHealtcareEntryForm patientId={props.patientId} setPatient={props.setPatient} patient={props.patient} entryType= {entryType} />

            </Box>
        </div>
    )
}

export default EntryForm