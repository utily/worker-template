export interface Creatable {
	number: number
}

export namespace Creatable {
	export function is(value: any | Creatable): value is Creatable {
		return typeof value == "object" && typeof value.number == "number"
	}
}
