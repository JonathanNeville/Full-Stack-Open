import { CoursePart } from "../types/types"

interface PartProps {
    coursePart: CoursePart;
    key: string;
}

const Part = (props: PartProps) => {
    switch (props.coursePart.kind) {
        case 'basic':
            return (
                <div>
                    <h4>
                        {props.coursePart.name} {props.coursePart.exerciseCount}
                    </h4>
                    <p>{props.coursePart.description}</p>
                </div>
            )
        case 'background':
            return (
                <div>
                    <h4>
                        {props.coursePart.name} {props.coursePart.exerciseCount}
                    </h4>
                    <p>
                        {props.coursePart.description}
                    </p>
                    <a href={props.coursePart.backroundMaterial} >
                        {props.coursePart.backroundMaterial}
                    </a>
                </div>
            )
        case 'group':
            return (
                <div>
                    <h4>
                        {props.coursePart.name} {props.coursePart.exerciseCount}
                    </h4>
                    <p>project exercices {props.coursePart.groupProjectCount}</p>
                    
                </div>
            )
        default:
            return (
                <div>
                    <p>oh oh</p>
                </div>
            )
    }

}

export default Part