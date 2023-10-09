const TypeDoc = require('typedoc')
const path = require('node:path')

const repoPath = path.join(__dirname, '..', '..', '..')
const mkdocsPath = path.join(repoPath, 'tools', 'docs')
const genPath = path.join(mkdocsPath, 'reference')
const srcPath = path.join(repoPath, 'src')

function reference() {
  const app = new TypeDoc.Application()

  app.options.addReader(new TypeDoc.TSConfigReader())

  app.bootstrap({
    plugin: ['typedoc-plugin-markdown', 'typedoc-plugin-rename-defaults'],
    entryPoints: [path.join(srcPath, 'vizzu-story.d.ts')],
    entryPointStrategy: 'expand',
    tsconfig: path.join(genPath, 'tsconfig.json'),
    name: 'Vizzu-Story',
    hideInPageTOC: true,
    disableSources: true,
    readme: path.join(repoPath, 'docs', 'reference.md')
  })

  const project = app.convert()

  if (project) {
    const outputDir = path.join(genPath, 'tmp')
    return app.generateDocs(project, outputDir)
  }
}

reference()
