import { EntityRepository, getCustomRepository, Repository } from 'typeorm';

import Tools from '../models/Tools';

@EntityRepository(Tools)
class ToolsRepository extends Repository<Tools>{

    public async findByDate(tag: string): Promise<Tools | undefined> {
        const toolsRepository = getCustomRepository(ToolsRepository);

        const findTag = toolsRepository.findOne({
            where: { tag }
        });

        return findTag;
    }

}


export default ToolsRepository;