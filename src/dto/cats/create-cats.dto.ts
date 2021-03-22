import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCatsDto {

    id: number;

    name: string;

    private constructor(
        name: string,
    ) {
        this.name = name;
    }
}


