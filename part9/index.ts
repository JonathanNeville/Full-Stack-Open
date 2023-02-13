import express = require('express');
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
import { isNumberArray } from './util_functions/isNumberArray';
const app = express();

app.use(express.json())

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);

    
    const bmi  = calculateBmi(height, weight);
    
    res.send(JSON.stringify({
        weight,
        height,
        bmi 
    }));
});

app.post('/exercises', (req, res) => {
    const body = req.body
    console.log("body", body)
    if (!body.daily_exercises || !body.target) {
        return res.status(400).send({
            error: "parameters missing"
        })
    }
    
    if (isNaN(Number(body.target)) || !isNumberArray(body.daily_exercises)) {
        return res.status(400).send({
            error: "parameters malformated"
        })
    }
    

    const exerciseStats = calculateExercises(body.daily_exercises, body.target)
    return res.send(JSON.stringify(exerciseStats))
})

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});