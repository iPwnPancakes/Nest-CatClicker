import { Owner } from "../domain/Owner";

export interface IOwnerRepository {
    exists(ownerId: string): Promise<boolean>;
    getOwnerByUserId(userId: string): Promise<Owner>;
    getOwnerByCatId(catId: string): Promise<Owner>;
    getOwnerByUserName(username: string): Promise<Owner>;
    save(owner: Owner): Promise<void>;
}