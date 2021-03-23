import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { WarloadsRepository } from '../domain/repository/Warloads.repository';
import { Warload } from "src/domain/entity/Warloads.entity";
import { NotFoundException } from "src/domain/exception/notFound.exception";
import { CreateWarloadsDto } from "src/dto/Warloads/create-Warloads.dto";
import { GetWarloadsFilterDto } from "src/dto/Warloads/get-Warloads-filter.dto";

@Injectable()
export class WarloadsService {
    KingdomsRepository: any;
    constructor(
        @InjectRepository(WarloadsRepository)
        private warloadsRepository: WarloadsRepository,
    ) {}

    async getWarloadsById(id: number): Promise<Warload> {
        const found = await this.warloadsRepository.findOne(id);
        if (!found) {
            throw new NotFoundException(`Warload with ID ${id} not found`)
        }
        return found;
    }

    async createWarloads(
        id: number,
        createWarloadsDto: CreateWarloadsDto
    ): Promise<Warload> {
        console.log("id",id);
        // const found = await this.KingdomsRepository.getWarloadsById(id);
        // if (!found) {
        //     throw new NotFoundException(`Kingdom with ID ${id} not found`)
        // }
        return this.warloadsRepository.createWarloads(id,createWarloadsDto);
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