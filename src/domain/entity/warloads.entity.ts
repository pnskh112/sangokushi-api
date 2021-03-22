import { GetWarloadsFilterDto } from "src/dto/Warloads/get-Warloads-filter.dto";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Arms } from "./arms.entity";

@Entity()
export class Warloads extends BaseEntity {

    @PrimaryGeneratedColumn()
    /*武将コード*/
    id: number;

    @Column()
    name: string;

    @Column()
    azana: string;

    @Column()
    /*人物像*/
    statue: string;

    @Column()
    hobby: string;

    @Column()
    fromTo : string;

    @OneToMany(type => Arms, arms => Warloads.arms)
    arms: Arms[];
    static arms: any;

    async getWarloads(getParams): Promise<Warloads[]> {
        const { id, name } = getParams;
        const query = Warloads.createQueryBuilder('Warloads');
        if (id) {
            query.andWhere('Warloads.id = :id', { id });
        }
        if (name) {
            query.andWhere('Warloads.name LIKE :name', { name: `%${name}%` });
        }
        const warloads = await query.getMany();
        return warloads;
    }

    async createWarloads(createParam): Promise<Warloads> {
        const {
            name,
            azana,
            statue,
            hobby,
            fromTo
        } = createParam;
        const warloads = await Warloads.query(
            `
                INSERT INTO Warloads
                    ("name","text")
                VALUES
                    ($1,$2)
                RETURNING "id" AS id;
            `,
            [
                createParam.name,
                createParam.azana,
                createParam.statue,
                createParam.hobby,
                createParam.fromTo,
            ],
        );
        return Warloads[0];
    }
}