import * as http from "cloudly-http"
import { Context } from "./Context"
import { router } from "./router"

async function upgrade(_: http.Request, context: Context): Promise<any> {
	const { client, server } = context.upgrade()
	server.json.onOpen = () => {
		console.log("sending")
		server.json.send({ message: "hello world" })
	}
	return client.createResponse()
}

router.add("GET", "/upgrade", upgrade)
