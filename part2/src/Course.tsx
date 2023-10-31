
type CourseDetails = {
    courses: {
        id: number;
        name: string;
        parts: {
            name: string;
            id: number;
            exercises: number;
        }[];
    }[]
}
export const Course = ({courses}: CourseDetails) => {
    return(
        <div>
            <h3>Web development curriculum</h3>
            <ul style={{listStyleType: "none"}}>
                {courses.map(course => {
                    return(
                        <div key={course.id}>
                            <li><strong>{course.name}</strong></li>
                            {course.parts.map(part => <li key={part.id}>{part.name} {part.exercises}</li>)}
                            <strong>total of {course.parts.reduce((a, b) => a + b.exercises, 0)} exercises</strong>
                        </div>
                    )
                })}
            </ul>
        </div>
    )
}