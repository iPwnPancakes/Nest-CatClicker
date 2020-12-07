import { NotFoundException } from '@nestjs/common';
import { Repository } from '../../Infrastructure/Repository/Repository';
import { InventoryItem } from '../models/InventoryItem';

export class InventoryItemRepository extends Repository<
    InventoryItem<string>,
    string
> {
    find(id: string): InventoryItem<string> {
        return this.respository.find(item => item.itemId === id);
    }
    delete(id: string): void {
        this.respository = this.respository.filter(item => item.itemId !== id);
    }
    save(entity: InventoryItem<string>): InventoryItem<string> {
        const index = this.respository.findIndex(
            item => item.itemId === entity.itemId,
        );

        if (index === -1) {
            throw new NotFoundException(
                `InventoryItem with id ${entity.itemId} does not exist`,
            );
        }

        this.respository.splice(index, 1, entity);

        return entity;
    }
    create<S extends InventoryItem<string>>(
        entityDto: S,
    ): InventoryItem<string> {
        return new InventoryItem(entityDto);
    }
}
