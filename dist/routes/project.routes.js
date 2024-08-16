"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectRoutes = projectRoutes;
const project_repository_1 = require("../repositories/project.repository");
async function projectRoutes(fastify) {
    const projectRepository = new project_repository_1.ProjectRepository();
    fastify.get('/projects', async (req, reply) => {
        try {
            const response = await projectRepository.findAllProjects();
            reply.send(response);
        }
        catch (error) {
            console.error('Error fetching projects:', error);
            reply.status(500).send({ error: 'Internal Server Error' });
        }
    });
    fastify.get('/projects/public', async (req, reply) => {
        try {
            const response = await projectRepository.findAllPublicProjects();
            reply.send(response);
        }
        catch (error) {
            console.error('Error fetching projects:', error);
            reply.status(500).send({ error: 'Internal Server Error' });
        }
    });
    fastify.get(`projects/:id`, async (req, reply) => {
        const { id } = req.params;
        try {
            const response = await projectRepository.findProjectById(id);
            reply.send(response);
        }
        catch (error) {
            console.error('Error fetching project:', error);
            reply.status(500).send({ error: 'Internal Server Error' });
        }
    });
    fastify.patch(`projects/:id`, async (req, reply) => {
        const { id } = req.params;
        const { is_public, image, alt, title, technologies, categories, description, url, github } = req.body;
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
            });
            reply.status(200).send(response);
        }
        catch (error) {
            reply.status(500).send({ error: 'Internal Server Error' });
        }
    });
    fastify.delete(`projects/:id`, async (req, reply) => {
        const { id } = req.params;
        try {
            const project = await projectRepository.deleteProject(id);
            reply.status(204).send(project);
        }
        catch (error) {
            reply.status(500).send({ error: 'Internal Server Error' });
        }
    });
    fastify.post('projects/', async (req, reply) => {
        const { is_public, image, alt, title, technologies, categories, description, url, github } = req.body;
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
            });
            reply.status(201).send(response);
        }
        catch (error) {
            reply.status(500).send({ error: 'Internal Server Error' });
        }
    });
}
