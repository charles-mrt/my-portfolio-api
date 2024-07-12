"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectRepository = void 0;
const prisma_client_1 = require("../database/prisma-client");
class ProjectRepository {
    async findAllProjects() {
        try {
            const result = await prisma_client_1.prisma.project.findMany({
                orderBy: {
                    created_at: 'asc',
                },
            });
            return result;
        }
        catch (error) {
            console.error('Error fetching projects:', error);
            throw error;
        }
    }
    async findAllPublicProjects() {
        try {
            const result = await prisma_client_1.prisma.project.findMany({
                where: {
                    is_public: true
                },
                orderBy: {
                    created_at: 'asc',
                },
            });
            return result;
        }
        catch (error) {
            console.error('Error fetching projects:', error);
            throw error;
        }
    }
    async findProjectById(id) {
        try {
            const result = await prisma_client_1.prisma.project.findUnique({
                where: {
                    id,
                },
            });
            return result;
        }
        catch (error) {
            console.error('Error updating project:', error);
            throw error;
        }
    }
    async updateProject(data) {
        try {
            const result = await prisma_client_1.prisma.project.update({
                where: {
                    id: String(data.id),
                },
                data: {
                    is_public: data.is_public,
                    image: data.image,
                    alt: data.alt,
                    title: data.title,
                    technologies: { set: data.technologies },
                    categories: { set: data.categories },
                    description: data.description,
                    url: data.url,
                    github: data.github,
                },
            });
            return result;
        }
        catch (error) {
            console.error('Error updating project:', error);
            throw error;
        }
    }
    async deleteProject(id) {
        try {
            const result = await prisma_client_1.prisma.project.delete({
                where: {
                    id,
                },
            });
            return result;
        }
        catch (error) {
            console.error('Error delete project:', error);
            throw error;
        }
    }
    async createProject(data) {
        try {
            const result = await prisma_client_1.prisma.project.create({
                data: {
                    is_public: data.is_public,
                    image: data.image,
                    alt: data.alt,
                    title: data.title,
                    technologies: { set: data.technologies },
                    categories: { set: data.categories },
                    description: data.description,
                    url: data.url,
                    github: data.github,
                },
            });
            return result;
        }
        catch (error) {
            console.error('Error creating project:', error);
            throw error;
        }
    }
}
exports.ProjectRepository = ProjectRepository;
