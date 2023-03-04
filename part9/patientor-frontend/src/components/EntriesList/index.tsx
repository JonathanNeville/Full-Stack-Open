import { Paper, Typography } from "@mui/material";
import { Diagnosis, Entry } from "../../types";
import EntryDetails from "./EntryDetails";

interface EntriesListProps {
    entries: Entry[];
    diagnoses: Diagnosis[];
}


const EntriesList = ({entries, diagnoses} : EntriesListProps) => {
    return (
        <div>
            <Typography variant="h5" >Entries</Typography>
            {
                entries.map(e => {
                    return (
                        <Paper elevation={3} key={e.id} sx={{margin: 2, marginLeft: 0, padding: 1}}>
                            <EntryDetails entry={e} diagnoses={diagnoses}/>
                        </Paper>
                    )
                })
            }
            
        </div>
        
    )
}

export default EntriesList