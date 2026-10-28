function ProgressSummary({ courses, completed }) {
    const completedCount = courses.filter((course) =>
        completed.includes(course.id)
    ).length;

    const availableCount = courses.filter(
        (course) =>
            !completed.includes(course.id) &&
            course.prerequisites.every((prereqId) =>
                completed.includes(prereqId)
            )
    ).length;

    const lockedCount = courses.filter(
        (course) =>
            !completed.includes(course.id) &&
            !course.prerequisites.every((prereqId) =>
                completed.includes(prereqId)
            )
    ).length;

    const percentage = courses.length
        ? Math.round((completedCount / courses.length) * 100)
        : 0;

    return (
        <section className="progress-summary">
            <div className="progress-stats">
        <span>
          <strong className="count-green">
            {completedCount}
          </strong>{" "}
            of {courses.length} courses completed
        </span>

                <span>
          <strong className="count-blue">
            {availableCount}
          </strong>{" "}
                    available
        </span>

                <span>
          <strong className="count-gray">
            {lockedCount}
          </strong>{" "}
                    locked
        </span>
            </div>

            <div
                className="progress-track"
                role="progressbar"
                aria-label="Course completion"
                aria-valuenow={percentage}
                aria-valuemin={0}
                aria-valuemax={100}
            >
                <div
                    className="progress-fill"
                    style={{ width: `${percentage}%` }}
                >
                    {percentage}%
                </div>
            </div>
        </section>
    );
}

export default ProgressSummary;