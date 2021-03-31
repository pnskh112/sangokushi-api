import { Body, Delete, Param, ParseIntPipe, Post, Put, Query, ValidationPipe } from '@nestjs/common';
import { UsePipes } from '@nestjs/common';
import { Controller, Get } from '@nestjs/common';
import { Warloads } from 'src/domain/entity/Warloads.entity';
import { WarloadsService } from 'src/service/Warloads.service';
import { CreateWarloadsDto } from 'src/dto/Warloads/create-Warloads.dto';
import { GetWarloadsFilterDto } from 'src/dto/Warloads/get-Warloads-filter.dto';
import { UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { CreateEpisodesDto } from 'src/dto/episodes/create-episodes.dto';
import { Episodes } from 'src/domain/entity/Episodes.entity';


@Controller('kingdoms')
export class WarloadsController {
    constructor(
        private WarloadsService: WarloadsService,
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

    @Post('/:kingdoms_id/warloads')
    @UsePipes(ValidationPipe)
    createWarloads(
        @Param('kingdoms_id', ParseIntPipe) warloads_id: number,
        @Body() createWarloadsDto: CreateWarloadsDto
    ): Promise<Warloads> {
        return this.WarloadsService.createWarloads(createWarloadsDto);
    }

    @Post('/warloads/:warloads_id/episodes/')
    @UsePipes(ValidationPipe)
    createEpisodes(
        @Param('kingdoms_id', ParseIntPipe) warloads_id: number,
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