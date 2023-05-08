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
			forward: (value: isoly.DateTime) => isoly.DateTime.epoch(value, "seconds"),
			backward: (value: number) => isoly.DateTime.create(value),
		},
		expires: {
			forward: (value: isoly.DateTime) => isoly.DateTime.epoch(value, "seconds"),
			backward: (value: number) => isoly.DateTime.create(value),
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
	export type Issuer = authly.Issuer<KeyCreatable>
	export namespace Issuer {
		export function create(issuer: Name, privateKey?: string): Issuer | undefined {
			return (
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				(
					privateKey == "none"
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
	export const type = KeyCreatable.type.extend<Key>({
		issuer: Issuer.Name.type,
		issued: isly.string(),
		expires: isly.string(),
		token: isly.string(),
	})
	export const is = type.is
	export const flaw = type.flaw
	export type Verifier = authly.Verifier<Key>
	export namespace Verifier {
		const publicKeys: { [system in Issuer.Name]: string | undefined } = {
			utily:
				// create new key
				"MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAu1SU1LfVLPHCozMxH2Mo4lgOEePzNm0tRgeLezV6ffAt0gunVTLw7onLRnrq0/IzW7yWR7QkrmBL7jTKEn5u+qKhbwKfBstIs+bMY2Zkp18gnTxKLxoS2tFczGkPLPgizskuemMghRniWaoLcyehkd3qqGElvW/VDL5AaWTg0nLVkjRo9z+40RQzuVaE8AkAFmxZzow3x+VJYKdjykkJ0iT9wCS0DRTXu269V264Vf/3jvredZiKRkgwlL9xNAwxXFg0x/XFw005UWVRIkdgcKWTjpBP2dPwVZ4WWC+9aGVd+Gyn1o0CLelf4rEjGoXbAAEgAqeGUxrcIlbjXfbcmwIDAQAB",
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
