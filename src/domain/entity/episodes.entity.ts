import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Episodes extends BaseEntity {

    @PrimaryGeneratedColumn()
    /*エピソードコード*/
    id: number;

    @Column()
    warsId: number;

    @Column({nullable : true})
    warloadsId: number;

    @Column({nullable : true})
    title: string;

    @Column({nullable : true})
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
            // `
            //     INSERT INTO episodes
            //         ("warsId","warloadsId","title","episode")
            //     VALUES
            //         ($1,$2,$3,$4)
            //     RETURNING warsId","warloadsId","title","episode" AS newEpisode;
            // `,
            // [
                
            //     warsId,
            //     warloadsId,
            //     title,
            //     episode,
            // ],
        `
            INSERT INTO episodes
                ("warsId","warloadsId","title","episode")
            VALUES
                ($1,$2,$3,$4)
            RETURNING "warsId" AS newEpisode;
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