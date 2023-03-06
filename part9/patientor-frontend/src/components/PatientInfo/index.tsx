import { Female, Male, Transgender } from "@mui/icons-material"
import { Typography } from "@mui/material"
import { useParams } from "react-router-dom"
import { Diagnosis, Patient } from "../../types"
import patientService from "../../services/patients"
import { useEffect, useState } from "react"
import EntriesList from "../EntriesList"
import EntryForm from "../EntryForm"

interface Props {
    diagnoses: Diagnosis[];
}

const PatientInfo = ({diagnoses} : Props) => {
    const [patient, setPatient] = useState<Patient | null>(null)
    const id = useParams().id 
    
    useEffect(() => {
         patientService.getPatientById(id!).then((p) => setPatient(p.data))
        }, [id]
    )

    if (!patient) {
        return (
            <p>Error</p>
        )
    }

    return(
        <div>
            <Typography variant="h4">{patient.name} {patient.gender === "female" ? <Female/> : patient.gender === "male" ? <Male/>: <Transgender/>}</Typography>
            <Typography>ssh: {patient.ssn}</Typography>
            <Typography>occupation: {patient.occupation}</Typography>
            <EntryForm patientId={patient.id} setPatient={setPatient} patient={patient} diagnoses={diagnoses}/>
            <EntriesList entries={patient.entries} diagnoses={diagnoses}/>
        </div>
    )
}

export default PatientInfo