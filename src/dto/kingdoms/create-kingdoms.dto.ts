import { IsNotEmpty } from 'class-validator';

export class CreateKingdomsDto {

    id: number;

    @IsNotEmpty()
    name: string;

    text: string;
}