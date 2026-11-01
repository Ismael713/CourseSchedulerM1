function CourseCard({course, prerequisiteNumbers, completedCourses = [], onToggleCompleted}) {
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
        <div className= "col">
        <div className= {`card ${status}`}>
            <div className="card-header">
                <h6>{course.number}</h6>

                <span className={`status-badge ${status}`}>
                    {status === 'completed' ? (
                        <>✓ COMPLETED</>
                    ) : status === 'available' ? (
                        <>AVAILABLE</>
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
                        disabled={!prerequisitesMet && !completed}
                        onChange={() => onToggleCompleted(course.id)}
                    />
                    {' '}
                    {status === 'locked' ?
                    'Complete Prerequisites First'
                    : 'Completed'}
                </label>
            </div>
        </div>
        </div>
    );
}

export default CourseCard;
