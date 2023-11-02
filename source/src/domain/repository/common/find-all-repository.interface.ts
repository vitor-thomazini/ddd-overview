export interface FindAllRepositoryInterface<T> {
  findAll(): Promise<T[]>;
}