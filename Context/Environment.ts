export interface Environment
	extends Record<string, undefined | string | KVNamespace | DurableObjectNamespace | Fetcher> {
	adminSecret?: string
	store?: KVNamespace
}
