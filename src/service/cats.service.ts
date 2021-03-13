import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CatsRepository } from '../domain/repository/cats.repository';
import { CreateCatsDto } from '../cats/dto/create-cats.dto';
import { Cat } from "src/domain/entity/cats.entity";
import { GetCatsFilterDto } from '../cats/dto/get-cats-filter.dto';
import { Cats } from "src/cats/cats.model";
import { NotFoundException } from "src/domain/exception/notFound.exception";

@Injectable()
export class CatsService {
    constructor(
        @InjectRepository(CatsRepository)
        private catsRepository: CatsRepository,
    ) {}
    private cats: Cats[] = [];

    async getCatsById(id: number): Promise<Cat> {
        const found = await this.catsRepository.findOne(id);
        if (!found) {
            throw new NotFoundException()
            // throw new NotFoundException(`Cat with ID ${id} not found`);
        }
        return found;
    }

    async createCats(createCatsDto: CreateCatsDto): Promise<Cat> {
        return this.catsRepository.createCats(createCatsDto);
    }

    async deleteCats(id: number): Promise<object> {
        const cat = await this.catsRepository.findOne(id);
        if (!cat.remove()) {
            throw new NotFoundException(`Cat with ID ${id} not found`);
        };
        return cat;
    }

    async updateCatsName(id: number , name: string) {
        const cat = await this.getCatsById(id);
        cat.name = name;
        cat.save();
        return cat;
    }



    getAllCats(filterDto: GetCatsFilterDto): Promise<Cat[]> {
        return this.catsRepository.getCats(filterDto); 
    }
}