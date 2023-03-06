import { Alert, Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material"
import axios from "axios"
import { useState, SyntheticEvent } from "react"
import { Diagnosis, NewEntry, Patient } from "../../types"
import patientService from "../../services/patients"

interface Props {
    patientId: string;
    setPatient: React.Dispatch<React.SetStateAction<Patient | null>>;
    patient: Patient | null;
    entryType: string;
    diagnoses: Diagnosis[];
}

const HospitalEntryForm = (props: Props) => {
    const [description, setDescription] = useState("")
    const [date, setDate] = useState("")
    const [specialist, setSpecialist] = useState("")
    const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([])
    const [dischargeDate, setDischargeDate] = useState("")
    const [dischargeCriteria, setDischargeCriterea] = useState("")

    const [error, setError] = useState("")

    const addEntry = async (event: SyntheticEvent) => {
        event.preventDefault()
        const entry: NewEntry = {
            description: description,
            type: "Hospital",
            date: date,
            specialist: specialist,
            discharge: {
                date: dischargeDate,
                criteria: dischargeCriteria
            }
        }
        if (diagnosisCodes.length > 0) {
            
            entry.diagnosisCodes = diagnosisCodes
        }
        try {
            const updatedPatient = await patientService.postEntry(entry, props.patientId)
            if (props.patient) {
                props.setPatient(updatedPatient)
            }
        } catch (e: unknown) {
            if (axios.isAxiosError(e)) {
              if (e?.response?.data && typeof e?.response?.data === "string") {
                const message = e.response.data.replace('Something went wrong. Error: ', '');
                console.error(message);
                setError(message);
              } else {
                setError("Unrecognized axios error");
              }
            } else {
              console.error("Unknown error", e);
              setError("Unknown error");
            }
            setTimeout(() => {
                setError("")
            }, 5000)
          }
          setDescription("")
          setDate("")
          setDiagnosisCodes([])
          setDischargeDate("")
          setDischargeCriterea("")
          setSpecialist("")
        
    }

    if (props.entryType !== "Hospital") {
        return null
    }

    return (
        <div>
            <Alert severity="error" sx={{display: error.length > 0 ? "": "none"}}>{error}</Alert>
            <form onSubmit={addEntry}>
                <TextField label="Description" value={description} onChange={(event) => setDescription(event.target.value)} /> <br />
                <TextField type="date" value={date} onChange={(event) => setDate(event.target.value)} /> <br />
                <TextField label="Specialist" value={specialist} onChange={(event) => setSpecialist(event.target.value)} /> <br />
                <TextField InputLabelProps={{shrink: true}} type="date" label="Discharge date" value={dischargeDate} onChange={(event) => setDischargeDate(event.target.value)} /> <br />
                <TextField label="Discharge Criteria" value={dischargeCriteria} onChange={(event) => setDischargeCriterea(event.target.value)} /> <br />
                <FormControl fullWidth>
                    <InputLabel>DiagnosisCodes</InputLabel>
                    <Select 
                        label="Diagnosis Codes" 
                        value={diagnosisCodes} 
                        onChange={(event) => setDiagnosisCodes(typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value)} 
                        multiple
                        autoWidth
                    >
                        {props.diagnoses.map(d => <MenuItem key={d.code} value={d.code}>{d.code}</MenuItem>)}
                    </Select> <br />
                </FormControl>
                <Button type="submit">Add</Button> <br />
            </form>
        </div>
    )
}

export default HospitalEntryForm