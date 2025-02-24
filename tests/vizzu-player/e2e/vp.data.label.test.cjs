const puppeteer = require('puppeteer')
const path = require('path')
const express = require('express')

const testCases = require('../../assets/data-tests/label/index')
const testDataSetPromises = []
testCases.forEach((testCase) => {
	testDataSetPromises.push(import(`../../assets/data-sets/${testCase.name}.mjs`))
})

describe('if slides set', () => {
	let testDataSets

	let server
	let browser

	beforeAll(async () => {
		testDataSets = await Promise.all(testDataSetPromises)

		const app = express()
		app.use('/', express.static(path.join(__dirname, '../../../')))
		server = app.listen(0, () => {})

		browser = await puppeteer.launch({
			headless: 'new',
			args: ['--disable-web-security', '--no-sandbox']
		})
	})

	afterAll(async () => {
		await browser.close()
		server.close()
	})

	// TODO: recheck all slides, not just the first one
	testCases.forEach((testCase, index) => {
		test(`labels should should display the expected values - ${testCase.name}`, async () => {
			const page = await browser.newPage()

			const slides = testDataSets[index].default

			const keyFramesLengths = slides.slides.map((slide) => slide.length)
			const allKeyFrames = keyFramesLengths.reduce((accumulator, currentValue) => {
				return accumulator + currentValue
			}, 0)

			const data = await page.evaluate(
				async (serverPort, name, allKeyFrames) => {
					document.body.innerHTML = '<vizzu-player id="story" controller></vizzu-player>'

					let resolveComplete = null
					const completed = new Promise((resolve) => {
						resolveComplete = resolve
					})

					let completeCounter = 0
					const datas = {}

					function labelDrawHandler(event) {
						// check all slides, recheck first slide
						if (completeCounter < allKeyFrames + 1) {
							if (!datas[completeCounter]) {
								datas[completeCounter] = []
							}
							datas[completeCounter].push(event.detail.text)
						}
					}

					const complete = () => {
						// check all slides, recheck first slide
						if (completeCounter === allKeyFrames + 1) {
							resolveComplete(true)
						}
						if (datas[completeCounter]) datas[completeCounter].sort()
						completeCounter++
					}

					await import(`http://127.0.0.1:${serverPort}/src/vizzu-player.js`)

					const slidesModule = await import(
						`http://127.0.0.1:${serverPort}/tests/assets/data-sets/${name}.mjs`
					)
					const slides = slidesModule.default

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
				testCase.name,
				allKeyFrames
			)

			expect(data).toStrictEqual(testCase.expected)
		})
	})
})
