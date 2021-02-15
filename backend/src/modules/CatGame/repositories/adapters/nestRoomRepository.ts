import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Room } from '../../../../shared/infrastructure/framework/nestjs/typeorm/models/Room.entity';
import { Cats } from '../../domain/Cats';
import { Decorations } from '../../domain/Decorations';
import { Room as RoomDomainModel } from '../../domain/Room';
import { RoomId } from '../../domain/RoomId';
import { RoomMapper } from '../../mappers/roomMap';
import { ICatRepository } from '../ports/catRepository';
import { IDecorationRepository } from '../ports/decorationRepository';
import { IRoomRepository } from '../ports/roomRepository';
import { NestCatRepository } from './nestCatRepository';
import { NestDecorationRepository } from './nestDecorationRepository';

@Injectable()
export class NestRoomRepository implements IRoomRepository {
    private roomRepo: Repository<Room>;
    private catRepo: ICatRepository;
    private decorationRepo: IDecorationRepository;

    constructor(
        @InjectRepository(Room)
        roomRepo: Repository<Room>,
        catRepo: NestCatRepository,
        decorationRepo: NestDecorationRepository,
    ) {
        this.roomRepo = roomRepo;
        this.catRepo = catRepo;
        this.decorationRepo = decorationRepo;
    }

    async exists(roomId: string): Promise<boolean> {
        const room = await this.roomRepo.findOne(roomId);

        if (!room) {
            return false;
        }

        return true;
    }

    async getRoomByRoomId(roomId: string): Promise<RoomDomainModel> {
        const room = await this.roomRepo.findOne(roomId, {
            relations: ['cats', 'decorations'],
        });

        if (!room) {
            throw new Error('Room not found');
        }

        return RoomMapper.toDomain(room);
    }

    async getRoomByCatId(catId: string): Promise<RoomDomainModel> {
        const room = await this.roomRepo.findOne({
            relations: ['cats', 'decorations'],
            where: {
                cats: {
                    id: catId,
                },
            },
        });

        if (!room) {
            throw new Error('No room associated to that cat id');
        }

        return RoomMapper.toDomain(room);
    }

    async save(room: RoomDomainModel): Promise<void> {
        const exists = this.exists(room.roomId.id.toString());

        const roomOrmModel = await RoomMapper.toPersistence(room);

        if (!exists) {
            try {
                this.roomRepo.create(roomOrmModel);

                await this.saveDecorations(room.decorations);
                await this.saveCats(room.cats);
            } catch (err) {
                await this.delete(room.roomId);
                throw new Error(err.toString());
            }
        } else {
            this.roomRepo.update(room.roomId.id.toString(), roomOrmModel);

            await this.saveDecorations(room.decorations);
            await this.saveCats(room.cats);
        }
    }

    async delete(roomId: RoomId): Promise<void> {
        const room = await this.getRoomByRoomId(roomId.id.toString());

        if (
            room.cats.getItems().length !== 0 ||
            room.decorations.getItems().length !== 0
        ) {
            throw new Error('Room must be empty before you can delete it');
        }

        await this.roomRepo.delete(roomId.id.toString());
    }

    private async saveDecorations(decorations: Decorations): Promise<void> {
        this.decorationRepo.saveBulk(decorations);
    }

    private async saveCats(cats: Cats): Promise<void> {
        this.catRepo.saveBulk(cats);
    }
}
