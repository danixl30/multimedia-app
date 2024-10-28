export type ApplicationService<T, R> = (data: T) => Promise<R>
