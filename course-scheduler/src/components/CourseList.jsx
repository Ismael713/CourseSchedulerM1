import CourseCard from "./CourseCard.jsx";
import "../assets/CourseList.css";

function CourseList({ courses, completedCourses, setCompletedCourses }) {

    return (
        <div className="course-list">
            {courses.map(course => {
                const prerequisiteNumbers = (course.prerequisites ?? [])
                    .map(prereqId => {
                        const prerequisite = courses.find(
                            c => Number(c.id) === Number(prereqId)
                        );
                        return prerequisite?.number;
                    })
                    .filter(Boolean);

                return (
                    <CourseCard
                        key={course.id}
                        course={course}
                        prerequisiteNumbers={prerequisiteNumbers}
                        completedCourses={completedCourses}
                        onToggleCompleted={() => setCompletedCourses(course.id)}
                    />
                );
            })}
        </div>
    );
}

export default CourseList;