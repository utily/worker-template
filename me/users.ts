import { model } from "../model"

export const users: Record<string, (model.User & { password: string; token: string }) | undefined> = {
	"joe@example.com": {
		email: "joe@example.com",
		name: "joe",
		created: ["1981-04-08T00:00:00.000Z", "smith@example.com"],
		password: "1qaz2wsx",
		token: "abc.bdrf.sasd",
	},
}
