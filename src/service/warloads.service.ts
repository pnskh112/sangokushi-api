import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { WarloadsRepository } from '../domain/repository/Warloads.repository';
import { NotFoundException } from "src/domain/exception/notFound.exception";
import { CreateWarloadsDto } from "src/dto/Warloads/create-Warloads.dto";
import { GetWarloadsFilterDto } from "src/dto/Warloads/get-Warloads-filter.dto";
import { Warloads } from "src/domain/entity/Warloads.entity";

@Injectable()
export class WarloadsService {
    constructor(
        @InjectRepository(WarloadsRepository)
        private warloadsRepository: WarloadsRepository,
    ) {}

    async getWarloadsById(id: number): Promise<Warloads> {
        const found = await this.warloadsRepository.findOne(id);
        if (!found) {
            throw new NotFoundException(`Warload with ID ${id} not found`)
        }
        return found;
    }

    async createWarloads(createWarloadsDto: CreateWarloadsDto): Promise<Warloads> {
        return this.warloadsRepository.createWarloads(createWarloadsDto);
    }

    async deleteWarloads(id: number): Promise<object> {
        const warload = await this.warloadsRepository.findOne(id);
        if (!warload.remove()) {
            throw new NotFoundException(`Warload with ID ${id} not found`);
        };
        return warload;
    }

    async updateWarloadsName(id: number , name: string) {
        const warload = await this.getWarloadsById(id);
        warload.name = name;
        warload.save();
        return warload;
    }

    // getAllWarloads(filterDto: GetWarloadsFilterDto): Promise<Warloads[]> {
    //     return this.warloadsRepository.getWarloads(filterDto); 
    // }
}