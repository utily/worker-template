import { DurableObject } from "cloudflare:workers"

export class Durable extends DurableObject {
	override async fetch(request: Request) {
		return new Response("hi DO")
	}
}
