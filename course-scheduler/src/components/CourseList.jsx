import '../assets/CourseList.css';
import useFetch from '../hooks/useFetch';
import CourseCard from './CourseCard';
import { useState } from 'react';

function CourseList() {
    const [completedCourses, setCompletedCourses] = useState([]);

    function toggleCompleted(courseId) {
        setCompletedCourses(previous =>
            previous.includes(courseId)
                ? previous.filter(id => id !== courseId)
                : [...previous, courseId]
        );
    }
    const {
        data,
        isPending,
        error
    } = useFetch('/courses');

    if (isPending) {
        return <div>Loading courses...</div>;
    }

    if (error) {
        return <div>Error loading courses: {error}</div>;
    }

    // Support either an array or an object containing courses.
    const courses = Array.isArray(data)
        ? data
        : data?.courses ?? [];

    if (courses.length === 0) {
        return <div>No courses found.</div>;
    }

    // Map each course ID to its course number.
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
