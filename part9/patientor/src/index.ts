import express from "express";
import cors from 'cors'
import diagnosesRouter from './routes/diagnose'
import patientsRouter from "./routes/patients";

const app = express();
app.use(express.json());

app.use(cors())

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
    res.send('pong');
});

app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', patientsRouter)

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});