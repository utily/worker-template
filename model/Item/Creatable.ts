import { isly } from "isly"
export interface Creatable {
	number: number
}

export namespace Creatable {
	export const type = isly.object<Creatable>({ number: isly.number() })
	export const is = type.is
	export const flaw = type.flaw
}
