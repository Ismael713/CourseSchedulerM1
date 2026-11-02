import "../assets/CourseFilter.css";
function CourseFilter({ courseFilter, setCourseFilter }) {
    return (
        <div className="course-filter mb-3">
            <label htmlFor="courseFilter" className="form-label">
                Filter Courses:
            </label>

            <select
                id="courseFilter"
                className="form-select"
                value={courseFilter}
                onChange={(e) => setCourseFilter(e.target.value)}
            >
                <option value="all">All Courses</option>
                <option value="completed">Completed Only</option>
                <option value="remaining">Remaining</option>
            </select>
        </div>
    );
}

export default CourseFilter;