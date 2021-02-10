import { Cat } from 'src/cats/cats.entity';
import { Entity, EntityManager, EntityRepository, QueryFailedError, Repository } from 'typeorm';

@EntityRepository(Cat)
export class CatsRepository extends Repository<Cat> {
}

