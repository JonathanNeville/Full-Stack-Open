import { Typography } from "@mui/material";
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
                        <div key={e.id}>
                            <EntryDetails entry={e} diagnoses={diagnoses}/>
                        </div>
                    )
                })
            }
            
        </div>
        
    )
}

export default EntriesList