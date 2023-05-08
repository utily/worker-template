import * as gracely from "gracely"
import { http } from "cloudly-http"
import { Context } from "../Context"
import { model } from "../model"
import { router } from "../router"
import { users } from "./users"

export async function fetch(request: http.Request, context: Context): Promise<http.Response.Like | any> {
	let result: (model.User & { token: string }) | gracely.Error
	const authorization = http.Authorization.parse(request.header.authorization)
	if (!http.Authorization.Basic.is(authorization))
		result = gracely.client.unauthorized()
	else {
		const user = users[authorization.user]
		result =
			user && user?.password == authorization.password
				? (({ password, ...user }) => user)(user)
				: gracely.client.unauthorized()
	}
	return result
}
router.add("GET", "/me", fetch)
