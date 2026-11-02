import CourseCard from "./CourseCard.jsx";
import "../assets/CourseList.css";

function CourseList({
                        courses,
                        completedCourses,
                        setCompletedCourses,
                        courseFilter
                    }) {

    const filteredCourses = courses.filter(course => {
        const completed = completedCourses.some(
            id => Number(id) === Number(course.id)
        );

        if (courseFilter === 'completed') {
            return completed;
        }

        if (courseFilter === 'remaining') {
            return !completed;
        }

        return true;
    });

    return (
        <div className="course-list">
            {filteredCourses.map(course => {
                const prerequisiteNumbers = (
                    course.prerequisites ?? []
                )
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
                        onToggleCompleted={() =>
                            setCompletedCourses(course.id)
                        }
                    />
                );
            })}
        </div>
    );
}

export default CourseList;