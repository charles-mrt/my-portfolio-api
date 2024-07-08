import { FastifyInstance } from 'fastify'
import { ProjectRepository } from '../repositories/project.repository'
import { ProjectProps } from '../interfaces/project.interface'

export async function projectRoutes(fastify: FastifyInstance) {

  const projectRepository = new ProjectRepository()

  fastify.get('/', async (req, reply) => {
    try {
      const response = await projectRepository.findAllProjects()
      reply.send(response)
    } catch (error) {
      console.error('Error fetching projects:', error)
      reply.status(500).send({ error: 'Internal Server Error' })
    }
  })

  fastify.get('/public', async (req, reply) => {
    try {
      const response = await projectRepository.findAllPublicProjects()
      reply.send(response)
    } catch (error) {
      console.error('Error fetching projects:', error)
      reply.status(500).send({ error: 'Internal Server Error' })
    }
  })

  fastify.get<{ Params: { id: string } }>(`/:id`, async (req, reply) => {
    const { id } = req.params
    try {
      const response = await projectRepository.findProjectById(id)
      reply.send(response)
    } catch (error) {
      console.error('Error fetching project:', error)
      reply.status(500).send({ error: 'Internal Server Error' })
    }
  })

  fastify.patch<{ Params: { id: string }, Body: Omit<ProjectProps, 'id'> }>(`/:id`, async (req, reply) => {
    
    const { id } = req.params    
    const { is_public, image, alt, title, technologies, categories, description, url, github } = req.body

    try {
      const response = await projectRepository.updateProject({
        id,
        is_public,
        image,
        alt,
        title,
        technologies,
        categories,
        description,
        url,
        github,
      })
      reply.status(200).send(response)
    } catch (error) {
      reply.status(500).send({ error: 'Internal Server Error' })
    }
  })

  fastify.delete<{ Params: { id: string } }>(`/:id`, async (req, reply) => {
    const { id } = req.params
    try {
      const project = await projectRepository.deleteProject(id)
      reply.status(204).send(project)
    } catch (error) {
      reply.status(500).send({ error: 'Internal Server Error' })
    }
  })

  fastify.post<{ Body: ProjectProps }>('/', async (req, reply) => {
    const { is_public, image, alt, title, technologies, categories, description, url, github } = req.body
    try {
      const response = await projectRepository.createProject({
        is_public,
        image,
        alt,
        title,
        technologies,
        categories,
        description,
        url,
        github,
      })
      reply.status(201).send(response)
    } catch (error) {
      reply.status(500).send({ error: 'Internal Server Error' })
    }
  })

}
