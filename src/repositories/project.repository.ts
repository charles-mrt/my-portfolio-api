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
  async findAllPublicProjects(): Promise<ProjectProps[]> {
    try {
      const result = await prisma.project.findMany({
        where: {
          is_public: true
        },
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

  async findProjectById(id: string): Promise<ProjectProps | null> {

    try {
      const result = await prisma.project.findUnique({
        where: {
          id,
        },
      })
      return result
    } catch (error) {
      console.error('Error updating project:', error)
      throw error
    }
  }

  async updateProject(data: ProjectProps): Promise<ProjectProps> {

    try {
      const result = await prisma.project.update({
        where: {
          id: String(data.id),
        },
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
      return result
    } catch (error) {
      console.error('Error updating project:', error)
      throw error
    }
  }

  async deleteProject(id: string): Promise<ProjectProps> {
    try {
      const result = await prisma.project.delete({
        where: {
          id,
        },
      })
      return result
    } catch (error) {
      console.error('Error delete project:', error)
      throw error
    }
  }

  async createProject(data: ProjectProps): Promise<ProjectProps> {
    try {
      const result = await prisma.project.create({
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
      return result
    } catch (error) {
      console.error('Error creating project:', error)
      throw error
    }
  }
}
