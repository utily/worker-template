import { Context } from "./Context"
import { router } from "./router"

import "./item"
import "./version"

export default {
	async fetch(request: Request, environment: Environment) {
		return router.handle(request, new Context(environment))
	},
}
