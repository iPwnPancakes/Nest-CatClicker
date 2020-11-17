export interface IRepository<T, ID> {
  respository: Array<T>;

  create<S extends T>(item: S): T;

  find(id: ID): T;

  save(entity: T): T

  delete(id: ID): void;

  findWhere(comparator: (n: T) => boolean): Array<T>;

  getAll(): Array<T>;

  deleteAll(): void;

  saveAll(entities: Array<T>): Array<T>;
}
