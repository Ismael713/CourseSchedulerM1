
function CourseCard({
                        course,
                        prerequisiteNumbers,
                        completedCourses = [],
                        onToggleCompleted
                    }) {
    const completed = completedCourses.some(
        id => Number(id) === Number(course.id)
    );

    const prerequisitesMet = (course.prerequisites ?? []).every(
        prereqId => completedCourses.some(
            id => Number(id) === Number(prereqId)
        )
    );
    const status = completed
        ? 'completed'
        : prerequisitesMet
            ? 'available'
            : 'locked';

    return (
        <div className={`card ${status}`}>
            <div className="card-header">
                <h6>{course.number}</h6>

                <span className={`status-badge ${status}`}>
                    {status === 'completed' ? (
                        <>✓ COMPLETED</>
                    ) : status === 'available' ? (
                        <>🔓 UNLOCKED</>
                    ) : (
                        <>🔒 LOCKED</>
                    )}
                </span>
            </div>

            <div className="card-body">
                <h5 className="card-title">{course.title}</h5>

                <p className="card-credits">
                    {course.credits} credits
                </p>

                <p className="card-description">
                    {course.description}
                </p>

                <p className="card-text mb-0">
                    <strong>Prerequisites:</strong>{' '}
                    {prerequisiteNumbers.length > 0
                        ? prerequisiteNumbers.join(', ')
                        : 'None'}
                </p>
            </div>

            <div className="card-footer">
                <label>
                    <input
                        type="checkbox"
                        checked={completed}
                        onChange={() => onToggleCompleted(course.id)}
                    />{' '}
                    Completed
                </label>
            </div>
        </div>
    );
}

export default CourseCard;
