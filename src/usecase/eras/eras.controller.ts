import { Body, Delete, Param, ParseIntPipe, Post, Put, Query, ValidationPipe } from '@nestjs/common';
import { UsePipes } from '@nestjs/common';
import { Controller, Get } from '@nestjs/common';
import { Warloads } from 'src/domain/entity/Warloads.entity';
import { Eras } from 'src/domain/entity/Eras.entity';
import { ErasService } from 'src/service/Eras.service';
import { WarloadsService } from 'src/service/Warloads.service';
import { CreateWarloadsDto } from 'src/dto/Warloads/create-Warloads.dto';
import { GetWarloadsFilterDto } from 'src/dto/Warloads/get-Warloads-filter.dto';
import { UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { CreateEpisodesDto } from 'src/dto/episodes/create-episodes.dto';
import { Episodes } from 'src/domain/entity/Episodes.entity';
import { CreateErasDto } from 'src/dto/warloads/create-eras.dto';


@Controller()
export class ErasController {
    constructor(
        private WarloadsService: WarloadsService,
        private ErasService: ErasService,
        ) {}

    @Put('/:warloads_id')
    updateWarloadsName(
        @Param('warloads_id', ParseIntPipe) warloads_id: number,
        @Body('name') name:string,
    ): Promise<Warloads> {
        return this.WarloadsService.updateWarloadsName(warloads_id,name);
    }

    @Get('/:warloads_id')
    getWarloadsById(
        @Param('warloads_id',ParseIntPipe) warloads_id: number
    ): Promise<Warloads> {
        return this.WarloadsService.getWarloadsById(warloads_id);
    }

    @Post('/kingdoms/:kingdoms_id/eras')
    @UsePipes(ValidationPipe)
    createEras(
        @Param('kingdoms_id', ParseIntPipe) kingdoms_id: number,
        @Body() createErasDto: CreateErasDto
    ): Promise<Eras> {
        return this.ErasService.createEras(createErasDto);
    }

    @Post('/warloads/:warloads_id/episodes/')
    @UsePipes(ValidationPipe)
    createEpisodes(
        @Param('warloads_id', ParseIntPipe) warloads_id: number,
        @Body() createEpisodesDto: CreateEpisodesDto
    ): Promise<Episodes> {
        return this.WarloadsService.createEpisodes(createEpisodesDto);
    }    

    @Delete('/:warloads_id')
    async deleteWarloadsById(
        @Param('warloads_id', ParseIntPipe) warloads_id: number
    ): Promise<Warloads["id"]> {
        const Warload = await this.WarloadsService.deleteWarloads(warloads_id);
        return Warload["warloads_id"];
    }

    // @Get()
    // getWarloads(
    //     @Query(ValidationPipe) filterDto: GetWarloadsFilterDto
    // ): Promise<Warloads[]> {
    //     return this.WarloadsService.getAllWarloads(filterDto);
    // }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    uploadFile(@UploadedFile() file: Express.Multer.File) {
        console.log(file);
    }

}