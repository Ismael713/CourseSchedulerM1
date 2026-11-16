
/* global require, module */

const express = require('express');
const router = express.Router();
const pool = require('../util/database');
const { replaceCompletions } = require('../util/courseData');

const USER_ID = 1; // M3: replaced by the logged-in user's id

// GET all completed course IDs for the current user
router.get('/completions', async (req, res) => {
    try {
        const [rows] = await pool.query(
            'SELECT course_id FROM completions WHERE user_id = ?',
            [USER_ID]
        );

        res.json(rows.map(row => Number(row.course_id)));
    } catch (err) {
        console.error('COMPLETIONS ERROR:', err);
        res.status(500).json({ error: err.message });
    }
});

// PUT: replace the user's completed courses
router.put('/completions', async (req, res) => {
    try {
        const courseIds = req.body;

        if (!Array.isArray(courseIds)) {
            return res.status(400).json({
                error: 'Request body must be an array of course IDs'
            });
        }

        // Get all courses, including their prerequisites
        const { getCoursesWithPrereqs } = require('../util/courseData');
        const courses = await getCoursesWithPrereqs(pool);

        // Validate that every course exists and its prerequisites are completed
        const isValidCompletionSet = (courses, completed) => {
            return completed.every(id => {
                const course = courses.find(c => Number(c.id) === Number(id));

                return course &&
                    (course.prerequisites ?? []).every(prereq =>
                        completed.some(completedId =>
                            Number(completedId) === Number(prereq)
                        )
                    );
            });
        };

        if (!isValidCompletionSet(courses, courseIds)) {
            return res.status(400).json({
                error: 'Cannot save completions because one or more prerequisites are missing or a course ID is invalid.'
            });
        }

        const normalizedIds = courseIds.map(Number);

        await replaceCompletions(pool, USER_ID, normalizedIds);

        res.status(200).json(normalizedIds);
    } catch (err) {
        console.error('SAVE COMPLETIONS ERROR:', err);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
