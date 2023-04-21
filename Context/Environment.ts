export interface Environment
	extends Record<string, undefined | string | KVNamespace | DurableObjectNamespace | Fetcher> {
	adminSecret?: string
	signingSecret?: string
	store?: KVNamespace
}
