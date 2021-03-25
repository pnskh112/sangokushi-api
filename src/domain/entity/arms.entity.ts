import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Arm extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @ManyToOne(type => Arm, arms => arms.warloadsId)
    warloadsId: number;

    @Column()
    name: string;

    @Column()
    text: string;

    async getArms(getParams): Promise<Arm[]> {
        const {id, name } = getParams;
        const query = Arm.createQueryBuilder('Arms');
        if (id) {
            query.andWhere('Arms.id = :id', { id });
        }
        if (name) {
            query.andWhere('Arms.name LIKE :name', { name: `%${name}%` });
        }
        const arms = await query.getMany();
        return arms;
    }

    async createArms(createParam): Promise<Arm> {
        const { warloadsId,name,text } = createParam.arm[0];
        const arms = await Arm.query(
            `
                INSERT INTO Arm
                    ("warloadsId","name","text")
                VALUES
                    ($1,$2,$3)
                RETURNING "id","warloadsId","name","text" AS newRecord;
            `,
            [warloadsId,name,text],
        );
        console.log("createArms end",arms[0]);
        return arms[0];
    }
}