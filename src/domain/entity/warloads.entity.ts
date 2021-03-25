import { GetWarloadsFilterDto } from "src/dto/Warloads/get-Warloads-filter.dto";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Arm } from "./arms.entity";

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

    @OneToMany(type => Arm, arm => arm.warloadsId)
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
                    ("name","azana","statue","hobby","fromTo")
                VALUES
                    ($1,$2,$3,$4,$5)
                RETURNING "id","name","azana","statue","hobby","fromTo" AS newRecord;
            `,
            [
                name,
                azana,
                statue,
                hobby,
                fromTo,
            ],
        );
        return warloads[0];
    }
}