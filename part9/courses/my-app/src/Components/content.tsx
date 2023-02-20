import { CoursePart } from "../types/types";
import Part from "./Part";


interface ContentProps {
    courseParts: CoursePart[];
}

const Content = (props: ContentProps) => {
    
    return(
        <div>
            {props.courseParts.map((c) => <Part coursePart={c} key={c.name}/>)}
        </div>
    )
}

export default Content