function validateCourse(body) {
    const { number, title, credits, description} = body

    if (!number || !title || !credits) {
        return 'course number, title, and credits are required'
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

export default validateCourse
