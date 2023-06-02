import * as gracely from "gracely"
import { http } from "cloudly-http"
import { Context } from "../Context"
import { users } from "../Context/Users/users"
import { model } from "../model"
import { User } from "../model/User"
import { router } from "../router"

export async function fetch(request: http.Request, context: Context): Promise<model.User | gracely.Error> {
	let result: model.User | gracely.Error
	const authorization = http.Authorization.parse(request.header.authorization)
	if (!http.Authorization.Basic.is(authorization))
		result = gracely.client.unauthorized()
	else {
		const user = users[authorization.user]
		result =
			user && user?.password == authorization.password
				? User.type.get(user) ?? gracely.client.unauthorized()
				: gracely.client.unauthorized()
	}
	return result
}
router.add("GET", "/me", fetch)
