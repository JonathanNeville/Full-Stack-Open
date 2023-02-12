if (process.argv.length < 4) {
    console.log("Usage: npm run calculateBmi *height in cm* *weight in kg*")
}

const height = Number(process.argv[2])
const weight = Number(process.argv[3])

export const calculateBmi= (height: number, weight: number) : string => {
    const bmi = weight/(height/100)**2

    if (height < 0 || weight < 0) {
        return "Error: Weight and height must be positive numbers"
    }

    if (bmi > 30) {
        return "Obese"
    }
    if (bmi > 25) {
        return "Overweight"
    }
    if (bmi > 18.5) {
        return "Normal weight"
    }
    return "Underweight"
}

console.log(calculateBmi(height, weight))