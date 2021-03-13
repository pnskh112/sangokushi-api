import { Injectable } from "@nestjs/common";
import { NotFoundException } from "@nestjs/common/exceptions";
import { InjectRepository } from "@nestjs/typeorm";
import { CatsRepository } from '../domain/repository/cats.repository';
import { CreateCatsDto } from '../cats/dto/create-cats.dto';
import { GetCatsFilterDto } from '../cats/dto/get-cats-filter.dto';
import { Cat } from "src/domain/cat.domain";
import { Cats } from "src/cats/cats.model";

@Injectable()
export class CatsService {
    constructor(
        @InjectRepository(CatsRepository)
        private catsRepository: CatsRepository,
    ) {}
    private cats: Cats[] = [];

    // async getCatsById(id: number): Promise<Cat> {
    //     const found = await this.catsRepository.findOne(id);
    //     if (!found) {
    //         throw new NotFoundException(`Cat with ID ${id} not found`);
    //     }
    //     return found;
    // }

    async createCats(cat: Cat): Promise<catId> {
        return this.catsRepository.createCats(cat);
    }

    // async deleteCats(id: number): Promise<object> {
    //     const cat = await this.catsRepository.findOne(id);
    //     if (!cat.remove()) {
    //         throw new NotFoundException(`Cat with ID ${id} not found`);
    //     };
    //     return cat;
    // }

    // async updateCatsName(id: number , name: string) {
    //     const cat = await this.getCatsById(id);
    //     cat.name = name;
    //     cat.save();
    //     return cat;
    // }



    // getAllCats(filterDto: GetCatsFilterDto): Promise<Cat[]> {
    //     return this.catsRepository.getCats(filterDto); 
    // }
}
interface catId {
    id: number;
}
