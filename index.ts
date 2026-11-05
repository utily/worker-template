export default {
	async fetch(request: Request, environment: Environment) {
		request.signal.addEventListener("abort", e =>
			console.log("Request aborted event: ", e, "reason: ", request.signal.reason, "signal: ", request.signal)
		)
		// await new Promise(resolve => setTimeout(resolve, 2000))
		console.log("going to DO")
		const response = await environment.durableNamespace
			.getByName("asdf")
			.fetch(new Request("https://durable.object/thing", { method: "POST", body: "some data" }))
		console.log("returned from DO")
		const body = await response.text()
		console.log({ ...response, body })

		// await scheduler.wait(3000)
		return new Response("hi")
	},
}
export { Durable } from "./Durable"
