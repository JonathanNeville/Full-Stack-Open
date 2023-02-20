export interface CourseInfoProps {
    name: string;
    exerciseCount: number;
}

const CourseInfo = (props: CourseInfoProps) => {
    return (
        <div>
            <p>
                {props.name} {props.exerciseCount}
            </p>
        </div>
    )
}

export default CourseInfo