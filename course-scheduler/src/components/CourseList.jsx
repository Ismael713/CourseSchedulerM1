import CourseCard from "./CourseCard";

function CourseList({courses, completedCourses = [], onToggleCompleted, filter}) {

    const filteredCourses = courses.filter(course => {
        if (filter === "completed") {
            return completedCourses.some(
                id => Number(id) === Number(course.id)
            );
        }

        if (filter === "remaining") {
            return !completedCourses.some(
                id => Number(id) === Number(course.id)
            );
        }

        return true;
    });

    return (
        <div className="row row-cols-1 row-cols-2 row-cols-3 g-4">
            {filteredCourses.length === 0 ? (
                <div className="col-12 text-center">
                    <p>No courses to display.</p>
                </div>
            ) : (
                filteredCourses.map(course => {

                    // Convert prerequisite IDs into course numbers
                    const prerequisiteNumbers = (
                        course.prerequisites ?? []
                    ).map(id => {
                        const prerequisiteCourse = courses.find(
                            c => Number(c.id) === Number(id)
                        );

                        return prerequisiteCourse
                            ? prerequisiteCourse.number
                            : "Unknown";
                    });

                    return (
                        <CourseCard
                            key={course.id}
                            course={course}
                            prerequisiteNumbers={prerequisiteNumbers}
                            completedCourses={completedCourses}
                            onToggleCompleted={onToggleCompleted}
                        />
                    );
                })
            )}
        </div>
    );
}

export default CourseList;