const puppeteer = require('puppeteer')
const path = require('path')
const express = require('express')

describe('if imported default Vizzu', () => {
  let server
  let browser

  beforeAll(async () => {
    const app = express()
    app.use('/', express.static(path.join(__dirname, '../../../')))
    server = app.listen(0, () => {})

    browser = await puppeteer.launch({
      headless: 'new',
      args: ['--disable-web-security']
    })
  })

  afterAll(async () => {
    await browser.close()
    server.close()
  })

  test('_setStyle method should exist', async () => {
    const page = await browser.newPage()

    const hasSetStyle = await page.evaluate(async (serverPort) => {
      const VizzuPlayerModule = await import(`http://127.0.0.1:${serverPort}/src/vizzu-player.js`)
      const VizzuPlayer = VizzuPlayerModule.default
      const vp = new VizzuPlayer()

      const VizzuModule = await import(vp.vizzuUrl)
      const Vizzu = VizzuModule.default
      const vizzu = new Vizzu(document.createElement('div'))

      return typeof vizzu._setStyle === 'function'
    }, server.address().port)

    expect(hasSetStyle).toBeTruthy()
  })
})
