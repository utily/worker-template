import * as gracely from "gracely"
import { http } from "cloudly-http"
import { isly } from "isly"
import { Context } from "../Context"
import { users } from "../Context/Users/users"
import { model } from "../model"
import { router } from "../router"

const type = isly.object({ password: isly.string() })
export async function change(request: http.Request, context: Context): Promise<http.Response.Like | any> {
	let result: model.User | gracely.Error
	const body = type.get(await request.body)
	const authorization = http.Authorization.parse(request.header.authorization)
	const user = http.Authorization.Basic.is(authorization) && users[authorization.user]
	if (!user)
		result = gracely.client.unauthorized()
	else if (!body)
		result = gracely.client.flawedContent(type.flaw(await request.body))
	else
		result = user
	return result
}
router.add("PATCH", "/me", change)
