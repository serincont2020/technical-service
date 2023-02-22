import express from 'express'
import morgan from 'morgan'
import userRoutes from './routes/user.routes'
import technicalRoutes from './routes/technical.routes'
import supportRoutes from './routes/support.routes'
import authRoutes from './routes/auth.routes'

const app = express()

app.use(morgan('dev'))

app.use(express.json())
app.use(userRoutes)
app.use(authRoutes)
app.use(technicalRoutes)
app.use(supportRoutes)

export default app