import { Entity, EntityManager, EntityRepository, QueryFailedError, Repository } from 'typeorm';
import { CreateCatsDto } from '../cats/dto/create-cats.dto';
import { Cat } from './dao/cats.entity';

@EntityRepository(Cat)
export class CatsRepository extends Repository<Cat> {
    async createCats(createCatsDto: CreateCatsDto): Promise<Cat> {
        const { name } = createCatsDto;
        const cat = new Cat();
        cat.name = name;
        await cat.save();
        return cat;
    }

    async deleteCats(): Promise<Cat> {
        const cat = new Cat();
        return cat;
    }
}

