import * as gracely from "gracely"
import * as http from "cloudly-http"
import { Context } from "../Context"
import { router } from "../router"

async function fetch(_: http.Request, context: Context): Promise<any> {
	let result: gracely.Error | unknown
	if (gracely.Error.is(context.junction))
		result = context.junction
	else {
		result = await context.junction.upgrade("me")
	}
	return result
}

router.add("GET", "/upgrade", fetch)
