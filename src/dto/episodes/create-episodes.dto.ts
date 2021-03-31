import { IsNotEmpty } from 'class-validator';

export class CreateEpisodesDto {

    id: number;

    warsId: number;

    warloadsId: number;

    /*エピソードタイトル*/
    title: string;

    /*エピソード*/
    episode: string;
}