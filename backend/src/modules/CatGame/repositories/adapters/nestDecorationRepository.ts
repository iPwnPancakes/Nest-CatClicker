import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Decoration } from '../../../../shared/infrastructure/framework/nestjs/typeorm/models/Decoration.entity';
import { Decoration as DecorationDomainModel } from '../../domain/Decoration';
import { Decorations } from '../../domain/Decorations';
import { DecorationMap } from '../../mappers/decorationMap';
import { IDecorationRepository } from '../ports/decorationRepository';

export class NestDecorationRepository implements IDecorationRepository {
    constructor(
        @InjectRepository(Decoration)
        private decorationRepo: Repository<Decoration>,
    ) {}

    async exists(decorationId: string): Promise<boolean> {
        const decoration = await this.decorationRepo.findOne(decorationId);

        if (!decoration) {
            return false;
        }

        return true;
    }

    async getDecorationByDecorationId(
        decorationId: string,
    ): Promise<DecorationDomainModel> {
        const decoration = await this.decorationRepo.findOne(decorationId);

        if (!decoration) {
            throw new Error('Decoration not found');
        }

        return DecorationMap.toDomain(decoration);
    }

    async getDecorationsByRoomId(
        roomId: string,
    ): Promise<DecorationDomainModel[]> {
        const decorations: Decoration[] = await this.decorationRepo.find({
            relations: ['room'],
            where: {
                room: {
                    id: roomId,
                },
            },
        });

        return decorations.map(decoration =>
            DecorationMap.toDomain(decoration),
        );
    }

    async save(decoration: DecorationDomainModel): Promise<void> {
        const exists: boolean = await this.exists(
            decoration.decorationId.id.toString(),
        );

        if (!exists) {
            const decorationOrmEntity = await DecorationMap.toPersistence(
                decoration,
            );
            await this.decorationRepo.save(decorationOrmEntity);
        }
    }

    async saveBulk(decorations: Decorations): Promise<void> {
        for (const decoration of decorations.getRemovedItems()) {
            this.delete(decoration);
        }

        for (const decoration of decorations.getNewItems()) {
            this.save(decoration);
        }
    }

    async delete(decoration: DecorationDomainModel): Promise<void> {
        this.decorationRepo.delete({
            id: decoration.decorationId.id.toString(),
        });
    }
}
