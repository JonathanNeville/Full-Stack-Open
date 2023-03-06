import { Box, FormControlLabel, Radio, RadioGroup } from "@mui/material"
import { useState } from "react"
import { Diagnosis, Patient } from "../../types"
import HealtcheckEntryForm from "./HealtcheckEntryForm";
import HospitalEntryForm from "./HospitalEntryForm";
import OccupationalHealtcareEntryForm from "./OccupationalHealthcareEntryForm";

interface Props {
    patientId: string;
    setPatient: React.Dispatch<React.SetStateAction<Patient | null>>;
    patient: Patient | null;
    diagnoses: Diagnosis[];
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
                <HealtcheckEntryForm patientId={props.patientId} setPatient={props.setPatient} patient={props.patient} entryType= {entryType} diagnoses={props.diagnoses}/>
                <HospitalEntryForm patientId={props.patientId} setPatient={props.setPatient} patient={props.patient} entryType= {entryType} diagnoses={props.diagnoses}/>
                <OccupationalHealtcareEntryForm patientId={props.patientId} setPatient={props.setPatient} patient={props.patient} entryType= {entryType} diagnoses={props.diagnoses}/>

            </Box>
        </div>
    )
}

export default EntryForm