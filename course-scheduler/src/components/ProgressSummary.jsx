import '../assets/ProgressSummary.css'

function ProgressSummary({ courses, completed }) {
    const completedCount = courses.filter((course) =>
        completed.includes(course.id)
    ).length;

    const availableCount = courses.filter(
        (course) =>
            !completed.some(id => Number(id) === Number(course.id)) &&
            (course.prerequisites ?? []).every((prereqId) =>
                completed.some(id => Number(id) === Number(prereqId))
            )
    ).length;

    const lockedCount = courses.filter(
        (course) =>
            !completed.some(id => Number(id) === Number(course.id)) &&
            !(course.prerequisites ?? []).every((prereqId) =>
                completed.some(id => Number(id) === Number(prereqId))
            )
    ).length;

    const percentage = courses.length
        ? Math.round((completedCount / courses.length) * 100)
        : 0;

    return (
        <section className="progress-summary">
                <div className="progress-stats">

                    <div className="progress-stat">
                        <strong className="count-green">{completedCount}</strong>
                        <span>of 10 courses completed</span>
                    </div>

                    <div className="progress-stat">
                        <strong className="count-blue">{availableCount}</strong>
                        <span>available</span>
                    </div>

                    <div className="progress-stat">
                        <strong className="count-gray">{lockedCount}</strong>
                        <span>locked</span>
                    </div>

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
                        style={{width: `${percentage}%`}}
                    >
                        {percentage}%
                    </div>
                </div>
        </section>
);
}

export default ProgressSummary;