import { Context } from "./Context"
import { router } from "./router"

import "./item"
import "./version"

export default {
	async fetch(request: Request, environment: Environment) {
		request.signal.addEventListener("abort", e =>
			console.log("Request aborted event: ", e, "reason: ", request.signal.reason, "signal: ", request.signal)
		)
		await scheduler.wait(3000)
		return router.handle(request, new Context(environment))
	},
}
