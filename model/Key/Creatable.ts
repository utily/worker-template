import { isly } from "isly"

export interface Creatable {
	user: string
	organization: string | string[]
}

export namespace Creatable {
	export const type = isly.object<Creatable>({
		user: isly.string(),
		organization: isly.union(isly.string(), isly.array(isly.string())),
	})
	export const is = type.is
	export const flaw = type.flaw
}
