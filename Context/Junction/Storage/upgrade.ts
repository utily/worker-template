import * as http from "cloudly-http"
import { Context } from "./Context"
import { router } from "./router"

async function upgrade(_: http.Request, context: Context): Promise<any> {
	const { client, server } = context.upgrade()
	server.json.onOpen = () => {
		server.json.send({ message: "server first message" })
	}
	server.json.onMessage = message => server.json.send({ ...message, message: "echo: " + message.message })
	return client.createResponse()
}

router.add("GET", "/upgrade", upgrade)
