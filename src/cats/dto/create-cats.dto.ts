import { IsNotEmpty } from 'class-validator';

export class CreateCatsDto {
    @IsNotEmpty()
    name: string;
}