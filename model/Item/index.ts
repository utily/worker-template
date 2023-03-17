import { Change as ItemChange } from "./Change"
import { Creatable as ItemCreatable } from "./Creatable"

export interface Item {
	id: string
	number: number
}

export namespace Item {
	export function is(value: any | Item): value is Item {
		return typeof value == "object" && typeof value.id == "string" && typeof value.number == "number"
	}
	export const Change = ItemChange
	export type Change = ItemChange
	export const Creatable = ItemCreatable
	export type Creatable = ItemCreatable
}
