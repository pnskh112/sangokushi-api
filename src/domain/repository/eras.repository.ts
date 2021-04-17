import { CreateErasDto } from 'src/dto/warloads/create-eras.dto';
import { Entity, EntityManager, EntityRepository, QueryFailedError, Repository } from 'typeorm';
import { CreateWarloadsDto } from '../../dto/Warloads/create-Warloads.dto';
import { GetWarloadsFilterDto } from '../../dto/Warloads/get-Warloads-filter.dto';
import { Eras } from '../entity/eras.entity';
import { Warloads } from '../entity/Warloads.entity';

@EntityRepository(Warloads)
export class ErasRepository extends Repository<Eras> {

    async createEras(createErasDto: CreateErasDto): Promise<Eras> {
        const {
            kingdoms_id,
            name,
            description,
            start_year,
            end_year,
        } = createErasDto;
        const era = await new Eras().createEras(
            {
                kingdoms_id,
                name,
                description,
                start_year,
                end_year,
            });
        return era;
    }

    async deleteWarloads(): Promise<Warloads> {
        const warloads = new Warloads();
        return warloads;
    }
}
