import { CourseInfoProps } from "./CourseInfo"

interface TotalProps {
    courseParts: CourseInfoProps[];
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