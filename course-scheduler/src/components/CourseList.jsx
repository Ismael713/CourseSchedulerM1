
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
            {filteredCourses.map(course => (
                <CourseCard
                    key={course.id}
                    course={course}
                    courses={courses}
                    completedCourses={completedCourses}
                    onToggleCompleted={setCompletedCourses}
                />
            ))}
        </div>
    );
}

export default CourseList;
