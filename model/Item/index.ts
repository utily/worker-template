import { isly } from "isly"
import { Change as ItemChange } from "./Change"
import { Creatable as ItemCreatable } from "./Creatable"

export interface Item extends Item.Creatable {
	id: string
	test?: string
}

export namespace Item {
	export const type = ItemCreatable.type.extend<Item>({ id: isly.string(), test: isly.string().optional() }, "Item")
	export const is = type.is
	export const flaw = type.flaw

	export const Change = ItemChange
	export type Change = ItemChange
	export const Creatable = ItemCreatable
	export type Creatable = ItemCreatable
}
