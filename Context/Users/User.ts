import { model } from "../../model"

export type User = model.User & model.User.Creatable
export namespace User {
	export function toModel(user: User): model.User {
		const result = { ...user }
		delete result.password
		return result
	}
}
