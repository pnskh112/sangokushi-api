import { Entity, EntityManager, EntityRepository, QueryFailedError, Repository } from 'typeorm';
import { CreateCatsDto } from '../../cats/dto/create-cats.dto';
import { Cat } from '../entity/cats.entity';
import { GetCatsFilterDto } from '../../cats/dto/get-cats-filter.dto';

@EntityRepository(Cat)
export class CatsRepository extends Repository<Cat> {

    async getCats(filterDto: GetCatsFilterDto): Promise<Cat[]> {
        const { id, name } = filterDto;
        const cats = await new Cat().getCats({id, name });
        return cats;
    }

    async createCats(createCatsDto: CreateCatsDto): Promise<Cat> {
        const { name } = createCatsDto;
        const cat = await new Cat().createCats({name});
        return cat;
    }

    async deleteCats(): Promise<Cat> {
        const cat = new Cat();
        return cat;
    }
}

