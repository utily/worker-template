import { DurableObject } from "cloudflare:workers"

export class Durable extends DurableObject {
	override async fetch(request: Request) {
		console.log("arrived at DO")
		await scheduler.wait(3000)
		console.log("about to return from DO")
		return new Response("hi DO")
	}
}
