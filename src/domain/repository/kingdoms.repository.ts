import { Entity, EntityManager, EntityRepository, QueryFailedError, Repository } from 'typeorm';
import { CreateKingdomsDto } from '../../dto/Kingdoms/create-Kingdoms.dto';
import { GetKingdomsFilterDto } from '../../dto/Kingdoms/get-Kingdoms-filter.dto';
import { Kingdoms } from '../entity/Kingdoms.entity';

@EntityRepository(Kingdoms)
export class KingdomsRepository extends Repository<Kingdoms> {

    async getKingdoms(filterDto: GetKingdomsFilterDto): Promise<Kingdoms[]> {
        const { id, name } = filterDto;
        const kingdoms = await new Kingdoms().getKingdoms({id, name });
        return kingdoms;
    }

    async createKingdoms(createKingdomsDto: CreateKingdomsDto): Promise<Kingdoms> {
        const { name,text } = createKingdomsDto;
        const kingdom = await new Kingdoms().createKingdoms({name,text});
        return kingdom;
    }

    async deleteKingdoms(): Promise<Kingdoms> {
        const kingdom = new Kingdoms();
        return kingdom;
    }
}

