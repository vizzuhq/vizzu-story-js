const puppeteer = require('puppeteer')
const path = require('path')
const express = require('express')
const { excepted } = require('../../assets/data-cases/basic')


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

  test('slide data test', async () => {
    const page = await browser.newPage()

    const vizzuPlayerData = {
      data: {
        series: [
          {
            name: 'Foo',
            values: ['Alice', 'Bob', 'Ted']
          },
          {
            name: 'Bar',
            values: [15, 32, 12]
          },
          {
            name: 'Baz',
            values: [5, 3, 2]
          }
        ]
      },
      slides: [
        [
          {
            config: {
              x: 'Foo',
              y: 'Bar',
              label: 'Bar'
            }
          }
        ],
        [
          {
            config: {
              color: 'Foo',
              x: 'Baz',
              label: 'Baz',
              geometry: 'circle'
            }
          }
        ]
      ]
    }

    const excepted = '["15","32","12","5","3","2"]'

    const keyFramesLengths = vizzuPlayerData.slides.map((slide) => slide.length)
    const allKeyFrames = keyFramesLengths.reduce((accumulator, currentValue) => {
      return accumulator + currentValue
    }, 0)

    const data = await page.evaluate(async (serverPort, vizzuPlayerData, allKeyFrames) => {
      document.body.innerHTML = '<vizzu-player id="story" controller></vizzu-player>'

      let resolveComplete = null
      const completed = new Promise((resolve) => {
        resolveComplete = resolve
      })

      let completeCounter = 0
      let datas = []
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

      const VizzuPlayerModule = await import(`http://127.0.0.1:${serverPort}/src/vizzu-player.js`)
      const VizzuPlayer = VizzuPlayerModule.default
      const vp = document.getElementById('story')
      window.vp = vp
      vp.initializing.then(async (chart) => {
        vp.style.cssText = 'width: 100%;height: 100%;'
        chart.feature('tooltip', true)
        chart.on('plot-marker-label-draw', labelDrawHandler)
        chart.on('animation-complete', complete)
        vp.slides = vizzuPlayerData;
      })

      await completed

      return datas
    }, server.address().port, vizzuPlayerData, allKeyFrames)

    expect(JSON.stringify(data)).toStrictEqual(excepted)
  })
})
