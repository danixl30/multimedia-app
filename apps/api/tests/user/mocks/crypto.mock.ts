import { CryptoService } from 'src/core/application/crypto.service'

export const cryptoMock = (): CryptoService => ({
	async encrypt(data) {
		return data
	},
	async compare(data, encrypted) {
		return data === encrypted
	},
})
