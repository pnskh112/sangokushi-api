import { Entity, EntityManager, EntityRepository, QueryFailedError, Repository } from 'typeorm';
import { CreateWarloadsDto } from '../../dto/Warloads/create-Warloads.dto';
import { GetWarloadsFilterDto } from '../../dto/Warloads/get-Warloads-filter.dto';
import { Arm } from '../entity/arms.entity';
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
        } = createWarloadsDto;
        const arm = createWarloadsDto.arms;
        const warloads = await new Warloads().createWarloads(
            {
                name,
                azana,
                statue,
                hobby,
                fromTo,
            });
        const arms = await new Arm().createArms({arm});
        return warloads;
    }

    async deleteWarloads(): Promise<Warloads> {
        const warloads = new Warloads();
        return warloads;
    }
}

