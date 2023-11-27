import { cryptly } from "cryptly"

export class Bitmap {
	constructor(private resolution: { width: number; height: number }, private readonly data: Uint8Array) {}
	set([x, y]: [number, number], [red, green, blue]: [number, number, number]): void {
		const index = (x + y * this.resolution.width) * 3
		this.data[index] = red
		this.data[index + 1] = green
		this.data[index + 2] = blue
	}
	export(): Uint8Array {
		const header = cryptly.Base16.decode(
			"424d b651 0100 0000 0000 3600 0000 2800 0000 c800 0000 9000 0000 0100 1800".replaceAll(" ", "") +
				"0000".repeat(12)
		)
		const result = new Uint8Array(header.byteLength + this.data.byteLength)
		result.set(header)
		result.set(this.data, header.byteLength)
		return result
	}
	static create(): Bitmap {
		const resolution = { width: 200, height: 144 }
		return new this(resolution, new Uint8Array(resolution.width * resolution.height * 3))
	}
}
