import { Box, Button, SelectChangeEvent, TextField, Typography } from "@mui/material"
import axios from "axios";
import { SyntheticEvent, useState } from "react"
import patientService from "../../services/patients"
import { NewEntry, Patient } from "../../types"

interface Props {
    patientId: string;
    setPatient: React.Dispatch<React.SetStateAction<Patient | null>>;
    patient: Patient | null;
}

const EntryForm = (props: Props) => {
    const [description, setDescription] = useState("")
    const [date, setDate] = useState("")
    const [specialist, setSpecialist] = useState("")
    const [healthcheckRating, setHealthcheckRating] = useState("")
    const [diagnosisCodes, setDiagnosisCodes] = useState("")

    const [error, setError] = useState("")

    const addEntry = async (event: SyntheticEvent) => {
        event.preventDefault()
        const entry: NewEntry = {
            description: description,
            type: "HealthCheck",
            date: date,
            specialist: specialist,
            healthCheckRating: Number(healthcheckRating),
            diagnosisCodes: diagnosisCodes.split(',')
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
        
    }

    return (
        <div>
            <Box
            sx={{
                width: 600,
                border: "solid 1px",
                borderRadius: 1,
                padding: 1
            }}>
                <div style={{
                        display: error.length > 0 ? "": "none",
                        backgroundColor: "salmon",
                        border: "solid 1px red",
                        padding: 10,
                        margin: 10
                    }}>
                    <Typography>
                        {error}
                    </Typography>
                    
                </div>
                <form onSubmit={addEntry}>
                    <TextField label="Description" value={description} onChange={(event) => setDescription(event.target.value)} /> <br />
                    <TextField type="date" value={date} onChange={(event) => setDate(event.target.value)} /> <br />
                    <TextField label="Specialist" value={specialist} onChange={(event) => setSpecialist(event.target.value)} /> <br />
                    <TextField label="Healthcheck Rating" value={healthcheckRating} onChange={(event) => setHealthcheckRating(event.target.value)} /> <br />
                    <TextField label="Diagnosis Codes" value={diagnosisCodes} onChange={(event) => setDiagnosisCodes(event.target.value)} /> <br />
                    <Button type="submit">Add</Button> <br />
                </form>
            </Box>
        </div>
    )
}

export default EntryForm