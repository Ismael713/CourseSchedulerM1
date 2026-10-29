import '../assets/CourseList.css';
import useFetch from '../hooks/useFetch';
import CourseCard from './CourseCard';
import { useState } from 'react';

function CourseList() {
    const [completedCourses, setCompletedCourses] = useState([]);

    function toggleCompleted(courseId) {
        setCompletedCourses(previous => {
            // If the course is already completed, uncheck it.
            if (previous.includes(courseId)) {
                const remaining = previous.filter(id => id !== courseId);

                // Remove completed courses whose prerequisites
                // are no longer completed.
                let updated = remaining;
                let changed = true;

                while (changed) {
                    changed = false;

                    updated = updated.filter(id => {
                        const course = courses.find(
                            c => Number(c.id) === Number(id)
                        );

                        if (!course) return false;

                        const prerequisitesMet =
                            (course.prerequisites ?? []).every(
                                prereqId => updatedPrerequisiteCheck(
                                    prereqId, updated
                                )
                            );

                        if (!prerequisitesMet) {
                            changed = true;
                            return false;
                        }

                        return true;
                    });
                }

                return updated;
            }

            // Otherwise, mark the course completed.
            return [...previous, courseId];
        });
    }

    function updatedPrerequisiteCheck(prereqId, completedIds) {
        return completedIds.some(
            id => Number(id) === Number(prereqId)
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
