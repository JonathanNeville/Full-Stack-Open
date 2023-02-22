import { List, ListItem, Typography } from "@mui/material";
import { Diagnosis, Entry } from "../../types";

interface EntriesListProps {
    entries: Entry[];
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

const EntriesList = ({entries, diagnoses} : EntriesListProps) => {
    return (
        <div>
            <Typography variant="h5" >Entries</Typography>
            {
                entries.map(e => {
                    return (
                        <div key={e.id}>
                            <Typography>{e.date}: {e.description}</Typography>
                            <DiagnosisCodes diagnosisCodes={e.diagnosisCodes} diagnoses={diagnoses} />
                        </div>
                    )
                })
            }
            
        </div>
        
    )
}

export default EntriesList