import { Column, Entity, EntityManager, PrimaryColumn } from "typeorm";
import { InternalServerErrorException } from "../exception/internalServerError.exception";

interface IEntity {
    id: number;
    name?: string;
}

@Entity()
export class Cat implements IEntity  {

    @PrimaryColumn()
    id: number = 1;

    @Column()
    name?: string | undefined;

    // constructor(params: {
    //     id: number;
    //     name?: string | undefined;
    // }) {
    //     this.id = params.id;
    //     this.name = params.name;
    // }
}

interface CreateParams {
    id: number;
    name?: string;
}

interface CreateResult {
    id: number;
}

export class CatsDao {
    constructor(private readonly manager: EntityManager) {}

    create = async (params: CreateParams): Promise<CreateResult> => {
        const result: unknown = await this.manager.query(
            `
INSERT INTO "CAT"
("ID", "NAME")
VALUES
($1, $2)
RETURNING "ID" AS id;
            `
            ,[params.id, params.name])
        return CatsDao.buildPostResult(result);
    }

    private static buildPostResult(array: unknown): CreateResult {
        if (!Array.isArray(array))
            throw new InternalServerErrorException(
                `fetched data type is not a array`,
            );
        const object: CreateResult = array[0];
        if (typeof object !== 'object' || typeof object.id !== 'number')
            throw new InternalServerErrorException(
                `fetched data type is invalid`,
            );
        return {
            id: object.id,
        };
    }
};

