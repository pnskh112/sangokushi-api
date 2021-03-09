import { Body, Delete, Param, ParseIntPipe, Post, Put, Query, ValidationPipe } from '@nestjs/common';
import { UsePipes } from '@nestjs/common';
import { Controller, Get } from '@nestjs/common';
import { Cats } from 'src/cats/cats.model';
import { GetCatsFilterDto } from 'src/cats/dto/get-cats-filter.dto';
import { Cat } from 'src/domain/entity/cats.entity';
import { CatsService } from 'src/service/cats.service';
import { CreateCatsDto } from '../../cats/dto/create-cats.dto';

@Controller('cats')
export class CatsController {
    constructor(private catsService: CatsService) {}

    @Get()
    getCats(
        @Query(ValidationPipe) filterDto: GetCatsFilterDto
    ): Promise<Cats[]> {
        return this.catsService.getAllCats(filterDto);
    }

    @Get('/:id')
    getCatsById(
        @Param('id', ParseIntPipe) id: number
    ): Promise<Cats> {
        return this.catsService.getCatsById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createCats(
        @Body() createCatsDto: CreateCatsDto
    ): Promise<Cats> {
        return this.catsService.createCats(createCatsDto);
    }

    @Delete('/:id')
    async deleteCatsById(
        @Param('id', ParseIntPipe) id: number
    ): Promise<Cat["id"]> {
        const cat = await this.catsService.deleteCats(id);
        return cat["id"];
    }

    @Put('/:id')
    updateCatName(
        @Param('id',ParseIntPipe) id:number,
        @Body('name') name:string,
    ): Promise<Cat> {
        return this.catsService.updateCatsName(id,name);
    }
}