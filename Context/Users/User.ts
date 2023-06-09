import { cryptly } from "cryptly"
import * as isoly from "isoly"
import { isly } from "isly"
import { model } from "../../model"

export type User = model.User & { password?: cryptly.Password.Hash }

export namespace User {
	export type V1 = model.User & model.User.Creatable
	export function fromModel(user: model.User.Creatable & Pick<User, "password">, admin: string): User {
		return {
			...user,
			created: [isoly.DateTime.now(), admin],
		}
	}
	export function toModel(user: User | User.V1 | undefined): model.User | undefined {
		return model.User.type.get(user)
	}
	export const type = isly.named(
		"User",
		isly.intersection<User, model.User, model.User.Creatable>(model.User.type, model.User.Creatable.type)
	)
	export const is = type.is
	export const flaw = type.flaw
}
