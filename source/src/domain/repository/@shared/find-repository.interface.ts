export interface FindRepositoryInterface<T> {
  find(id: string): Promise<T>;
}