import { Entity, EntityManager, EntityRepository, QueryFailedError, Repository } from 'typeorm';
import { CreateEpisodesDto } from '../../dto/Episodes/create-Episodes.dto';
import { Arm } from '../entity/arms.entity';
import { Episodes } from '../entity/Episodes.entity';

@EntityRepository(Episodes)
export class EpisodesRepository extends Repository<Episodes> {

    // async getEpisodes(filterDto: GetEpisodesFilterDto): Promise<Episodes[]> {
    //     const { id, name } = filterDto;
    //     const Episodes = await new Episodes().getEpisodes({id, name });
    //     return Episodes;
    // }

    async createEpisodes(createEpisodesDto: CreateEpisodesDto): Promise<Episodes> {
        const {
            warsId,
            warloadsId,
            title,
            episode,
        } = createEpisodesDto;
        const episodes = await new Episodes().createEpisodes(
            {
                warsId,
                warloadsId,
                title,
                episode,
            });
        return episodes;
    }

}

