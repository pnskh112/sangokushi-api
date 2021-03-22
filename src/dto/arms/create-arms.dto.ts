import { IsNotEmpty } from 'class-validator';

export class CreateArmsDto {

    warloadsId: number;

    name: string;

    text: string;
}