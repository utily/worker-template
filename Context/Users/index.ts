import * as gracely from "gracely"
import * as isoly from "isoly"
import { http } from "cloudly-http"
import * as storage from "cloudly-storage"
import { model } from "../../model"
import { User } from "./User"

export class Users {
	private constructor(private readonly store: storage.KeyValueStore<User>) {}
	async add(user: model.User.Creatable, admin: string): Promise<model.User> {
		const result: User = { ...user, created: [isoly.DateTime.now(), admin] }
		await this.store.set(user.email, result)
		return User.toModel(result)
	}
	async login(authorization: string): Promise<model.User | undefined> {
		const credentials = http.Authorization.Basic.parse(authorization)
		const result = credentials ? await this.store.get(credentials.user) : undefined
		return result && result.value.password && result.value.password == credentials?.password
			? User.toModel(result.value)
			: undefined
	}
	async list(options?: storage.KeyValueStore.ListOptions): Promise<storage.Continuable<model.User>> {
		return (await this.store.list(options)).map(v => User.toModel(v.value as User))
	}
	static create(store: storage.KeyValueStore<string, string>): Users | gracely.Error {
		return new Users(
			storage.KeyValueStore.partition(
				storage.KeyValueStore.Json.create(storage.KeyValueStore.OnlyMeta.create<string>(store)),
				"user|"
			)
		)
	}
}
