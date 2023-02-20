import * as http from "cloudly-http"
import { Environment } from "../../Environment"
import { Context } from "./Context"
import { router } from "./router"

import "./upgrade"

export class Junction {
	private readonly context: Context
	constructor(state: DurableObjectState, environment: Environment) {
		this.context = new Context(state, environment)
	}
	async fetch(request: Request): Promise<Response> {
		return await http.Response.to(await router.handle(http.Request.from(request), this.context))
	}
}
