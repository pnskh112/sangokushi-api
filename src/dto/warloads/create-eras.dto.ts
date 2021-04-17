import { IsNotEmpty } from 'class-validator';
import { CreateArmsDto } from '../arms/create-arms.dto';

export class CreateErasDto {

    id: number;

    kingdoms_id: number | null;

    name: string;

    description: string;

    start_year: number;

    end_year: number;

}