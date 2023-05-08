import * as cryptly from "cryptly"
import * as gracely from "gracely"
import { http } from "cloudly-http"
import { Context } from "../Context"
import { model } from "../model"
import { router } from "../router"

export async function create(request: http.Request, context: Context): Promise<http.Response.Like | any> {
	let result: gracely.Result
	const item = await request.body
	if (!request.header.authorization)
		result = gracely.client.unauthorized()
	else if (!model.Item.Creatable.is(item))
		result = gracely.client.invalidContent("Item", "Body is not a valid item.")
	else
		result = gracely.success.created({ ...item, id: cryptly.Identifier.generate(4) })
	return result
}
router.add("POST", "/item", create)
