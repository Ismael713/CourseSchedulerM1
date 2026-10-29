import '../assets/CourseList.css';
import useFetch from '../hooks/useFetch';
import CourseCard from './CourseCard';

function CourseList({ completedCourses, setCompletedCourses }) {
    const {
        data,
        isPending,
        error
    } = useFetch('/courses');

    const courses = Array.isArray(data)
        ? data
        : data?.courses ?? [];

    function toggleCompleted(courseId) {
        setCompletedCourses(previous => {
            const isAlreadyCompleted = previous.some(
                id => Number(id) === Number(courseId)
            );

            // If checked, add the course.
            if (!isAlreadyCompleted) {
                return [...previous, courseId];
            }

            // If unchecked, remove it.
            let updated = previous.filter(
                id => Number(id) !== Number(courseId)
            );

            // Repeatedly remove completed courses whose
            // prerequisites are no longer completed.
            let changed = true;

            while (changed) {
                changed = false;

                const next = updated.filter(id => {
                    const course = courses.find(
                        c => Number(c.id) === Number(id)
                    );

                    if (!course) return false;

                    const prerequisitesMet =
                        (course.prerequisites ?? []).every(
                            prereqId => updated.some(
                                completedId =>
                                    Number(completedId) ===
                                    Number(prereqId)
                            )
                        );

                    if (!prerequisitesMet) {
                        changed = true;
                        return false;
                    }

                    return true;
                });

                updated = next;
            }

            return updated;
        });
    }

    if (isPending) {
        return <div>Loading courses...</div>;
    }

    if (error) {
        return <div>Error loading courses: {error}</div>;
    }

    if (courses.length === 0) {
        return <div>No courses found.</div>;
    }

    const courseNumbersById = new Map(
        courses.map(course => [
            String(course.id),
            course.number
        ])
    );

    return (
        <div className="course-list">
            {courses.map(course => {
                const prerequisiteNumbers =
                    (course.prerequisites ?? []).map(
                        prereqId =>
                            courseNumbersById.get(
                                String(prereqId)
                            ) ?? `Unknown course (${prereqId})`
                    );

                return (
                    <CourseCard
                        key={course.id}
                        course={course}
                        prerequisiteNumbers={prerequisiteNumbers}
                        completedCourses={completedCourses}
                        onToggleCompleted={toggleCompleted}
                    />
                );
            })}
        </div>
    );
}

export default CourseList;