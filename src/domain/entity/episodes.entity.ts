import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Arm } from "./arms.entity";

@Entity()
export class Episodes extends BaseEntity {

    @PrimaryGeneratedColumn()
    /*エピソードコード*/
    id: number;

    @Column()
    warsId: number;

    @Column()
    warloadsId: number;

    @Column()
    title: string;

    @Column()
    episode: string;

    // async getEpisodes(getParams): Promise<Episodes[]> {
    //     const { id, name } = getParams;
    //     const query = Episodes.createQueryBuilder('Episodes');
    //     if (id) {
    //         query.andWhere('Episodes.id = :id', { id });
    //     }
    //     if (name) {
    //         query.andWhere('Episodes.name LIKE :name', { name: `%${name}%` });
    //     }
    //     const Episodes = await query.getMany();
    //     return Episodes;
    // }

    async createEpisodes(createParam): Promise<Episodes> {
        const {
            warsId,
            warloadsId,
            title,
            episode,
        } = createParam;
        const episodes = await Episodes.query(
            `
                INSERT INTO Episodes
                    ("warsId","warloadsId","title","episode")
                VALUES
                    ($1,$2,$3,$4)
                RETURNING * AS newEpisode;
            `,
            [
                warsId,
                warloadsId,
                title,
                episode,
            ],
        );
        return episodes[0];
    }
}