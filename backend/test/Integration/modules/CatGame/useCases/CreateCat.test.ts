import { Cat } from '../../../../../src/modules/CatGame/domain/Cat';
import { Cats } from '../../../../../src/modules/CatGame/domain/Cats';
import { Decorations } from '../../../../../src/modules/CatGame/domain/Decorations';
import { OwnerId } from '../../../../../src/modules/CatGame/domain/OwnerId';
import { Room } from '../../../../../src/modules/CatGame/domain/Room';
import { IRoomRepository } from '../../../../../src/modules/CatGame/repositories/ports/roomRepository';
import { CreateCat } from '../../../../../src/modules/CatGame/useCases/createCat/CreateCat';
import { CreateCatDTO } from '../../../../../src/modules/CatGame/useCases/createCat/CreateCatDTO';
import { OwnerDoesNotExistError } from '../../../../../src/modules/CatGame/useCases/createCat/CreateCatErrors';
import { UnexpectedError } from '../../../../../src/shared/core/AppError';
import { UniqueEntityId } from '../../../../../src/shared/domain/UniqueEntityId';

describe('CreateCat use case', () => {
    let fakeRoom: Room;
    let fakeCat: Cat;
    let roomRepo: IRoomRepository;
    let useCase: CreateCat;

    beforeEach(() => {
        roomRepo = {
            exists: jest.fn(),
            save: jest.fn(),
            getRoomByCatId: jest.fn(),
            getRoomByRoomId: jest.fn(),
            delete: jest.fn(),
        };

        useCase = new CreateCat(roomRepo);

        fakeCat = Cat.create({
            name: 'asdfasdf',
            clickRate: 1234,
        }).getValue();

        fakeRoom = Room.create(
            {
                name: 'asdfasdf',
                owner_id: OwnerId.create().getValue(),
                maxCatAmount: 1,
                cats: Cats.create([]),
                decorations: Decorations.create(),
            },
            new UniqueEntityId(-1),
        ).getValue();
    });

    it('Fails if room does not exist', async () => {
        roomRepo.exists = jest.fn(async () => false);

        const dto: CreateCatDTO = {
            room_id: fakeRoom.roomId.id.toString(),
            clickRate: fakeCat.clickRate,
            name: fakeCat.name,
        };

        const result = await useCase.execute(dto);

        expect(result.isLeft()).toBeTruthy();
        expect(result.value).toBeInstanceOf(OwnerDoesNotExistError);
    });

    it('Fails if invalid cat name', async () => {
        roomRepo.exists = jest.fn(async () => true);
        roomRepo.getRoomByRoomId = jest.fn(async () => fakeRoom);

        const dto: CreateCatDTO = {
            room_id: fakeRoom.roomId.id.toString(),
            clickRate: fakeCat.clickRate,
            name: '',
        };

        const result = await useCase.execute(dto);

        expect(result.isLeft()).toBeTruthy();
    });

    it('Fails if invalid cat click rate', async () => {
        roomRepo.exists = jest.fn(async () => true);
        roomRepo.getRoomByRoomId = jest.fn(async () => fakeRoom);

        const dto: CreateCatDTO = {
            room_id: fakeRoom.roomId.id.toString(),
            clickRate: -1,
            name: fakeCat.name,
        };

        const result = await useCase.execute(dto);

        expect(result.isLeft()).toBeTruthy();
    });

    it('Fails if roomRepo throws', async () => {
        roomRepo.exists = jest.fn(async () => {
            throw new Error('asdf');
        });

        const dto: CreateCatDTO = {
            room_id: fakeRoom.roomId.id.toString(),
            clickRate: fakeCat.clickRate,
            name: fakeCat.name,
        };

        const result = await useCase.execute(dto);

        expect(result.isLeft()).toBeTruthy();
        expect(result.value).toBeInstanceOf(UnexpectedError);
    });
});
