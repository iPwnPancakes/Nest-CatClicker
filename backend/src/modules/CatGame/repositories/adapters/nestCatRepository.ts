import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cat } from '../../../../shared/infrastructure/framework/nestjs/typeorm/models/Cat.entity';
import { Cat as CatDomainModel } from '../../domain/Cat';
import { Cats } from '../../domain/Cats';
import { CatMapper } from '../../mappers/catMap';
import { ICatRepository } from '../ports/catRepository';

@Injectable()
export class NestCatRepository implements ICatRepository {
    constructor(
        @InjectRepository(Cat)
        private catRepo: Repository<Cat>,
    ) {}

    async exists(catId: string): Promise<boolean> {
        const cat = await this.catRepo.findOne(catId);

        if (!cat) {
            return false;
        }

        return true;
    }

    async getCatByCatId(catId: string): Promise<CatDomainModel> {
        const cat = await this.catRepo.findOne(catId);

        if (!cat) {
            throw new Error('Cat not found');
        }

        return CatMapper.toDomain(cat);
    }

    async getCatsByRoomId(roomId: string): Promise<CatDomainModel[]> {
        const cats = await this.catRepo.find({
            relations: ['room'],
            where: {
                room: {
                    id: roomId,
                },
            },
        });

        return cats.map(cat => CatMapper.toDomain(cat));
    }

    async save(cat: CatDomainModel): Promise<void> {
        const exists = this.exists(cat.catId.id.toString());

        const catOrmModel = await CatMapper.toPersistence(cat);

        if (!exists) {
            await this.catRepo.save(catOrmModel);
        } else {
            await this.catRepo.update(cat.catId.id.toString(), cat);
        }
    }

    async delete(cat: CatDomainModel): Promise<void> {
        await this.catRepo.delete(cat.catId.id.toString());
    }

    async saveBulk(cats: Cats): Promise<void> {
        for (const cat of cats.getItems()) {
            await this.save(cat);
        }
    }
}
