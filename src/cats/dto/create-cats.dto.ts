import { IsNotEmpty } from 'class-validator';

export class CreateCatsDto {

    @IsNotEmpty()
    id: number;

    name: string;
}