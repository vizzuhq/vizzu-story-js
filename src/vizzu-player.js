import VizzuController from './vizzu-controller.js'
import AnimationQueue from './AnimationQueue.js'

const LOG_PREFIX = [
	'%cVIZZU%cPLAYER',
	'background: #e2ae30; color: #3a60bf; font-weight: bold',
	'background: #3a60bf; color: #e2ae30;'
]

let Vizzu

class VizzuPlayer extends HTMLElement {
	constructor() {
		super()
		this.attachShadow({ mode: 'open' })
		this.shadowRoot.innerHTML = this._render()

		this._resolveVizzu = null
		this.initializing = new Promise((resolve) => {
			this._resolveVizzu = resolve
		}).then(() => this.vizzu.initializing)

		this._resolvePlayer = null
		this.ready = new Promise((resolve) => {
			this._resolvePlayer = resolve
		})
	}

	async connectedCallback() {
		await this._initVizzu()
		if (!this.hasAttribute('tabindex')) {
			this.setAttribute('tabindex', 0)
			this.tabIndex = 0
		}

		window.addEventListener('hashchange', () => {
			if (this.hashNavigation) {
				const hashSlide = this._slideFromHash(this._slides.length)
				if (this._currentSlide !== hashSlide) {
					this.setSlide(hashSlide)
				}
			}
		})
	}

	get debug() {
		try {
			const debugCookie = document.cookie.split(';').some((c) => c.startsWith('vizzu-debug'))
			return debugCookie || this.hasAttribute('debug') || this.player.debug
		} catch (e) {
			return this.hasAttribute('debug')
		}
	}

	log(...msg) {
		if (this.debug) {
			console.log(...LOG_PREFIX, ...msg)
		}
	}

	get Vizzu() {
		return Vizzu
	}

	get hashNavigation() {
		return this.hasAttribute('hash-navigation')
	}

	get vizzuUrl() {
		if (window.Vizzu) return undefined
		return (
			this.getAttribute('vizzu-url') ||
			'https://cdn.jsdelivr.net/npm/vizzu@0.16/dist/vizzu.min.js'
		)
	}

	async _initVizzu() {
		if (!this.vizzu) {
			Vizzu = window.Vizzu || (await import(this.vizzuUrl)).default
			this._resolveVizzu(Vizzu)
			this.vizzu = new Vizzu(this.vizzuCanvas)
		}
	}

	_slideToAnimparams(slide) {
		if (slide._id) {
			return slide._id
		}

		const animTarget = {}
		if (slide.config) {
			animTarget.config = slide.config
		}
		if (slide.style) {
			animTarget.style = slide.style
		}
		if (slide.data) {
			animTarget.data = slide.data
		}
		if (typeof slide.filter !== 'undefined') {
			if (!animTarget.data) {
				animTarget.data = {}
			}
			animTarget.data.filter = slide.filter
		}

		const animParams = { target: animTarget }
		if (slide.animOptions) {
			animParams.options = slide.animOptions
		}

		return animParams
	}

	async _convertSlides(slides) {
		if (slides?.slides?.length) {
			if (!Array.isArray(slides.slides[0])) {
				slides.slides[0] = [slides.slides[0]]
			}
			const firstSlide = slides.slides[0][0]
			firstSlide.data = firstSlide.data || Object.assign({}, slides.data)
			firstSlide.style = firstSlide.style || slides.style
		}

		await this.initializing
		this.vizzu.on('animation-complete', () => {
			this._update(this._state)
		})
		this.animationQueue = new AnimationQueue(this.vizzu)

		const seekToEnd = () => this._seekToEnd()
		this.vizzu.on('animation-begin', seekToEnd)

		const convertedSlides = []

		let lastFilter = null
		for (const slide of slides.slides) {
			let steps = slide
			if (!Array.isArray(steps)) {
				steps = [steps]
			}

			const chartSteps = convertedSlides.length > 0 ? [convertedSlides?.at(-1)?.at(-1)] : []
			const animParams = steps.map((step) => this._slideToAnimparams(step))

			for (const animParam of animParams) {
				const anim = this.vizzu.animate(animParam.target)
				await anim
				const targetData = {
					target: {
						config: this.vizzu.config,
						style: this.vizzu.getComputedStyle()
					}
				}
				if (animParam.options) {
					targetData.options = animParam.options
				}
				if (
					animParam.target?.data &&
					'filter' in animParam.target?.data &&
					animParam.target.data.filter !== undefined
				) {
					targetData.target.data = { filter: animParam.target.data.filter }
					lastFilter = animParam.target.data.filter
				} else if (targetData.target.filter) {
					targetData.target.data = { filter: animParam.target.data.filter }
				} else if (lastFilter !== undefined) {
					targetData.target.data = { filter: lastFilter }
				}

				chartSteps.push(targetData)
			}
			convertedSlides.push(chartSteps)
		}
		if (convertedSlides.length) {
			await this.vizzu.animate(convertedSlides[this._currentSlide || 0])
		}
		this.vizzu.off('animation-begin', seekToEnd)

		return convertedSlides
	}

	_slideFromHash(length) {
		const hashSlide = parseInt(document.location.hash.substring(1))

		return this._normalizeSlideNumber(hashSlide, length)
	}

	_getStartSlide(length) {
		const startSlide = parseInt(this.getAttribute('start-slide')) || 0

		return this._normalizeSlideNumber(startSlide, length)
	}

	_normalizeSlideNumber(nr, length) {
		if (isNaN(nr)) return null
		if (!nr) return 0
		return nr < 0 ? Math.max(length + nr, 0) : Math.min(nr - 1, length - 1)
	}

	get slides() {
		return this._slides
	}

	set slides(slidesSourceData) {
		const slides = this._recursiveCopy(slidesSourceData)
		let startSlide = this._getStartSlide(slides.slides.length)
		if (this.hashNavigation) {
			const hashSlide = this._slideFromHash(slides.slides.length)
			if (hashSlide !== null) {
				startSlide = hashSlide
			}
		}
		this._currentSlide = startSlide
		this._setSlides(slides)
	}

	_recursiveCopy(obj) {
		if (obj === null) return null
		const clone = Object.assign({}, obj)
		Object.keys(clone).forEach(
			(key) =>
				(clone[key] =
					typeof obj[key] === 'object' ? this._recursiveCopy(obj[key]) : obj[key])
		)
		if (Array.isArray(obj)) {
			clone.length = obj.length
			return Array.from(clone)
		}
		return clone
	}

	async _setSlides(slides) {
		this.setAttribute('initializing', '')
		this._originalSlides = slides
		this._slides = await this._convertSlides(slides)
		this.setSlide(this._currentSlide)
		this.removeAttribute('initializing')
		this._resolvePlayer()
	}

	get vizzuCanvas() {
		return this.shadowRoot.getElementById('vizzu')
	}

	get length() {
		return this._slides?.length || 0
	}

	get currentSlide() {
		return this._currentSlide
	}

	set currentSlide(slide) {
		this.setSlide(slide)
	}

	get slide() {
		return this._slides?.[this._currentSlide]
	}

	get _includeController() {
		return this.hasAttribute('controller')
	}

	_step(step, options = {}) {
		this.animationQueue.enqueue(step, options, {
			currentSlide: this._currentSlide,
			steppType: this.steppType
		})
	}

	async _seekTo(percent) {
		this.vizzu.animation.seek(`${percent}%`)
	}

	async _seekToStart() {
		return this._seekTo(0)
	}

	async _seekToEnd() {
		return this._seekTo(100)
	}

	set seekPosition(percent) {
		this._seekPosition = percent
	}

	get seekPosition() {
		return this._seekPosition
	}

	set animationQueue(queue) {
		this._animationQueue = queue
	}

	get animationQueue() {
		return this._animationQueue
	}

	async setSlide(slide) {
		if (this.length === 0) {
			return
		}

		if (
			this._state.seekPosition &&
			((slide <= 0 && this._currentSlide === 0) ||
				(this._slides.length <= slide && this._currentSlide === this._slides.length - 1) ||
				slide === this._currentSlide)
		) {
			return
		}

		this._update(this._state)

		const actualSlideKey = this._currentSlide || 0
		if (!slide || slide < 0) {
			slide = 0
		} else if (slide >= this.length) {
			slide = this.length - 1
		}
		this._currentSlide = slide
		this.direction = 'normal'
		this.steppType = 'normal'
		if (actualSlideKey - slide === 1) {
			if (actualSlideKey > 0) {
				this.direction = 'reverse'
				const currentSlide = this._slides[actualSlideKey]

				this._step(currentSlide, { position: 1, direction: 'reverse' })
				this.lastAnimation = currentSlide
			}
		} else if (actualSlideKey - slide === -1) {
			const ns = this._slides[slide]
			this._step(ns)
			this.lastAnimation = ns
		} else {
			this.steppType = 'jump'
			const targetSlide = this._slides[slide]
			if (actualSlideKey > slide) {
				this.direction = 'reverse'
			}
			this._step(targetSlide, { duration: 0, regroupStrategy: 'fade', position: 0.99 })

			this.lastAnimation = targetSlide
		}

		this._update(this._state)

		if (this.hashNavigation) {
			document.location.hash = `#${slide + 1}`
		}
	}

	next() {
		return this.setSlide(this.currentSlide + 1)
	}

	previous() {
		return this.setSlide(this.currentSlide - 1)
	}

	toStart() {
		return this.setSlide(0)
	}

	toEnd() {
		return this.setSlide(this.length - 1)
	}

	async seek(percent) {
		this._update(this._state)
		this.log(`seek to ${percent}%, current: ${this._seekPosition}% [${this._currentSlide}]`)
		this.vizzu.animation.seek(`${percent}%`)
		this._update(this._state)
	}

	get _state() {
		return {
			currentSlide: this.currentSlide,
			slide: this.slide,
			seekPosition: this._seekPosition,
			length: this.length
		}
	}

	_update(state) {
		const e = new CustomEvent('update', { detail: state })
		this.dispatchEvent(e)
	}

	get customSpinner() {
		return this.getAttribute('custom-spinner')
	}

	_render() {
		return `
      <style>
        :host {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          --_c: var(--vizzu-color, #333);
          --_bg: var(--vizzu-background-color, #fff);
          background-color: var(--_bg);
        }
        :host(:focus) {
          outline: none;
        }
        :host([initializing]) #vizzu {
          visibility: hidden;
        }
        :host([initializing]) .spinner {
          display: block;
        }
        #vizzucnt {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          max-height: calc(100% - 52px);
          box-sizing: border-box;
          flex: 1;
        }
        #vizzu {
          width: 100%;
          height: 100%;
          flex: 1;
        }
        .spinner {
          display: none;
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          margin: auto;
          width: 80px;
          height: 80px;
        }
        ${
			this.customSpinner
				? `
        .spinner {
          background-image: url(${this.customSpinner});
          background-repeat: no-repeat;
          background-position: center;
          width: auto;
          height: auto;
        }`
				: `
        .spinner:after {
          content: " ";
          display: block;
          width: 64px;
          height: 64px;
          margin: 8px;
          border-radius: 50%;
          border: 6px solid #fff;
          border-color: var(--_c) transparent var(--_c) transparent;
          animation: spin 1.2s linear infinite;
        }`
		}
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      </style>
      <div id="vizzucnt">
        <canvas id="vizzu"></canvas>
        <div class="spinner"></div>
      </div>
      ${
			this._includeController
				? `<vizzu-controller id="controller" slider-update="input"></vizzu-controller>`
				: ''
		}
      `
	}
}

try {
	if (!customElements.get('vizzu-player')) {
		customElements.define('vizzu-player', VizzuPlayer)
	} else {
		console.warn('VizzuPlayer already defined')
	}
} catch (e) {
	console.error('Failed to register custom element: ', e)
}

export default VizzuPlayer
export { VizzuController }
