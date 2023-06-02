import { User } from "./User"

export const users: Record<string, User | undefined> = {
	"joe@example.com": {
		email: "joe@example.com",
		name: "joe",
		created: ["1981-04-08T00:00:00.000Z", "smith@example.com"],
		password: "1qaz2wsx",
	},
}
