import { http } from "cloudly-http"
import { Context } from "../Context"
import { router } from "../router"

export async function proxy(request: http.Request<Body>, context: Context): Promise<http.Response<Body> | any> {
	const response = await fetch("http://example.com/", request.body)
	return { status: response.status, header: http.Response.from(response), body: response }
}
router.add("GET", "/proxy/*", proxy)
router.add("POST", "/proxy/*", proxy)
router.add("PUT", "/proxy/*", proxy)
router.add("DELETE", "/proxy/*", proxy)
router.add("PATCH", "/proxy/*", proxy)
