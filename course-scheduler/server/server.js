require('dotenv').config()

const express = require('express')
const cors = require('cors')
const coursesRouter = require('./routes/courses')

const app = express()

app.use(cors({origin:process.env.CLIENT_ORIGIN}))
app.use(express.json())

app.use((req, res, next) => { console.log(req.method, req.url); next() })

if (process.env.LOG_REQUESTS === 'true') {
    app.use((req, res, next) => { console.log(req.method, req.url); next() })
}

app.use('/api', coursesRouter)

app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Books API running on http://localhost:${PORT}`)
})