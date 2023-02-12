import express = require('express');
import { calculateBmi } from './bmiCalculator';
const app = express()


app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!')
})

app.get('/bmi', (req, res) => {
    console.log(req.query)

    const height = Number(req.query.height)
    const weight = Number(req.query.weight)
    
    const bmi  = calculateBmi(height, weight)
    
    res.send(JSON.stringify({
        weight,
        height,
        bmi 
    }))
})

const PORT = 3003

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})