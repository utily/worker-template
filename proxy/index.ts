import { http } from "cloudly-http"
import { Context } from "../Context"
import { router } from "../router"

export async function proxy(request: http.Request<Body>, context: Context): Promise<http.Response<Body> | any> {
	const response = await fetch(`http://example.com/${request.url.pathname}`, request.body)
	return { status: response.status, header: http.Response.from(response), body: await response.text() }
}
router.add("GET", "/proxy/*", proxy, http.Middleware.create("identity"))
router.add("POST", "/proxy/*", proxy, http.Middleware.create("identity"))
router.add("PUT", "/proxy/*", proxy, http.Middleware.create("identity"))
router.add("DELETE", "/proxy/*", proxy, http.Middleware.create("identity"))
router.add("PATCH", "/proxy/*", proxy, http.Middleware.create("identity"))
