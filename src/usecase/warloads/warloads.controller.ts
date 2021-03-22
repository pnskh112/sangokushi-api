import { Body, Delete, Param, ParseIntPipe, Post, Put, Query, ValidationPipe } from '@nestjs/common';
import { UsePipes } from '@nestjs/common';
import { Controller, Get } from '@nestjs/common';
import { Warloads } from 'src/domain/entity/Warloads.entity';
import { WarloadsService } from 'src/service/Warloads.service';
import { CreateWarloadsDto } from 'src/dto/Warloads/create-Warloads.dto';
import { GetWarloadsFilterDto } from 'src/dto/Warloads/get-Warloads-filter.dto';


@Controller('warloads')
export class WarloadsController {
    constructor(private WarloadsService: WarloadsService) {}

    @Put('/:id')
    updateWarloadsName(
        @Param('id', ParseIntPipe) id: number,
        @Body('name') name:string,
    ): Promise<Warloads> {
        return this.WarloadsService.updateWarloadsName(id,name);
    }

    @Get('/:id')
    getWarloadsById(
        @Param('id',ParseIntPipe) id: number
    ): Promise<Warloads> {
        return this.WarloadsService.getWarloadsById(id);
    }

    // @Post('kingdoms/:id/warloads')
    // @UsePipes(ValidationPipe)
    // createWarloads(
    //     @Param('id',ParseIntPipe) id: number,
    //     @Body() createWarloadsDto: CreateWarloadsDto
    // ): Promise<Warloads> {
    //     return this.WarloadsService.createWarloads(createWarloadsDto);
    // }

    @Delete('/:id')
    async deleteWarloadsById(
        @Param('id', ParseIntPipe) id: number
    ): Promise<Warloads["id"]> {
        const Warload = await this.WarloadsService.deleteWarloads(id);
        return Warload["id"];
    }

    @Get()
    getWarloads(
        @Query(ValidationPipe) filterDto: GetWarloadsFilterDto
    ): Promise<Warloads[]> {
        return this.WarloadsService.getAllWarloads(filterDto);
    }

}