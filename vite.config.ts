import { defineConfig } from "vitest/config"

export default defineConfig({
	ssr: { noExternal: ["isly"] },
	test: {
		typecheck: { tsconfig: "./tsconfig.json" },
		coverage: {
			reporter: ["text", "json", "html"],
			enabled: true,
			cleanOnRerun: true,
			thresholds: { statements: 80, branches: 80, functions: 80, lines: 80 }
		},
		globals: true,
		include: ["**/*.spec.[tj]s"],
		testTimeout: 20000,
		isolate: false,
		exclude: ["node_modules", "dist"]
	}
})
