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

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('🚀 HTTP server runing on http://localhost:3333')
  })