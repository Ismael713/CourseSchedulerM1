import {useState} from 'react';
import useFetch from '../hooks/useFetch';
import CourseList from '../components/CourseList.jsx';
import ProgressSummary from '../components/ProgressSummary.jsx';

function HomePage()
{
    const [completedCourses, setCompletedCourses] = useState([]);

    const {data, isPending, error} = useFetch('/courses');

    const courses = Array.isArray(data) ? data : data?.courses ?? [];

    const handleToggleCompleted = (courseId) => {
        setCompletedCourses(current => {
            const id = Number(courseId);

            const isCompleted = current.some(
                completedId => Number(completedId) === id
            );

            // If already completed, deselect it and all dependents
            if (isCompleted) {
                const toRemove = new Set([id]);

                let changed = true;

                // Continues until all dependent courses are found
                while (changed) {
                    changed = false;

                    courses.forEach(course => {
                        const courseId = Number(course.id);

                        const dependsOnRemoved = (
                            course.prerequisites ?? []
                        ).some(prereqId =>
                            toRemove.has(Number(prereqId))
                        );

                        if (
                            dependsOnRemoved &&
                            !toRemove.has(courseId)
                        ) {
                            toRemove.add(courseId);
                            changed = true;
                        }
                    });
                }

                return current.filter(
                    completedId => !toRemove.has(Number(completedId))
                );
            }

            // Checks that every prerequisite is completed
            const course = courses.find(
                course => Number(course.id) === id
            );

            if (!course) return current;

            const prerequisitesMet = (
                course.prerequisites ?? []
            ).every(prereqId =>
                current.some(
                    completedId =>
                        Number(completedId) === Number(prereqId)
                )
            );

            // Prevents completion if prerequisites are missing
            if (!prerequisitesMet) {
                return current;
            }

            return [...current, id];
        });
    };

    if (isPending)
    {
        return <div>Loading courses...</div>;
    }

    if (error)
    {
        return <div>Error loading courses: {String(error)}</div>;
    }

    return (<div>
        <h1 className="mb-4">Course Scheduler</h1>

        <ProgressSummary
            courses={courses}
            completed={completedCourses}
        />

        <CourseList
            courses={courses}
            completedCourses={completedCourses}
            setCompletedCourses={handleToggleCompleted}
        />
    </div>);
}

export default HomePage;