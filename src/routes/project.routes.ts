import { FastifyInstance } from 'fastify'
import { ProjectRepository } from '../repositories/project.repository'
import { ProjectProps } from '../interfaces/project.interface'

export async function projectRoutes(fastify: FastifyInstance) {

  const projectRepository = new ProjectRepository()

  fastify.get('/', async (req, reply) => {
    try {
      const projects = await projectRepository.findAllProjects()
      reply.send(projects)
    } catch (error) {
      console.error('Error fetching projects:', error)
      reply.status(500).send({ error: 'Internal Server Error' })
    }
  })

  fastify.post<{ Body: ProjectProps }>('/', async (req, reply) => {
    const { is_public, image, alt, title, tecnologies, categories, description, url, github } = req.body
    try {
      const newProject = await projectRepository.createProject({
        is_public,
        image,
        alt,
        title,
        tecnologies,
        categories,
        description,
        url,
        github,
      })
      reply.status(201).send(newProject)
    } catch (error) {      
      reply.status(500).send({ error: 'Internal Server Error' })
    }
  })


}
