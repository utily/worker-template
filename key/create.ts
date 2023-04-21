import * as gracely from "gracely"
import { http } from "cloudly-http"
import { Context } from "../Context"
import { model } from "../model"
import { router } from "../router"

export async function create(request: http.Request, context: Context): Promise<http.Response.Like | any> {
	let result: gracely.Result
	const body = await request.body
	const key = await context.authenticate(request)
	if (key != "admin")
		result = gracely.client.unauthorized()
	else if (!model.Key.Creatable.is(body))
		result = gracely.client.flawedContent(model.Key.Creatable.flaw(body))
	else if (gracely.Error.is(context.issuer))
		result = context.issuer
	else {
		const response = await context.issuer.sign(body)
		result = gracely.success.created(response)
	}
	return result
}
router.add("POST", "/key", create)
