import { Body, Param, ParseIntPipe, Post } from '@nestjs/common';
import { Controller, Get } from '@nestjs/common';
import { Cats } from 'src/cats/cats.model';
import { CatsService } from '../../cats/cats.service';

@Controller('cats')
export class CatsController {
    constructor(private catsService: CatsService) {}

    @Get()
    getAllCats(): Cats[] {
        return this.catsService.getAllCats();
    }

    @Get('/:id')
    getCatsById(
        @Param('id', ParseIntPipe) id: number
    ): Promise<Cats> {
        return this.catsService.getCatsById(id);
    }

    // @Get()
    // findAll(): String {
    //     return 'This action returns all cats';
    // }

    @Post()
    createCats(@Body() body) {
        console.log('body',body);
    }
}