import { Optional } from 'src/utils/types/optional'
import { User } from '../models/user'

export type UserRepository = {
	save(user: User): Promise<void>
	delete(user: User): Promise<void>
	findByUsername(username: string): Promise<Optional<User>>
	findByEmail(email: string): Promise<Optional<User>>
	findById(id: string): Promise<Optional<User>>
}
