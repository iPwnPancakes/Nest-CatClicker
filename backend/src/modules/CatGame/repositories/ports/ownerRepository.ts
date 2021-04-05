import { Owner } from '../../domain/Owner';

export const IOwnerRepository = Symbol('IOwnerRepository');

export interface IOwnerRepository {
    exists(ownerId: string): Promise<boolean>;
    getOwnerByOwnerId(ownerId: string): Promise<Owner>;
    getOwnerByUserId(userId: string): Promise<Owner>;
    getOwnerByCatId(catId: string): Promise<Owner>;
    getOwnerByUserName(username: string): Promise<Owner>;
    save(owner: Owner): Promise<void>;
}
