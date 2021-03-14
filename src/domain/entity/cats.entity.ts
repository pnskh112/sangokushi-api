import { GetCatsFilterDto } from "src/cats/dto/get-cats-filter.dto";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Cat extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    async getCats(getParams): Promise<Cat[]> {
        const {id, name } = getParams;
        const query = Cat.createQueryBuilder('cat');
        if (id) {
            query.andWhere('cat.id = :id', { id });
        }
        if (name) {
            query.andWhere('cat.name LIKE :name', { name: `%${name}%` });
        }        
        const cats = await query.getMany();
        return cats;
    }

    async createCats(createParam): Promise<Cat> {
        const { name } = createParam;
        const cat = await Cat.query(
            `
                INSERT INTO CAT
                    ("name")
                VALUES
                    ($1)
                RETURNING "id" AS id;
            `,
            [createParam.name],
        );
        return cat[0];
    }
}