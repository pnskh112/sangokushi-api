import { Body, Param, ParseIntPipe, Post, ValidationPipe } from '@nestjs/common';
import { UsePipes } from '@nestjs/common';
import { Controller, Get } from '@nestjs/common';
import { Cat } from 'src/cats/cats.entity';
import { Cats } from 'src/cats/cats.model';
import { CatsService } from '../../cats/cats.service';
import { CreateCatsDto } from '../../cats/dto/create-cats.dto';

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

    @Post()
    @UsePipes(ValidationPipe)
    createCats(@Body() createCatsDto: CreateCatsDto): Promise<Cats> {
        return this.catsService.createCats(createCatsDto);
    }
}