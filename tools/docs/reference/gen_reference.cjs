const path = require('node:path')

const repoPath = path.join(__dirname, '..', '..', '..')
const mkdocsPath = path.join(repoPath, 'tools', 'docs')
const genPath = path.join(mkdocsPath, 'reference')
const srcPath = path.join(repoPath, 'src')

async function reference() {
	const TypeDoc = await import('typedoc')
	const app = await TypeDoc.Application.bootstrapWithPlugins(
		{
			plugin: ['typedoc-plugin-markdown', 'typedoc-plugin-rename-defaults'],
			entryPoints: [path.join(srcPath, 'vizzu-story.d.ts')],
			entryPointStrategy: 'expand',
			tsconfig: path.join(genPath, 'tsconfig.json'),
			name: 'Vizzu-Story',
			disableSources: true,
			excludePrivate: true,
			readme: path.join(repoPath, 'docs', 'reference.md'),
			theme: 'markdown'
		},
		[new TypeDoc.TSConfigReader()]
	)

	const project = await app.convert()

	if (project) {
		const outputDir = path.join(genPath, 'tmp')
		return app.generateDocs(project, outputDir)
	}
}

reference()
