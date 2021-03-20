import { Body, Delete, Param, ParseIntPipe, Post, Put, Query, ValidationPipe } from '@nestjs/common';
import { UsePipes } from '@nestjs/common';
import { Controller, Get } from '@nestjs/common';
import { Kingdoms } from 'src/domain/entity/Kingdoms.entity';
import { KingdomsService } from 'src/service/Kingdoms.service';
import { CreateKingdomsDto } from 'src/dto/kingdoms/create-kingdoms.dto';
import { GetKingdomsFilterDto } from 'src/dto/kingdoms/get-kingdoms-filter.dto';


@Controller('kingdoms')
export class KingdomsController {
    constructor(private KingdomsService: KingdomsService) {}

    @Put('/:id')
    updateKingdomName(
        @Param('id', ParseIntPipe) id: number,
        @Body('name') name:string,
    ): Promise<Kingdoms> {
        return this.KingdomsService.updateKingdomsName(id,name);
    }

    @Get('/:id')
    getKingdomsById(
        @Param('id',ParseIntPipe) id: number
    ): Promise<Kingdoms> {
        return this.KingdomsService.getKingdomsById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createKingdoms(
        @Body() createKingdomsDto: CreateKingdomsDto
    ): Promise<Kingdoms> {
        return this.KingdomsService.createKingdoms(createKingdomsDto);
    }

    @Delete('/:id')
    async deleteKingdomsById(
        @Param('id', ParseIntPipe) id: number
    ): Promise<Kingdoms["id"]> {
        const Kingdom = await this.KingdomsService.deleteKingdoms(id);
        return Kingdom["id"];
    }

    @Get()
    getKingdoms(
        @Query(ValidationPipe) filterDto: GetKingdomsFilterDto
    ): Promise<Kingdoms[]> {
        return this.KingdomsService.getAllKingdoms(filterDto);
    }

}