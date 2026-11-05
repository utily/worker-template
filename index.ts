export default {
	async fetch(request: Request, environment: Environment) {
		request.signal.addEventListener("abort", e =>
			console.log("Request aborted event: ", e, "reason: ", request.signal.reason, "signal: ", request.signal)
		)
		await new Promise(resolve => setTimeout(resolve, 2000))
		// await scheduler.wait(3000)
		return new Response("hi")
	},
}
