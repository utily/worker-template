import * as isoly from "isoly"
import { isly } from "isly"
import { Creatable as UserCreatable } from "./Creatable"

export interface User {
	email: string
	name: string | { first: string; last: string }
	created: [isoly.DateTime, string]
}

export namespace User {
	export const type = isly.object<User>({
		email: isly.string(),
		name: isly.union(isly.string(), isly.object({ first: isly.string(), last: isly.string() })),
		created: isly.tuple(isly.string(), isly.string()),
	})
	export const is = type.is
	export const flaw = type.flaw
	export type Creatable = UserCreatable
	export const Creatable = UserCreatable
}
