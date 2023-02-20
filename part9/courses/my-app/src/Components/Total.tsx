import { CoursePart } from "../types/types";


interface TotalProps {
    courseParts: CoursePart[];
}

const Total = (props: TotalProps) => {
    return(
        <div>
            <p>
                Number of Exercises {" "}
                {props.courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
            </p>
        </div>
    )
}

export default Total