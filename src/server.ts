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


const start = async () => {
  try {
    await app.listen() 
    console.log('🚀 HTTP server running')
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

start()
