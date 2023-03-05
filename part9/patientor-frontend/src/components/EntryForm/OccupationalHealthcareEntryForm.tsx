import { Alert, Box, Button, TextField } from "@mui/material"
import axios from "axios"
import { useState, SyntheticEvent } from "react"
import { NewEntry, Patient, SickLeave } from "../../types"
import patientService from "../../services/patients"

interface Props {
    patientId: string;
    setPatient: React.Dispatch<React.SetStateAction<Patient | null>>;
    patient: Patient | null;
    entryType: string;
}

const OccupationalHealtcareEntryForm = (props: Props) => {
    const [description, setDescription] = useState("")
    const [date, setDate] = useState("")
    const [specialist, setSpecialist] = useState("")
    const [diagnosisCodes, setDiagnosisCodes] = useState("")
    const [employerName, setEmployerName] = useState("")
    const [sickleaveStartDate, setSickleaveStartDate] = useState("")
    const [sickleaveEndDate, setSickleaveEndDate] = useState("")

    const [error, setError] = useState("")

    const addEntry = async (event: SyntheticEvent) => {
        event.preventDefault()
        const entry: NewEntry = {
            description: description,
            type: "OccupationalHealthcare",
            date: date,
            specialist: specialist,
            employerName: employerName
        }
        const diagnosisCodesList  = diagnosisCodes.split(',')
        if (diagnosisCodesList.length > 0) {
            entry.diagnosisCodes = diagnosisCodesList
        }

        if (sickleaveStartDate.length > 0 && sickleaveEndDate.length > 0) {
            const sickLeave: SickLeave = {
                startDate: sickleaveStartDate,
                endDate: sickleaveEndDate
            }
            entry.sickLeave = sickLeave
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
          setDiagnosisCodes("")
          setSickleaveStartDate("")
          setSickleaveEndDate("")
          setEmployerName("")
          setSpecialist("")
        
    }

    if (props.entryType !== "OccupationalHealthcare") {
        return null
    }

    return (
        <div>
            <Alert severity="error" sx={{display: error.length > 0 ? "": "none"}}>{error}</Alert>
            <form onSubmit={addEntry}>
                <TextField label="Description" value={description} onChange={(event) => setDescription(event.target.value)} /> <br />
                <TextField type="date" value={date} onChange={(event) => setDate(event.target.value)} /> <br />
                <TextField label="Specialist" value={specialist} onChange={(event) => setSpecialist(event.target.value)} /> <br />
                <TextField InputLabelProps={{shrink: true}} type="date" label="Sickleave Start Date" value={sickleaveStartDate} onChange={(event) => setSickleaveStartDate(event.target.value)} /> <br />
                <TextField InputLabelProps={{shrink: true}} type="date" label="Sickleave End Date" value={sickleaveEndDate} onChange={(event) => setSickleaveEndDate(event.target.value)} /> <br />
                <TextField label="Employer Name" value={employerName} onChange={(event) => setEmployerName(event.target.value)} /> <br />
                <TextField label="Diagnosis Codes" value={diagnosisCodes} onChange={(event) => setDiagnosisCodes(event.target.value)} /> <br />
                <Button type="submit">Add</Button> <br />
            </form>
        </div>
    )
}

export default OccupationalHealtcareEntryForm