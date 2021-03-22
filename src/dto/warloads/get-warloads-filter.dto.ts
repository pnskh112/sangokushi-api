import { IsNotEmpty, IsOptional } from 'class-validator';

export class GetWarloadsFilterDto {

    @IsOptional()
    @IsNotEmpty()
    id: number;

    @IsOptional()
    @IsNotEmpty()
    name: string;
}