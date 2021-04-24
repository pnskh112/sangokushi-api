import { MultiDataResponse } from 'src/dto/core/multiResponse.class';
import { Warloads } from '../../../domain/entity/warloads.entity';

export class GetWarloadsClass extends MultiDataResponse<Warloads> {
    data: Warloads[];

    constructor(params: {
        found: string;
        currentPage: number;
        lastPage: number;
        data: Warloads[];
    }) {
        super({
            found: params.found,
            currentPage: params.currentPage,
            lastPage: params.lastPage,
        })
        this.data = params.data;
    }
}