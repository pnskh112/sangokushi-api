import { IsNotEmpty, IsOptional } from 'class-validator';

export class GetCatsFilterDto {

    @IsOptional()
    @IsNotEmpty()
    id: number;

    @IsOptional()
    @IsNotEmpty()
    name: string;
}