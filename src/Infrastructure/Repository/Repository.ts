import { IRepository } from './Repository.interface';

export abstract class Repository<T, ID> implements IRepository<T, ID> {
  respository: T[];

  constructor(items?: T[]) {
    this.respository = items || [];
  }

  abstract find(id: ID): T | undefined

  abstract delete(id: ID): void

  abstract save(entity: T): T

  abstract create<S extends T>(entityDto: S): T

  findWhere(predicate: (n: T) => boolean): T[] {
    return this.respository.filter(predicate);
  }

  getAll(): T[] {
    return this.respository.slice();
  }

  deleteAll(): void {
    this.respository = [];
  }

  saveAll(entities: T[]): T[] {
    for (let i = 0; i < entities.length; i++) {
      this.save(entities[i]);
    }

    return entities;
  }
}
