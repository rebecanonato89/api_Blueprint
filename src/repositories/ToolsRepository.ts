import { EntityRepository, getCustomRepository, Repository } from 'typeorm';

import Tools from '../models/Tools';

@EntityRepository(Tools)
class ToolsRepository extends Repository<Tools>{
}


export default ToolsRepository;