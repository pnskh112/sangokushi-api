import { Injectable } from "@nestjs/common";
import { NotFoundException } from "@nestjs/common/exceptions";
import { InjectRepository } from "@nestjs/typeorm";
import { Cats } from "dist/cats/cats.model";
import { CatsRepository } from '../repository/cats.repository';
import { Cat } from './cats.entity';

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
            throw new NotFoundException(`Cat with ID ${id} not found`);
        }

        return found;
    }



    getAllCats(): Cats[] {
        return this.cats;
    }
}