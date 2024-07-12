import fastify from 'fastify'
import cors from '@fastify/cors'
import { projectRoutes } from './routes/project.routes'

const app = fastify()

app.register(cors, {
  origin: true,
})


app.register(projectRoutes, {
  prefix: '/projects',
})


const PORT = process.env.VERCEL ? process.env.PORT : 3333

const start = async () => {
  try {
    await app.listen(PORT)
    console.log(`🚀 HTTP server running on http://localhost:${PORT}`)
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

start()
