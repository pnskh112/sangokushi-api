import { BaseEntity, Column, Entity, PrimaryGeneratedColumn,ManyToOne } from "typeorm";
import { Warload } from 'src/domain/entity/Warloads.entity';

@Entity()
export class Arm extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @ManyToOne(type => Warload, warload => warload.arms)
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
        console.log("createParam",createParam);
        const { 
            warloadsId,
            name,
            text 
        } = createParam.arms[0];
        const arms = await Arm.query(
            `
                INSERT INTO Arm
                    ("warloadsId","name","text")
                VALUES
                    ($1,$2,$3)
                RETURNING "id" AS id;
            `,
            [
                warloadsId,
                name,
                text,
            ],
        );
        return arms[0];
    }
}