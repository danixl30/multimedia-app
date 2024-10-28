import argon2 from 'argon2'
import { CryptoService } from '../application/crypto.service'

export const argon2CryptoService = (): CryptoService => ({
	compare(data, encrypted) {
		return argon2.verify(encrypted, data)
	},
	encrypt(data) {
		return argon2.hash(data)
	},
})
