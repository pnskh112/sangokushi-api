import { IsNotEmpty } from 'class-validator';

export class CreateCatsDto {

    id: number;
    @IsNotEmpty()
    name: string;
}