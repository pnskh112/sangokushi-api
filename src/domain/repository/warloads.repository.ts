import { Entity, EntityManager, EntityRepository, QueryFailedError, Repository } from 'typeorm';
import { CreateWarloadsDto } from '../../dto/Warloads/create-Warloads.dto';
import { GetWarloadsFilterDto } from '../../dto/Warloads/get-Warloads-filter.dto';
import { Warloads } from '../entity/Warloads.entity';

@EntityRepository(Warloads)
export class WarloadsRepository extends Repository<Warloads> {

    // async getWarloads(filterDto: GetWarloadsFilterDto): Promise<Warloads[]> {
    //     const { id, name } = filterDto;
    //     const warloads = await new Warloads().getWarloads({id, name });
    //     return warloads;
    // }

    async createWarloads(createWarloadsDto: CreateWarloadsDto): Promise<Warloads> {
        const { 
            name,
            azana,
            statue,
            hobby,
            fromTo,
            arms,
        } = createWarloadsDto;
        const warloads = await new Warloads().createWarloads(
            {
                name,
                azana,
                statue,
                hobby,
                fromTo,
                arms,
            });
        return warloads;
    }

    async deleteWarloads(): Promise<Warloads> {
        const warloads = new Warloads();
        return warloads;
    }
}

