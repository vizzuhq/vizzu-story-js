import { EslintJavaScriptConfig, EslintTypeScriptConfig } from '@vizzu/eslint-config'

export default [
	...EslintTypeScriptConfig,
	...EslintJavaScriptConfig,
    {
		ignores: [
			'**/node_modules/**',
			'**/build/**',
			'**/dist/**',
			'**/.vscode/**',
			'**/*.d.ts'
		]
	}
]
