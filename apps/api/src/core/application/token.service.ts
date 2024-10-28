export type TokenService<T extends string | object> = {
	sign(data: T): Promise<string>
	verify(token: string): Promise<T>
}
