export interface Change {
	number: number
}

export namespace Change {
	export function is(value: any | Change): value is Change {
		return typeof value == "object" && typeof value.number == "number"
	}
}
