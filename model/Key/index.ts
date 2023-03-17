import * as isoly from "isoly"
import * as authly from "authly"
import { isly } from "isly"
import { Creatable as KeyCreatable } from "./Creatable"

export interface Key extends KeyCreatable {
	issuer: Key.Issuer.Name
	issued: isoly.DateTime
	expires: isoly.DateTime
	token: string
}

const transformers: (authly.Property.Transformer | undefined)[] = [
	new authly.Property.Converter({
		issued: {
			forward: value => value,
			backward: value => isoly.DateTime.create(value as number),
		},
		expires: {
			forward: value => value,
			backward: value => isoly.DateTime.create(value as number),
		},
	}),
	new authly.Property.Renamer({
		issuer: "iss",
		realm: "aud",
		issued: "iat",
		expires: "exp",
		subject: "sub",
		organization: "org",
	}),
]

export namespace Key {
	export const type = KeyCreatable.type.extend({
		issuer: Issuer.Name.type,
		issued: isly.string(),
		expires: isly.string(),
		token: isly.string(),
	})
	export const is = type.is
	export const flaw = type.flaw
	export namespace Issuer {
		export function create(issuer: Name, privateKey?: string): Issuer {
			return (
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				(
					privateKey == undefined
						? authly.Issuer.create<Key>(issuer, authly.Algorithm.none())
						: authly.Issuer.create<Key>(issuer, authly.Algorithm.RS256(undefined, privateKey))
				)!.add(...transformers)
			)
		}
		export type Name = typeof Name.values[number]
		export namespace Name {
			export const values = ["utily", "local"] as const
			export const type = isly.string(values)
			export const is = type.is
			export const flaw = type.flaw
		}
	}
	export type Issuer = authly.Issuer<KeyCreatable>
	export type Verifier = authly.Verifier<Key>
	export namespace Verifier {
		const publicKeys: { [system in Issuer.Name]: string | undefined } = {
			utily:
				// create new key
				"",
			local: undefined,
		}
		export function create(issuer: Issuer.Name): Verifier {
			return !publicKeys[issuer]
				? // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				  authly.Verifier.create<Key>(authly.Algorithm.none())!.add(...transformers)
				: // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				  authly.Verifier.create<Key>(authly.Algorithm.RS256(publicKeys[issuer]))!.add(...transformers)
		}
	}

	export type Creatable = KeyCreatable
	export const Creatable = KeyCreatable
}
