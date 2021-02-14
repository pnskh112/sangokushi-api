import { Body, Delete, Param, ParseIntPipe, Post, Put, ValidationPipe } from '@nestjs/common';
import { UsePipes } from '@nestjs/common';
import { Controller, Get } from '@nestjs/common';
import { Cats } from 'src/cats/cats.model';
import { Cat } from 'src/repository/dao/cats.entity';
import { CatsService } from 'src/service/cats.service';
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