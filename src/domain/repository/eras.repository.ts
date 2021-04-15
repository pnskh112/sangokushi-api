import { CreateErasDto } from 'src/dto/warloads/create-eras.dto';
import { Entity, EntityManager, EntityRepository, QueryFailedError, Repository } from 'typeorm';
import { CreateWarloadsDto } from '../../dto/Warloads/create-Warloads.dto';
import { GetWarloadsFilterDto } from '../../dto/Warloads/get-Warloads-filter.dto';
import { Era } from '../entity/eras.entity';
import { Warloads } from '../entity/Warloads.entity';

@EntityRepository(Warloads)
export class ErasRepository extends Repository<Era> {

    async createEras(createErasDto: CreateErasDto): Promise<Era> {
        const {
            name,
            azana,
            statue,
            hobby,
            fromTo,
        } = createErasDto;
        const arm = createErasDto.arms;
        const warloads = await new Warloads().createWarloads(
            {
                name,
                azana,
                statue,
                hobby,
                fromTo,
            });
        const eras = await new Era().createArms({arm});
        return eras;
    }

    async deleteWarloads(): Promise<Warloads> {
        const warloads = new Warloads();
        return warloads;
    }
}
