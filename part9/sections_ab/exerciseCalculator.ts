
const target = Number(process.argv[2]);
const exerciseHours = process.argv.slice(3).map(h => Number(h));

interface  ExerciseSummary {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

export const calculateExercises = (trainingHours: number[], target: number) : ExerciseSummary => {
    const periodLength = trainingHours.length;
    const trainingDays = trainingHours.filter(d => d > 0).length;
    let totalHours = 0;
    trainingHours.forEach(d => totalHours += d);
    const average = totalHours / periodLength;
    const success = average >= target ? true : false;
    const rating = !success ? 1 : average > target * 2 ? 3 : 2;
    const ratingDescription = rating === 1 ? "Disapointing": rating === 2 ? "Good job, but you could do better": "Awesome!";
    
    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    };
};

console.log(calculateExercises(exerciseHours, target));