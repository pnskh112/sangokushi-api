import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Cat } from "src/domain/entity/cats.entity";

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'sangokushi',
    entities: [Cat],
    synchronize: true,
}
