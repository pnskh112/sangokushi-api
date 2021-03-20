import { GetKingdomsFilterDto } from "src/dto/Kingdoms/get-Kingdoms-filter.dto";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Kingdoms extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    text: string;

    async getKingdoms(getParams): Promise<Kingdoms[]> {
        const {id, name } = getParams;
        const query = Kingdoms.createQueryBuilder('Kingdoms');
        if (id) {
            query.andWhere('Kingdoms.id = :id', { id });
        }
        if (name) {
            query.andWhere('Kingdoms.name LIKE :name', { name: `%${name}%` });
        }        
        const kingdoms = await query.getMany();
        return kingdoms;
    }

    async createKingdoms(createParam): Promise<Kingdoms> {
        const { name,text } = createParam;
        const kingdoms = await Kingdoms.query(
            `
                INSERT INTO Kingdoms
                    ("name","text")
                VALUES
                    ($1,$2)
                RETURNING "id" AS id;
            `,
            [createParam.name,createParam.text],
        );
        return kingdoms[0];
    }
}