import { Entity, EntityManager, EntityRepository, QueryFailedError, Repository } from 'typeorm';
import { CreateWarloadsDto } from '../../dto/Warloads/create-Warloads.dto';
import { GetWarloadsFilterDto } from '../../dto/Warloads/get-Warloads-filter.dto';
import { Warload } from '../entity/Warloads.entity';
import { Arm } from '../entity/arms.entity';

@EntityRepository(Warload)
export class WarloadsRepository extends Repository<Warload> {

    // async getWarloads(filterDto: GetWarloadsFilterDto): Promise<Warloads[]> {
    //     const { id, name } = filterDto;
    //     const warloads = await new Warloads().getWarloads({id, name });
    //     return warloads;
    // }

    async createWarloads(
        id: number,
        createWarloadsDto: CreateWarloadsDto
    ): Promise<Warload> {
        const { 
            name,
            azana,
            statue,
            hobby,
            fromTo,
            arms,
        } = createWarloadsDto;
        const warloads = await new Warload().createWarloads(
            {
                name,
                azana,
                statue,
                hobby,
                fromTo,
                arms,
            });
            if(arms !== undefined){
                console.log("arms",arms);
                const arm = await new Arm().createArms({
                    arms,                    
                })
            }
        return warloads;
    }

    async deleteWarloads(): Promise<Warload> {
        const warload = new Warload();
        return warload;
    }
}

