import { cryptly } from "cryptly"
import { http } from "cloudly-http"
import { Context } from "../Context"
import { router } from "../router"
import { Bitmap } from "./Bitmap"

export async function fetch(request: http.Request, context: Context): Promise<http.Response.Like | any> {
	const bitmap = Bitmap.create()
	for (let index = 0; index < 144; index++)
		bitmap.set([20, 0 + index], [255, 127, 0])
	for (let index = 0; index < 200; index++)
		bitmap.set([0 + index, 40], [0, 127, 255])
	const data = bitmap.export()
	console.log("bytes", data.byteLength)
	console.log("base16", cryptly.Base16.encode(data))
	return { body: data, header: { contentType: "image/bmp" } }
}
router.add("GET", "/image", fetch, http.Middleware.create("identity"))

const body = cryptly.Base16.decode(
	"424d b651 0100 0000 0000 3600 0000 2800 0000 c800 0000 9000 0000 0100 1800".replaceAll(" ", "") +
		"0000".repeat(12) +
		"0202".repeat(21500) +
		"ffff".repeat(200) +
		"0202".repeat(21500)
)
