import { IsNotEmpty } from 'class-validator';
import { CreateArmsDto } from '../arms/create-arms.dto';

export class CreateWarloadsDto {

    id: number;

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    azana: string;

    /*人物像*/
    statue: string;

    
    hobby: string;

    
    fromTo : string;


    arms: any[];

}