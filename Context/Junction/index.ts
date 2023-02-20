import * as gracely from "gracely"
import * as storage from "cloudly-storage"

export class Junction {
	private constructor(
		private readonly junction: storage.DurableObject.Namespace,
		readonly raw: DurableObjectNamespace
	) {}
	private connect(junction: string): storage.DurableObject.Client {
		return this.junction.open(junction)
	}
	async upgrade(junction: string): Promise<any> {
		const client = this.raw.get(this.raw.idFromName(junction))
		const response = await client.fetch("http://origin/upgrade")
		return response
		// const result = await this.connect(junction).get<unknown>("/upgrade")
		// return result
	}

	static create(junction?: DurableObjectNamespace): Junction | gracely.Error {
		const result = storage.DurableObject.Namespace.open(junction)
		return result && junction
			? new this(result, junction)
			: gracely.server.misconfigured("do", "do missing from configuration")
	}
}
