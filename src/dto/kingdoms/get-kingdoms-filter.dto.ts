import { IsNotEmpty, IsOptional } from 'class-validator';

export class GetKingdomsFilterDto {

    @IsOptional()
    @IsNotEmpty()
    id: number;

    @IsOptional()
    @IsNotEmpty()
    name: string;
}