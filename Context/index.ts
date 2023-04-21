import { http } from "cloudly-http"
import { Environment as ContextEnvironment } from "./Environment"
import { model } from "../model"
import * as gracely from "gracely"

export class Context {
	#issuer?: model.Key.Issuer | gracely.Error
	get issuer(): model.Key.Issuer | gracely.Error {
		return this.#issuer ??= model.Key.Issuer.create("local", this.environment.signingSecret) ?? gracely.server.misconfigured("signingSecret", "Private key for signing API keys.")
	}
	#verifier?: model.Key.Verifier
	get verifier(): model.Key.Verifier {
		return this.#verifier ??= model.Key.Verifier.create("local")
	}
	constructor(public readonly environment: Context.Environment) {}
	async authenticate(request: http.Request): Promise<"admin" | model.Key | undefined> {
		return this.environment.adminSecret && request.header.authorization == `Basic ${this.environment.adminSecret}`
			? "admin"
			: await this.verifier.authenticate(request.header.authorization)
	}
}
export namespace Context {
	export type Environment = ContextEnvironment
}
