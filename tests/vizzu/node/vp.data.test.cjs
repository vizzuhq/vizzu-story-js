const puppeteer = require('puppeteer')
const path = require('path')
const express = require('express')
const cases = require('../../assets/data-cases/index')

describe('vizzu chart data', () => {
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

  test.each(cases)(`slide data test with $name`, async ({ name, slides, excepted }) => {
    const page = await browser.newPage()

    const keyFramesLengths = slides.slides.map((slide) => slide.length)
    const allKeyFrames = keyFramesLengths.reduce((accumulator, currentValue) => {
      return accumulator + currentValue
    }, 0)

    const data = await page.evaluate(
      async (serverPort, slides, allKeyFrames) => {
        document.body.innerHTML = '<vizzu-player id="story" controller></vizzu-player>'

        let resolveComplete = null
        const completed = new Promise((resolve) => {
          resolveComplete = resolve
        })

        let completeCounter = 0
        const datas = []
        function labelDrawHandler(event) {
          if (completeCounter < allKeyFrames) {
            datas.push(event.data.text)
          }
        }

        const complete = () => {
          if (completeCounter === allKeyFrames) {
            resolveComplete(true)
          }
          completeCounter++
        }

        await import(`http://127.0.0.1:${serverPort}/src/vizzu-player.js`)
        const vp = document.getElementById('story')
        window.vp = vp
        vp.initializing.then(async (chart) => {
          vp.style.cssText = 'width: 100%;height: 100%;'
          chart.feature('tooltip', true)
          chart.on('plot-marker-label-draw', labelDrawHandler)
          chart.on('animation-complete', complete)
          vp.slides = slides
        })

        await completed

        return datas
      },
      server.address().port,
      slides,
      allKeyFrames
    )

    expect(data).toStrictEqual(excepted)
  })
})
