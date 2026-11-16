import { useState, useEffect } from 'react';
import useFetch from '../hooks/useFetch';
import CourseList from '../components/CourseList.jsx';
import ProgressSummary from '../components/ProgressSummary.jsx';
import CourseFilter from '../components/CourseFilter.jsx';


function HomePage()
{
    const {
        data,
        isPending,
        error
    } = useFetch(`/api/courses`);

    const courses = Array.isArray(data) ? data : data?.courses ?? [];

    const {
        data: savedCompletions,
        isPending: completionsPending,
        error: completionsError
    } = useFetch(`/api/completions`);

    const [completedCourses, setCompletedCourses] = useState([]);

    useEffect(() => {
        if (Array.isArray(savedCompletions)) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setCompletedCourses(savedCompletions);
        }
    }, [savedCompletions]);

    const [courseFilter, setCourseFilter] = useState('all');
    const [saveNotice, setSaveNotice] = useState('');

    const handleSave = async () =>
    {
        try
        {
            setSaveNotice('');

            const response = await fetch(`/api/completions`,
                {
                    method: 'PUT',
                    headers:
                        {
                            'Content-Type': 'application/json'
                        },
                    body: JSON.stringify(completedCourses)
                });

            const result = await response.json();

            if (!response.ok)
            {
                throw new Error(result.error || 'Failed to save progress.');
            }

            setCompletedCourses(result);
            setSaveNotice('Progress saved successfully!');
        }
        catch (err)
        {
            setSaveNotice(`Error: ${err.message}`);
        }
    };

    const handleToggleCompleted = (courseId) =>
    {
        setCompletedCourses(current =>
        {
            const id = Number(courseId);

            const isCompleted = current.some(
                completedId => Number(completedId) === id
            );

            if (isCompleted)
            {
                const toRemove = new Set([id]);

                let changed = true;

                while (changed)
                {
                    changed = false;

                    courses.forEach(course =>
                    {
                        const currentCourseId = Number(course.id);

                        const dependsOnRemoved =
                            (course.prerequisites ?? []).some(
                                prereqId => toRemove.has(Number(prereqId))
                            );

                        if (dependsOnRemoved && !toRemove.has(currentCourseId))
                        {
                            toRemove.add(currentCourseId);
                            changed = true;
                        }
                    });
                }

                return current.filter(
                    completedId => !toRemove.has(Number(completedId))
                );
            }

            const course = courses.find(
                course => Number(course.id) === id
            );

            if (!course) return current;

            const prerequisitesMet = (course.prerequisites ?? []).every(
                prereqId => current.some(
                    completedId => Number(completedId) === Number(prereqId)
                )
            );

            if (!prerequisitesMet)
            {
                return current;
            }

            return [...current, id];
        });

        setSaveNotice('');
    };

    if (isPending || completionsPending)
    {
        return <div>Loading courses...</div>;
    }

    if (error)
    {
        return <div>Error loading courses: {String(error)}</div>;
    }

    if (completionsError)
    {
        return <div>Error loading completions: {String(completionsError)}</div>;
    }

    return (
        <div>
            <h1 className="course-heading">Course Scheduler</h1>

            <ProgressSummary
                courses={courses}
                completed={completedCourses}
            />

            <div className="course-controls">
                <CourseFilter
                    courseFilter={courseFilter}
                    setCourseFilter={setCourseFilter}
                />

                <div className="save-container">
                    {saveNotice && (
                        <span className="save-notice">
                            {saveNotice}
                        </span>
                    )}

                    <button
                        className="save-button"
                        onClick={handleSave}
                    >
                        Save Progress
                    </button>
                </div>
            </div>

            <CourseList
                courses={courses}
                completedCourses={completedCourses}
                setCompletedCourses={handleToggleCompleted}
                courseFilter={courseFilter}
            />
        </div>
    );
}

export default HomePage;