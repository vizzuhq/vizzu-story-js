import Vizzu from 'https://cdn.jsdelivr.net/npm/vizzu@latest/dist/vizzu.min.js';

export default class VizzuSlides
{
	constructor(querySelector, slides)
	{
		this.element = document.querySelector(querySelector);
		this.chart = new Vizzu(this.element);
		this.slides = [];

		let seekToEnd = () => {
			setTimeout(() => {
				this.chart.animation.seek("100%");
			}, 0);
		};

		let disableRender = (event) => {
			event.renderingContext.globalAlpha = 0;
		}

		let enableRender = (event) => {
			event.renderingContext.globalAlpha = 1;
		}

		this.initialized = this.chart.initializing;

		this.initialized = this.initialized.then(() => 
		{
			this.chart.on('animation-begin', seekToEnd);
			this.chart.on('background-draw', disableRender);
			this.chart.on('logo-draw', enableRender);
			this.nullSlide = this.chart.store();
		});

		for (let slide of slides)
		{
			let animations = [];
			for (let animation of slide)
			{
				this.initialized = this.initialized
					.then(() => animation(this.chart))
					.then(() => {
						animations.push(this.chart.store());
					});
			}
			this.initialized = this.initialized.then(() => {
				this.slides.push(animations);
			})
		}

		this.initialized = this.initialized
		.then(() => this.chart.animate(this.nullSlide))
		.then(() => {
			this.chart.off('animation-begin', seekToEnd);
			this.chart.off('background-draw', disableRender);
			this.chart.off('logo-draw', enableRender);
		});
	}

	play()
	{
		console.log("play");
		for(let slide of this.slides)
		{
			for(let stage of slide)
			{
				this.chart.animate(stage);
			}
		}
	}
}