import { model } from "../index"

describe("model.Item", () => {
	const valid = { id: "item-1", number: 1 }
	it.each([valid, { ...valid, extra: true }])("accepts valid items", item => {
		expect(model.Item.type.is(item)).toBe(true)
		expect(model.Item.is(item)).toBe(true)
		expect(model.Item.flawed(item)).toBe(false)
	})
	it.each([null, undefined, {}, { id: "item-1" }, { ...valid, id: 1 }, { ...valid, number: "1" }])(
		"rejects invalid items",
		item => {
			expect(model.Item.is(item)).toBe(false)
			expect(model.Item.flawed(item)).not.toBe(false)
		}
	)
})
