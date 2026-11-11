function validateCourse(body) {
    const { number, title, credits, description } = body

    if (!number || !title) {
        return 'course number and title are required'
    }
    if (!credits || isNaN(parseInt(credits))) {
        return 'credits must be a whole number'
    }
    if (parseInt(credits) < 1 || parseInt(credits) > 4) {
        return 'credits must be between 1 and 4'
    }
    if (!description) {
        return 'course description is required'
    }
    return null   // null means valid
}

module.exports = validateCourse
