import { Entity, EntityManager, EntityRepository, QueryFailedError, Repository } from 'typeorm';
import { CreateCatsDto } from '../../cats/dto/create-cats.dto';
import { Cat } from '../entity/cats.entity';
import { GetCatsFilterDto } from '../../cats/dto/get-cats-filter.dto';

@EntityRepository(Cat)
export class CatsRepository extends Repository<Cat> {

    async getCats(filterDto: GetCatsFilterDto): Promise<Cat[]> {
        const {id, name } = filterDto;
        const query = this.createQueryBuilder('cat');

        if (id) {
            query.andWhere('cat.id = :id', { id });
        }

        if (name) {
            query.andWhere('cat.name LIKE :name', { name: `%${name}%` });
        }

        const cats = await query.getMany();
        return cats;
    }

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

