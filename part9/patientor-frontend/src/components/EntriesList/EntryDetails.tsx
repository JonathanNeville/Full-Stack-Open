import { Favorite, LocalHospital, MedicalInformation, Work } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { Diagnosis, Entry } from "../../types"

interface Props {
    entry: Entry;
    diagnoses: Diagnosis[];
}

interface DiagnosisCodesProps {
    diagnosisCodes: Entry["diagnosisCodes"] | undefined;
    diagnoses: Diagnosis[];
}

const DiagnosisCodes = ({diagnosisCodes, diagnoses}: DiagnosisCodesProps) => {
    if (!diagnosisCodes) {
        return (
            <div></div>
        )
    }
    
    return(
        <div>
            <ul>
            {diagnosisCodes.map(d => {
                return(
                    <li key={d}>{d}:  {diagnoses.find(diagnose => diagnose.code === d)?.name}</li>
                )
            })}
            </ul>
            
        </div>
    )
}



const HealthCheckEntry = ({entry, diagnoses}: Props) => {
    if (entry.type !== "HealthCheck") {
        return (
            <div>
                Error: Entry type is incompatible with component
            </div>
        )
    }

    const favoriteColor = entry.healthCheckRating === 0 ?
        "green": entry.healthCheckRating === 1?
        "yellow": entry.healthCheckRating === 2?
        "orange": "red"
    return (
        <div>
            
            <Typography>{entry.date}  <MedicalInformation /></Typography>
            <Typography>{entry.description}</Typography>
            <DiagnosisCodes diagnosisCodes={entry.diagnosisCodes} diagnoses={diagnoses} />
            <Favorite sx={{color: favoriteColor}}/>
        </div>
    )
}

const OccupationalEntry = ({entry, diagnoses}: Props) => {
    if (entry.type !== "OccupationalHealthcare") {
        return (
            <div>
                Error: Entry type is incompatible with component
            </div>
        )
    }

    return (
        <div>
            <Typography>{entry.date}  <Work/> {entry.employerName}</Typography>
            <Typography>{entry.description}</Typography>
            <DiagnosisCodes diagnosisCodes={entry.diagnosisCodes} diagnoses={diagnoses} />
        </div>
    )
}

const HospitalEntry = ({entry, diagnoses}: Props) => {
    return (
        <div>
            <Typography>{entry.date}  <LocalHospital/></Typography>
            <Typography>{entry.description}</Typography>
            <DiagnosisCodes diagnosisCodes={entry.diagnosisCodes} diagnoses={diagnoses} />
        </div>
    )
}

const EntryDetails = ({entry, diagnoses}: Props) => {
    switch (entry.type) {
        case "Hospital":
            return <HospitalEntry entry={entry} diagnoses={diagnoses} />
        case "OccupationalHealthcare":
            return <OccupationalEntry entry={entry} diagnoses={diagnoses}/>
        case "HealthCheck":
            return <HealthCheckEntry entry={entry} diagnoses={diagnoses}/>
        
    }
}

export default EntryDetails