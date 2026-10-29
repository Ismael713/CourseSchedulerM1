import {useState} from 'react';
import useFetch from '../hooks/useFetch';
import CourseList from '../components/CourseList.jsx';
import ProgressSummary from '../components/ProgressSummary.jsx';

function HomePage()
{
    const [completedCourses, setCompletedCourses] = useState([]);

    const {data, isPending, error} = useFetch('/courses');

    const courses = Array.isArray(data) ? data : data?.courses ?? [];

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
                setCompletedCourses={setCompletedCourses}
            />
        </div>);
}

export default HomePage;