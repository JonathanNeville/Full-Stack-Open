

const calculateBmi= (height: number, weight: number) : string => {
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

console.log(calculateBmi(180, 74))