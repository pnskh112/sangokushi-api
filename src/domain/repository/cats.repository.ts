import { Entity, EntityManager, EntityRepository, QueryFailedError, Repository } from 'typeorm';
import { CreateCatsDto } from '../../cats/dto/create-cats.dto';
import { CatsDao } from '../entity/cats.entity';
import { GetCatsFilterDto } from '../../cats/dto/get-cats-filter.dto';
import { AlreadyExistsException } from '../exception/alreadyExists.exception';
import { Cat } from '../cat.domain';

@EntityRepository(Cat)
export class CatsRepository {
    constructor(private readonly manager: EntityManager) {}

    // async getCats(filterDto: GetCatsFilterDto): Promise<Cat[]> {
    //     const {id, name } = filterDto;
    //     // const query = this.createQueryBuilder('cat');

    //     // if (id) {
    //     //     query.andWhere('cat.id = :id', { id });
    //     // }

    //     // if (name) {
    //     //     query.andWhere('cat.name LIKE :name', { name: `%${name}%` });
    //     // }

    //     const cats = await query.getMany();
    //     return cats;
    // }

    async createCats(cat: Cat): Promise<{id: number}> {
        const createdCats = await new CatsDao(this.manager)
            .create({
                id: cat.id,
                name: cat.name,
            })
            .catch(e => {
                if (
                    e instanceof QueryFailedError &&
                    e.message === 'ERROR!!'
                )
                throw new AlreadyExistsException();
                throw e;
            })
        return {id: createdCats.id };
    };

    // async deleteCats(): Promise<Cat> {
    //     const cat = new Cat();
    //     return cat;
    // }
}

