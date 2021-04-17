import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Eras extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    kingdoms_id: number | null;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    start_year: number;

    @Column()
    end_year: number;

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

    async createEras(createParam): Promise<Eras> {
        const {
            kingdoms_id,
            name,
            description,
            start_year,
            end_year
        } = createParam;
        const eras = await Eras.query(
            `
                INSERT INTO Eras
                    ("kingdoms_id","name","description","start_year","end_year")
                VALUES
                    ($1,$2,$3,$4,$5)
                RETURNING *;
            `,
            [kingdoms_id,name,description,start_year,end_year],
        );
        return eras[0];
    }
}