import "../assets/CourseFilter.css";

function CourseFilter({ courseFilter, setCourseFilter }) {
    return (
        <div className="course-filter">
            <button
                className={courseFilter === 'all' ? 'active' : ''}
                onClick={() => setCourseFilter('all')}
            >
                All Courses
            </button>

            <button
                className={courseFilter === 'completed' ? 'active' : ''}
                onClick={() => setCourseFilter('completed')}
            >
                Completed Only
            </button>

            <button
                className={courseFilter === 'remaining' ? 'active' : ''}
                onClick={() => setCourseFilter('remaining')}
            >
                Remaining
            </button>
        </div>
    );
}

export default CourseFilter;