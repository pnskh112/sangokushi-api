import { IsNotEmpty } from 'class-validator';

export class CreateEpisodesDto {

    id: number | null;

    warsId: number | null;

    warloadsId: number | null;

    /*エピソードタイトル*/
    title: string | null;

    /*エピソード*/
    episode: string | null;
}