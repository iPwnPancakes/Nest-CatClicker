import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Owner } from '../../../../shared/infrastructure/framework/nestjs/typeorm/models/Owner.entity';
import { Owner as OwnerDomainModel } from '../../domain/Owner';
import { OwnerMap } from '../../mappers/ownerMap';
import { IOwnerRepository } from '../ports/ownerRepository';

@Injectable()
export class NestOwnerRepository implements IOwnerRepository {
    constructor(
        @InjectRepository(Owner)
        private ownerRepo: Repository<Owner>,
    ) {}

    async exists(ownerId: string): Promise<boolean> {
        const owner: Owner = await this.ownerRepo.findOne(ownerId);

        if (!owner) {
            return false;
        }

        return true;
    }

    async getOwnerByOwnerId(ownerId: string): Promise<OwnerDomainModel> {
        const owner: Owner = await this.ownerRepo.findOne(ownerId);

        if (!owner) {
            throw new Error('Owner not found');
        }

        return OwnerMap.toDomain(owner);
    }

    async getOwnerByUserId(userId: string): Promise<OwnerDomainModel> {
        const owner: Owner = await this.ownerRepo.findOne({
            where: {
                user: {
                    id: userId,
                },
            },
        });

        if (!owner) {
            throw new Error('Owner not found');
        }

        return OwnerMap.toDomain(owner);
    }

    async getOwnerByCatId(catId: string): Promise<OwnerDomainModel> {
        const owner: Owner = await this.ownerRepo.findOne({
            relations: ['cats'],
            where: {
                cats: {
                    id: catId,
                },
            },
        });

        if (!owner) {
            throw new Error('Owner not found that owns cat');
        }

        return OwnerMap.toDomain(owner);
    }

    async getOwnerByUserName(username: string): Promise<OwnerDomainModel> {
        const owner: Owner = await this.ownerRepo.findOne({
            relations: ['user'],
            where: {
                user: { username },
            },
        });

        if (!owner) {
            throw new Error('Owner not found with that username');
        }

        return OwnerMap.toDomain(owner);
    }

    async save(owner: OwnerDomainModel): Promise<void> {
        const ownerExists = await this.exists(owner.ownerId.id.toString());

        if (!ownerExists) {
            const ownerOrmEntity = await OwnerMap.toPersistence(owner);
            await this.ownerRepo.save(ownerOrmEntity);
        }
    }
}
