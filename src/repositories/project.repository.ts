import { prisma } from '../database/prisma-client'
import { ProjectProps } from '../interfaces/project.interface'

export class ProjectRepository {

  async findAllProjects(): Promise<ProjectProps[]> {
    try {
      const result = await prisma.project.findMany({
        orderBy: {
          created_at: 'asc',
        },
      })      
      return result
      
    } catch (error) {
      console.error('Error fetching projects:', error)
      throw error
    }
  }
  

  async createProject(data: ProjectProps): Promise<ProjectProps> {
    try {
      const newProject = await prisma.project.create({
        data: {
          is_public: data.is_public,
          image: data.image,
          alt: data.alt,
          title: data.title,
          tecnologies: { set: data.tecnologies },
          categories: { set: data.categories },
          description: data.description,
          url: data.url,
          github: data.github,      
        },
      })
      return newProject
    } catch (error) {
      console.error('Error creating project:', error)
      throw error 
    }
  }
}
