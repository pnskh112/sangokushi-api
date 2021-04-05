import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Era extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;


    @Column()
    name: string;

    @Column()
    text: string;

    // async getArms(getParams): Promise<Arm[]> {
    //     const {id, name } = getParams;
    //     const query = Arm.createQueryBuilder('Arms');
    //     if (id) {
    //         query.andWhere('Arms.id = :id', { id });
    //     }
    //     if (name) {
    //         query.andWhere('Arms.name LIKE :name', { name: `%${name}%` });
    //     }
    //     const arms = await query.getMany();
    //     return arms;
    // }

    async createArms(createParam): Promise<Era> {
        const { warloadsId,name,text } = createParam.arm[0];
        const arms = await Era.query(
            `
                INSERT INTO Eras
                    ("warloadsId","name","text")
                VALUES
                    ($1,$2,$3)
                RETURNING *;
            `,
            [warloadsId,name,text],
        );
        console.log("createArms end",arms[0]);
        return arms[0];
    }
}