import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { WarloadsRepository } from '../domain/repository/Warloads.repository';
import { NotFoundException } from "src/domain/exception/notFound.exception";
import { CreateWarloadsDto } from "src/dto/Warloads/create-Warloads.dto";
import { GetWarloadsFilterDto } from "src/dto/Warloads/get-Warloads-filter.dto";
import { Warloads } from "src/domain/entity/Warloads.entity";
import { CreateEpisodesDto } from "src/dto/episodes/create-episodes.dto";
import { Episodes } from "src/domain/entity/episodes.entity";
import { EpisodesRepository } from '../domain/repository/episodes.repository';
import { CreateErasDto } from "src/dto/warloads/create-eras.dto";
import { Era } from "src/domain/entity/eras.entity";
import { ErasRepository } from "src/domain/repository/eras.repository";

@Injectable()
export class ErasService {
    constructor(
        @InjectRepository(WarloadsRepository)
        private warloadsRepository: WarloadsRepository,
        private erasRepository: ErasRepository,
    ) {}

    async getWarloadsById(id: number): Promise<Warloads> {
        const found = await this.warloadsRepository.findOne(id);
        if (!found) {
            throw new NotFoundException(`Warload with ID ${id} not found`)
        }
        return found;
    }

    async createEras(createErasDto: CreateErasDto): Promise<Era> {
        return this.erasRepository.createEras(createErasDto);
    }

}