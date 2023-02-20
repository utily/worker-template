import { Context } from "./Context"
import { Environment } from "./Context/Environment"

import "./item"
import "./version"
import "./socket"

export { Junction } from "./Context/Junction/Storage"

export default {
	async fetch(request: Request, environment: Environment) {
		return await Context.handle(request, environment)
	},
}
