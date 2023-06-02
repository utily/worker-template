import { isly } from "isly"
import { model } from "../../model"

export type User = model.User & model.User.Creatable

export namespace User {
	export function toModel(user: User | undefined): model.User | undefined {
		return model.User.type.get(user)
	}
	export const type = isly.named(
		"User",
		isly.intersection<User, model.User, model.User.Creatable>(model.User.type, model.User.Creatable.type)
	)
	export const is = type.is
	export const flaw = type.flaw
}
