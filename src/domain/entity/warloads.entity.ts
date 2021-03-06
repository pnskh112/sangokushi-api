// import { Found } from "src/dto/warloads/class/found";
import { GetWarloadsFilterDto } from "src/dto/Warloads/get-Warloads-filter.dto";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Arm } from "./arms.entity";


// export interface GetWarloads {
//     data: Warloads[];
//     found: Found;
// }

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

    async getWarloads(page: number): Promise<Warloads[]> {
        console.log("1");
        const warloads = await Warloads.query(
            `
            SELECT w."id",
                   w."name",
                   w."azana",
                   w."statue",
                   w."hobby",
                   w."fromTo"
              FROM Warloads w
              /*JOIN arm a
                ON w.id = a."warloadsId"*/
             WHERE 0=0
          ORDER BY w."id"
             LIMIT 10
            OFFSET $1
            `,
            [
                10 * (page - 1)
            ]
        );
        return warloads;
    }

    async getWarloadsCount(): Promise<string> {
        console.log("2");
        const warloadsCount = await Warloads.query(
            `
            SELECT COUNT(1)
              FROM Warloads w
              /*JOIN arm a
                ON w.id = a."warloadsId"*/
             WHERE 0=0
            `
        );
        return JSON.parse(JSON.stringify(warloadsCount))[0].count;
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