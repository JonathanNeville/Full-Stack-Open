import CourseInfo, { CourseInfoProps } from "./CourseInfo"

interface ContentProps {
    courseParts: CourseInfoProps[];
}

const Content = (props: ContentProps) => {
    return(
        <div>
            {props.courseParts.map((c) => <CourseInfo name={c.name} exerciseCount={c.exerciseCount} key={c.name}/>)}
        </div>
    )
}

export default Content