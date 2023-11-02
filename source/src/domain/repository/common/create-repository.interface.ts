export interface CreateRepositoryInterface<T> {
  create(entity: T): Promise<void>;
}