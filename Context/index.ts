import * as gracely from "gracely"
import { http } from "cloudly-http"
import * as storage from "cloudly-storage"
import { model } from "../model"
import { Environment as ContextEnvironment } from "./Environment"
import { Users } from "./Users"

export class Context {
	#issuer?: model.Key.Issuer | gracely.Error
	get issuer(): model.Key.Issuer | gracely.Error {
		return (this.#issuer ??=
			model.Key.Issuer.create("local", this.environment.signingSecret) ??
			gracely.server.misconfigured("signingSecret", "Private key for signing API keys."))
	}
	#verifier?: model.Key.Verifier
	get verifier(): model.Key.Verifier {
		return (this.#verifier ??= model.Key.Verifier.create("local"))
	}
	#store?: storage.KeyValueStore | gracely.Error
	private get store(): storage.KeyValueStore | gracely.Error {
		return (this.#store ??= this.environment.store
			? storage.KeyValueStore.open(this.environment.store)
			: gracely.server.misconfigured("store", "Key Value Namespace missing."))
	}
	#users?: Users | gracely.Error
	get users(): Users | gracely.Error {
		return (this.#users ??= gracely.Error.is(this.store) ? this.store : Users.create(this.store))
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
