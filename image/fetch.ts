import { cryptly } from "cryptly"
import { http } from "cloudly-http"
import { Context } from "../Context"
import { router } from "../router"

export async function fetch(request: http.Request, context: Context): Promise<http.Response.Like | any> {
	console.log("bytes", body.byteLength)
	console.log("base16", cryptly.Base16.encode(body))
	return { body: body, header: { contentType: "image/bmp" } }
}
router.add("GET", "/image", fetch, http.Middleware.create("identity"))

const body = cryptly.Base16.decode(
	"424d b651 0100 0000 0000 3600 0000 2800 0000 c800 0000 9000 0000 0100 1800".replaceAll(" ", "") +
		"0000".repeat(12) +
		"0202".repeat(21500) +
		"ffff".repeat(200) +
		"0202".repeat(21500)
)
