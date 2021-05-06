import { request, response, Router } from 'express';

import createToolsService from '../services/CreateToolsService';

const toolsRouter = Router();

toolsRouter.get('/', (request, response) => {
    return response.json('requisição realizada com sucesso');
});


toolsRouter.post('/', async (request, response) => {
    try {
        const { title, link, description, tags } = request.body;

        const createTools = new createToolsService();

        const tools = await createTools.execute({
            title, link, description, tags
        });

        return response.json(tools);
    }
    catch (err) {
        return response.status(400).json({ error: err.message });
    }
});


export default toolsRouter;