import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Arms extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    warloadsId: number;

    @Column()
    name: string;

    @Column()
    text: string;

    async getArms(getParams): Promise<Arms[]> {
        const {id, name } = getParams;
        const query = Arms.createQueryBuilder('Arms');
        if (id) {
            query.andWhere('Arms.id = :id', { id });
        }
        if (name) {
            query.andWhere('Arms.name LIKE :name', { name: `%${name}%` });
        }        
        const arms = await query.getMany();
        return arms;
    }

    async createArms(createParam): Promise<Arms> {
        const { name,text } = createParam;
        const arms = await Arms.query(
            `
                INSERT INTO Arms
                    ("name","text")
                VALUES
                    ($1,$2)
                RETURNING "id" AS id;
            `,
            [createParam.name,createParam.text],
        );
        return arms[0];
    }
}