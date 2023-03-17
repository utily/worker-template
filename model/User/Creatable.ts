import { isly } from "isly"

export interface Creatable {
	email: string
	name: string | { first: string; last: string }
	password?: string
}
export namespace Creatable {
	export const type = isly.object<Creatable>({
		email: isly.string(),
		name: isly.union(isly.string(), isly.object({ first: isly.string(), last: isly.string() })),
		password: isly.string().optional(),
	})
	export const is = type.is
	export const flaw = type.flaw
}
