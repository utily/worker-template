import { isly } from "isly"

export interface Item {
	id: string
	number: number
}
export namespace Item {
	export const { type, is, flawed } = isly
		.object<Item>({ id: isly.string(), number: isly.number() })
		.rename("Item")
		.bind()
}
