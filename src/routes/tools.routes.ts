import { request, response, Router } from 'express';
import { getCustomRepository } from 'typeorm';
import ToolsRepository from '../repositories/ToolsRepository';

import createToolsService from '../services/CreateToolsService';

const toolsRouter = Router();

toolsRouter.get('/', async (request, response) => {

    try {
        const toolsRepository = getCustomRepository(ToolsRepository);
        const { tag }: any = request.query;

        if (tag != undefined) {
            console.log(tag);


            const tools = await toolsRepository.createQueryBuilder("tools")
                .where("tools.tags like :tag", { tag: `%${tag}%` })
                .getMany();

            return response.json(tools);
        }


        const tools = await toolsRepository.find();
        return response.json(tools);
    }
    catch (err) {
        return response.status(400).json({ error: err.message });
    }
});

toolsRouter.post('/', async (request, response) => {
    try {
        const { title, link, description, tags } = request.body;

        const createTools = new createToolsService();

        const tools = await createTools.execute({
            title, link, description, tags
        });

        return response.status(201).json(tools);
    }
    catch (err) {
        return response.status(400).json({ error: err.message });
    }
});

toolsRouter.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;

        const toolsRepository = getCustomRepository(ToolsRepository);

        const exist = await toolsRepository.findOne(id);

        console.log(exist);

        if (exist == undefined) {
            return response.status(200).json({ error: "id não existe." });
        }

        console.log(exist);
        await toolsRepository
            .createQueryBuilder()
            .delete()
            .from("tools")
            .where("id = :id", { id: id })
            .execute();

        return response.status(204).json({ error: "deletado com sucesso." });
    }
    catch (err) {
        return response.status(400).json({ error: err.message });
    }
});


export default toolsRouter;