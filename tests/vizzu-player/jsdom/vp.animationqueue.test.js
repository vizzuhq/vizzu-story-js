import { zeroSlide } from '../../assets/slides/zero-slide.js'
import { slideWithMoreSteps } from '../../assets/slides/one-slide-more-steps.js'

import { waitForSlidesToBeSet, waitForAnimationEnd } from '../../assets/slides/asset-functions.js'

import VizzuPlayer from '../../../src/vizzu-player.js'

describe('if animationQueue is called', () => {
	const shouldBeEmpty = 'getter should return an empty the queue'
	const shouldBe = ' should return'

	let slides
	let vp

	beforeEach(() => {
		vp = new VizzuPlayer()
		slides = { slides: [] }
		for (let i = 0; i < 6; i++) {
			slides.slides.push(...slideWithMoreSteps.input.slides)
		}
	})

	describe('queue is empty with zero slide', () => {
		test(`${shouldBeEmpty}`, () => {
			const vp = new VizzuPlayer()
			vp.slides = zeroSlide.input
			return vp.connectedCallback().then(() => {
				return waitForSlidesToBeSet(vp, 5000).then(() => {
					const isEmpty = vp.animationQueue.isEmpty()
					expect(isEmpty).toStrictEqual(true)
				})
			})
		})
	})

	describe('queue the slide counter after the next button', () => {
		test(`just one, ${shouldBe} 1`, () => {
			vp.slides = slides
			return vp.connectedCallback().then(() => {
				return waitForSlidesToBeSet(vp, 5000).then(() => {
					vp.animationQueue.abort()
					vp.next()
					return waitForAnimationEnd(vp, 5000).then(async () => {
						const currentSlide = vp.animationQueue.getParameter('currentSlide')
						expect(currentSlide).toStrictEqual(1)
					})
				})
			})
		})

		test(`jump to third slide, ${shouldBe} 2`, () => {
			vp.slides = slides
			return vp.connectedCallback().then(() => {
				return waitForSlidesToBeSet(vp, 5000).then(() => {
					vp.animationQueue.abort()
					vp.setSlide(2)
					return waitForAnimationEnd(vp, 5000).then(async () => {
						const currentSlide = vp.animationQueue.getParameter('currentSlide')
						expect(currentSlide).toStrictEqual(2)
					})
				})
			})
		})
	})
	describe('queue abort', () => {
		test(`after is empty`, () => {
			const vp = new VizzuPlayer()
			vp.slides = slides
			return vp.connectedCallback().then(() => {
				return waitForSlidesToBeSet(vp, 5000).then(() => {
					vp.next()
					vp.animationQueue.abort()
					const isEmpty = vp.animationQueue.isEmpty()
					expect(isEmpty).toStrictEqual(true)
				})
			})
		})
	})

	describe('queue is paused', () => {
		it(`after is paused and not empty`, () => {
			const vp = new VizzuPlayer()
			vp.slides = slides
			return vp.connectedCallback().then(() => {
				return waitForSlidesToBeSet(vp, 5000).then(() => {
					vp.next()
					vp.animationQueue.pause()
					const isEmpty = vp.animationQueue.isEmpty()
					expect(vp.animationQueue.isPaused()).toStrictEqual(true)
					expect(isEmpty).toStrictEqual(false)
				})
			})
		})
	})
})
