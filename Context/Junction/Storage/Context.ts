import * as http from "cloudly-http"
import { Environment } from "../../Environment"

export class Context {
	private connections = new Set<http.Socket.Factory>()
	constructor(private readonly state: DurableObjectState, private readonly environment: Environment) {}
	upgrade(): { client: http.Socket.Factory; server: http.Socket.Factory } {
		const [client, server] = Object.values(new WebSocketPair())
		server.accept()
		const result = { client: new http.Socket.Factory(client), server: new http.Socket.Factory(server) }
		result.server.json.onClose = () => {
			this.connections.delete(result.server)
		}
		this.connections.add(result.server)
		return result
	}
}
