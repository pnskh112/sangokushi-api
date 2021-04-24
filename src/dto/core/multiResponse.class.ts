import { ApiProperty } from '@nestjs/swagger';

export class MultiDataResponse<Data> {
    @ApiProperty({
        example: 100,
        description: 'The total number of data size.',
    })
    found: string;

    @ApiProperty({
        example: 1,
        description: 'The number of current page.',
    })
    currentPage: number;

    @ApiProperty({
        example: 4,
        description: 'The number of current page.',
    })
    lastPage: number;
    constructor(params: {
        found: string;
        currentPage: number;
        lastPage: number;
    }) {
        this.found = params.found;
        this.currentPage = params.currentPage;
        this.lastPage = params.lastPage;
    }
}