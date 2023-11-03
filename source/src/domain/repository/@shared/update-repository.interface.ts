export interface UpdateRepositoryInterface<T> {
  update(entity: T): Promise<void>;
}