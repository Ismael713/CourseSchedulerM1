import {useState} from 'react';
import useFetch from '../hooks/useFetch';
import CourseList from '../components/CourseList.jsx';
import ProgressSummary from '../components/ProgressSummary.jsx';
import CourseFilter from '../components/CourseFilter.jsx';

function HomePage()
{
    const [completedCourses, setCompletedCourses] = useState(() => {
        const savedCourses = localStorage.getItem('completedCourses');

        return savedCourses ? JSON.parse(savedCourses) : [];
    });
    const {data, isPending, error} = useFetch('/courses');
    const courses = Array.isArray(data) ? data : data?.courses ?? [];
    const [courseFilter, setCourseFilter] = useState('all');
    const [saveNotice, setSaveNotice] = useState(false);

    const handleSave = () => {
        localStorage.setItem(
            'completedCourses',
            JSON.stringify(completedCourses)
        );

        setSaveNotice(true);
    };

    const handleToggleCompleted = (courseId) =>
    {
        setCompletedCourses(current =>
        {
            const id = Number(courseId);

            const isCompleted = current.some(completedId => Number(completedId) === id);

            // If already completed, deselect it and all dependents
            if (isCompleted)
            {
                const toRemove = new Set([id]);

                let changed = true;

                // Continues until all dependent courses are found
                while (changed)
                {
                    changed = false;

                    courses.forEach(course =>
                    {
                        const courseId = Number(course.id);

                        const dependsOnRemoved = (course.prerequisites ?? []).some(prereqId => toRemove.has(Number(prereqId)));

                        if (dependsOnRemoved && !toRemove.has(courseId))
                        {
                            toRemove.add(courseId);
                            changed = true;
                        }
                    });
                }

                return current.filter(completedId => !toRemove.has(Number(completedId)));
            }

            // Checks that every prerequisite is completed
            const course = courses.find(course => Number(course.id) === id);

            if (!course) return current;

            const prerequisitesMet = (course.prerequisites ?? []).every(prereqId => current.some(completedId => Number(completedId) === Number(prereqId)));

            // Prevents completion if prerequisites are missing
            if (!prerequisitesMet)
            {
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
                Progress saved!
            </span>)}

                <button
                    className="save-button"
                    onClick={handleSave}
                >
                    <span>✓</span> Save Progress
                </button>
            </div>
        </div>

        <CourseList
            courses={courses}
            completedCourses={completedCourses}
            setCompletedCourses={handleToggleCompleted}
            courseFilter={courseFilter}
        />
    </div>);
}

export default HomePage;