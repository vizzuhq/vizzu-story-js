const config = {
	rootDir: '../../../',
	collectCoverage: true,
	coverageProvider: 'v8',
	coverageDirectory: '.coverage',
	coverageThreshold: {
		global: {
			branches: 0,
			functions: 0,
			lines: 0,
			statements: 0
		}
	},
	coveragePathIgnorePatterns: ['assets', 'node_modules'],
	testEnvironment: 'jsdom',
	testMatch: ['**/vizzu-player/unit/*.test.js'],
	transform: {},
	moduleNameMapper: {
		'https://cdn.jsdelivr.net/npm/vizzu@0.16/dist/vizzu.min.js':
			'../tests/assets/mocks/vizzu-cdn.js'
	}
}

export default config
