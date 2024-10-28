export type CryptoService = {
	encrypt(data: string): Promise<string>
	compare(data: string, encrypted: string): Promise<boolean>
}
