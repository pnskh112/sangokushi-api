import { GetWarloadsFilterDto } from "src/dto/Warloads/get-Warloads-filter.dto";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Arm } from "./arms.entity";

@Entity()
export class Warload extends BaseEntity {

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

    @OneToMany(type => Arm, arms => arms.warloadsId)
    arms: Arm[];

    // async getWarloads(getParams): Promise<Warloads[]> {
    //     const { id, name } = getParams;
    //     const query = Warloads.createQueryBuilder('Warloads');
    //     if (id) {
    //         query.andWhere('Warloads.id = :id', { id });
    //     }
    //     if (name) {
    //         query.andWhere('Warloads.name LIKE :name', { name: `%${name}%` });
    //     }
    //     const warloads = await query.getMany();
    //     return warloads;
    // }

    async createWarloads(createParam): Promise<Warload> {
        const {
            name,
            azana,
            statue,
            hobby,
            fromTo
        } = createParam;
        console.log("warloads.entity.ts");
        const warloads = await Warload.query(
            `
                INSERT INTO warloads
                    ("name","azana","statue","hobby","fromTo")
                VALUES
                    ($1,$2,$3,$4,$5)
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
        console.log("warloads.entity.ts end");
        return warloads[0];
    }
}