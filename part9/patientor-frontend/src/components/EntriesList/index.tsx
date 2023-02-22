import { List, ListItem, Typography } from "@mui/material";
import { Entry } from "../../types";

interface EntriesListProps {
    entries: Entry[];
}

interface DiagnosisCodesProps {
    diagnosisCodes: Entry["diagnosisCodes"] | undefined;
}

const DiagnosisCodes = ({diagnosisCodes}: DiagnosisCodesProps) => {
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
                    <li>{d}</li>
                )
            })}
            </ul>
            
        </div>
    )
}

const EntriesList = ({entries} : EntriesListProps) => {
    return (
        <div>
            <Typography variant="h5" >Entries</Typography>
            {
                entries.map(e => {
                    return (
                        <div>
                            <Typography>{e.date}: {e.description}</Typography>
                            <DiagnosisCodes diagnosisCodes={e.diagnosisCodes} />
                        </div>
                    )
                })
            }
            
        </div>
        
    )
}

export default EntriesList