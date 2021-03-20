import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { KingdomsRepository } from '../domain/repository/Kingdoms.repository';
import { Kingdoms } from "src/domain/entity/Kingdoms.entity";
import { NotFoundException } from "src/domain/exception/notFound.exception";
import { CreateKingdomsDto } from "src/dto/Kingdoms/create-Kingdoms.dto";
import { GetKingdomsFilterDto } from "src/dto/Kingdoms/get-Kingdoms-filter.dto";

@Injectable()
export class KingdomsService {
    constructor(
        @InjectRepository(KingdomsRepository)
        private KingdomsRepository: KingdomsRepository,
    ) {}

    async getKingdomsById(id: number): Promise<Kingdoms> {
        const found = await this.KingdomsRepository.findOne(id);
        if (!found) {
            throw new NotFoundException(`Kingdom with ID ${id} not found`)
        }
        return found;
    }

    async createKingdoms(createKingdomsDto: CreateKingdomsDto): Promise<Kingdoms> {
        return this.KingdomsRepository.createKingdoms(createKingdomsDto);
    }

    async deleteKingdoms(id: number): Promise<object> {
        const Kingdom = await this.KingdomsRepository.findOne(id);
        if (!Kingdom.remove()) {
            throw new NotFoundException(`Kingdom with ID ${id} not found`);
        };
        return Kingdom;
    }

    async updateKingdomsName(id: number , name: string) {
        const Kingdom = await this.getKingdomsById(id);
        Kingdom.name = name;
        Kingdom.save();
        return Kingdom;
    }



    getAllKingdoms(filterDto: GetKingdomsFilterDto): Promise<Kingdoms[]> {
        return this.KingdomsRepository.getKingdoms(filterDto); 
    }
}