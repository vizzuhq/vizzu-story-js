import Vizzu from 'https://cdn.jsdelivr.net/npm/vizzu@latest/dist/vizzu.min.js';

export default class VizzuSlides
{
	constructor(wrapperElementSelector, slides)
	{
		
		let vizzuCanvasId = "vizzuCanvas";
		
		let wrapperElement = undefined;
		if(typeof wrapperElementSelector === 'string')
		{
			try {
				wrapperElement = document.querySelector(wrapperElementSelector);
			} catch (error) {
				console.error("Controls Error: Could not find parent element:", error);
				return null;
			}
		}
		
		wrapperElement.setAttribute('class', 'has-vizzu-controls');
		var vizzuCanvas = document.createElement('canvas');
		vizzuCanvas.id = vizzuCanvasId;
		wrapperElement.appendChild(vizzuCanvas);

		let controlHTML = '';
		controlHTML += '<div class="vizzu-navcontainer">'
			+'<div class="vizzu-navleft"><span class="vizzu-navstatustext"><span data-vizzu-currentslide></span>/<span data-vizzu-totalslides></span></div>'
			+'<div class="vizzu-navmiddle">'
				+'<button data-vizzu-navbarbtn-first type="button" class="vizzu-navbutton vizzu-navbar-button-first">'
					+'<span class="vizzu-navtooltip">First</span>'
					+'<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="11" height="11" viewBox="0 0 11 11">'
						+'<path id="first-pass" d="M1.467,5.867 L1.467,5.133 L11.000,0.000 L11.000,2.200 L11.000,8.800 L11.000,11.000 L1.467,5.867 zM0.000,11.000 C0.000,11.000 0.000,2.019 0.000,-0.000 C0.000,-0.000 1.467,-0.000 1.467,-0.000 L1.467,11.000 L0.000,11.000 z" fill="#C6C6C6" />'
					+'</svg>'
				+'</button>'
				+'<button data-vizzu-navbarbtn-prev class="vizzu-navbutton vizzu-navbar-button-prev">'
					+'<span class="vizzu-navtooltip">Previous</span>'
					+'<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="13" height="15" viewBox="0 0 13 15">'
						+'<path id="play_pass" d="M13.000,15.000 L-0.000,8.000 L-0.000,7.000 L13.000,-0.000 L13.000,15.000 z" fill="#A2A2A2" />'
					+'</svg>'
				+'</button>'
				+'<div class="vizzu-sliderWrapper">'
				+'</div>'
				+'<button data-vizzu-navbarbtn-next class="vizzu-navbutton vizzu-navbar-button-next">'
						+'<span class="vizzu-navtooltip">Next</span>'
						+'<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="13" height="15" viewBox="0 0 13 15">'
							+'<path id="nextBtn" d="M-0.000,15.000 L13.000,8.000 L13.000,7.000 L-0.000,-0.000 L-0.000,15.000 z" fill="#A2A2A2" />'
						+'</svg>'
				+'</button>'
				+'<button data-vizzu-navbarbtn-last type="button" class="vizzu-navbutton vizzu-navbar-button-last">'
					+'<span class="vizzu-navtooltip">Last</span>'
					+'<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="11" height="11" viewBox="0 0 11 11">'
						+'<path id="first-pass" d="M9.533,5.133 L-0.000,-0.000 L-0.000,2.200 L-0.000,8.800 L-0.000,11.000 L9.533,5.867 L9.533,5.133 zM11.000,-0.000 C11.000,-0.000 9.533,-0.000 9.533,-0.000 C9.533,11.000 9.533,11.000 9.533,11.000 L11.000,11.000 C11.000,11.000 11.000,2.019 11.000,-0.000 z" fill="#C6C6C6" />'
					+'</svg>'
				+'</button>'
			+'</div>'
			+'<div class="vizzu-navright">'
				+'<button class="vizzu-navbutton vizzu-navbar-button-fullscreen">'
					+'<span class="vizzu-fullscreentooltip">Fullscreen</span>'
					+'<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="15" height="15" viewBox="0 0 15 15">'
						+'<path id="fullscreen_pass" d="M9.000,12.000 L12.000,12.000 L12.000,9.000 L15.000,9.000 L15.000,15.000 L12.000,15.000 L9.000,15.000 L9.000,12.000 zM9.000,-0.000 L15.000,-0.000 L15.000,6.000 L12.000,6.000 L12.000,3.000 L9.000,3.000 L9.000,-0.000 zM3.000,9.000 L3.000,12.000 L6.000,12.000 L6.000,15.000 L-0.000,15.000 L-0.000,9.000 L3.000,9.000 zM-0.000,-0.000 L6.000,-0.000 L6.000,3.000 L3.000,3.000 L3.000,6.000 L-0.000,6.000 L-0.000,-0.000 z" fill="#A2A2A2" />'
					+'</svg>'
				+'</button>'
			+'</div>'
		+'</div>';

		this.nextSlide = function()
		{
			this.animDirection = 'forward';
			let nextSlideNum = (this.currentAnimation.slideNum +1);
			if (nextSlideNum >= this.slides.length)
			{
				nextSlideNum = this.slides.length -1;
			}
			this.seekToEnd().then((chart) => {
				
				this.playAnim(nextSlideNum, 0, false);
			});
		}

		this.prevSlide = function()
		{
			this.animDirection = 'prev';
			if(this.currentAnimation.stageNum == 0)
			{
				let prevSlideNum = (this.currentAnimation.slideNum -1);
				if (prevSlideNum < 0)
				{
					prevSlideNum = 0;
				}
				this.seekToEnd().then((chart) => {
					console.log("prevSlide => Calling animState width prevSlideNum: ", prevSlideNum, this.slides[prevSlideNum].length-1, this.slides[prevSlideNum]);
					this.playAnim(prevSlideNum, (this.slides[prevSlideNum].length-1), true);
				});
			} else
			{
				this.seekToEnd().then((chart) => {
					this.playAnim(this.currentAnimation.slideNum, this.currentAnimation.stageNum-1, false);
				});
			}
			
		}

		this.lastSlide = function()
		{
			this.animDirection = 'forward';

			this.seekToEnd().then((chart) => {
				this.animPlaying = true;
				this.anim = this.chart.animate(this.nullSlide).then((chart) => {
					this.playAnim(this.slides.length -1, 0, false);
				});
				return chart;
			});
		}

		this.firstSlide = function()
		{
			this.animDirection = 'forward';

			this.seekToEnd().then((chart) => {
				this.animPlaying = true;
				this.anim = this.chart.animate(this.nullSlide).then((chart) => {
					this.playAnim(0, 0, false);
				});
				return chart;
			});
		}
		
		wrapperElement.insertAdjacentHTML("beforeend", controlHTML);
		this.chart = new Vizzu(vizzuCanvasId);
		this.anim = null;
		this.backward = false;
		this.playingStage = 0;
		this.slides = [];
		
		this.animDirection = "forward";
		this.currentAnimation = {};
		this.currentAnimation.slideNum = 0;
		this.currentAnimation.stageNum = 0;

		this.switchedSlide = false;
		this.firstSlideLoaded = false;
		this.sliding = false;
		this.switchingAnim = false;
		
		const event = new Event('build');
		
		this.seekToEnd = () => {
			return new Promise((resolve) => setTimeout(() => {
				this.anim.seek('100%');
				resolve(this.chart);
			}, 0));
		};

		// let disableRender = (event) => {
		// 	event.renderingContext.globalAlpha = 0;
		// }

		// let enableRender = (event) => {
		// 	event.renderingContext.globalAlpha = 1;
		// }

		let animationComplete = (event) => {
			console.log("Anim complete", event);
		}

		this.slideIsAnimating = false;
		let toggleSlideControls = (state) =>
		{
			console.log("toggleSlideControls", state);
			this.slideIsAnimating = state;
			if(this.slideIsAnimating)
			{
				let btnArr = document.querySelectorAll('.vizzu-navbutton');
				btnArr.forEach(function(btn) {
					//if the button is the fullscreen button, continue
					if(btn.classList.contains('vizzu-navbar-button-fullscreen')) { return; }
					btn.setAttribute('disabled', 'disabled');
					btn.classList.add("disabled-navbtn");
					btn.classList.remove("vizzu-navbutton");
				});
			} else
			{
				let btnArr = document.querySelectorAll('.disabled-navbtn');
				btnArr.forEach(function(btn) {
					//if the button is the fullscreen button, continue
					if(btn.classList.contains('vizzu-navbar-button-fullscreen')) { return; }
					btn.removeAttribute('disabled');
					btn.classList.remove("disabled-navbtn");
					btn.classList.add("vizzu-navbutton");
				});
			}
		}

		let updateSlider = (event) => {
			if(this.sliding == false)
			{
				//console.log("updateSlider", (this._sliderMAXVAL / this.slides[this.currentAnimation.slideNum].length));
				let chunk = (this._sliderMAXVAL / this.slides[this.currentAnimation.slideNum].length);
				document.querySelector("[data-vizzu-slider]").value = (this.currentAnimation.stageNum * chunk) + (event.data.progress * chunk);
			}
		}
		
		document.querySelector("[data-vizzu-navbarbtn-next]").addEventListener("click", () => {
			if(this.slideIsAnimating) return;
			toggleSlideControls(true);
			this.anim.then(() => {
				this.nextSlide();
			});
		});

		document.querySelector("[data-vizzu-navbarbtn-prev]").addEventListener("click", () => {
			if(this.slideIsAnimating) return;
			toggleSlideControls(true);

			this.anim.then(() => {
				this.prevSlide();
			});
		});

		document.querySelector("[data-vizzu-navbarbtn-last]").addEventListener("click", () => {
			if(this.slideIsAnimating) return;
			toggleSlideControls(true);

			this.anim.then(() => {
				this.lastSlide();
			});
		});

		document.querySelector("[data-vizzu-navbarbtn-first]").addEventListener("click", () => {
			if(this.slideIsAnimating) return;
			toggleSlideControls(true);

			this.anim.then(() => {
				this.firstSlide();
			});
		});


		document.addEventListener("keydown", (event) => {
			console.log(event.key);
			if(event.key == 'ArrowLeft' || event.key == 'PageUp')
			{
				document.querySelector("[data-vizzu-navbarbtn-prev]").click();
				event.preventDefault();

			} else if(event.key == 'ArrowRight' || event.key == 'PageDown')
			{
				document.querySelector("[data-vizzu-navbarbtn-next]").click();
				event.preventDefault();


			} else if(event.key == 'End')
			{
				document.querySelector("[data-vizzu-navbarbtn-last]").click();
				event.preventDefault();

			} else if(event.key == 'Home')
			{
				document.querySelector("[data-vizzu-navbarbtn-first]").click();
				event.preventDefault();

			}
		});

		document.querySelector(".vizzu-navbar-button-fullscreen").addEventListener("click", function() {
			console.log("webgl fs click");
			if (document.fullscreenElement) {
				document.exitFullscreen();
			} else {
				if (wrapperElement.requestFullscreen) {
					wrapperElement.requestFullscreen();
				  }
				  else if (wrapperElement.msRequestFullscreen) {
					wrapperElement.msRequestFullscreen();
				  }
				  else if (wrapperElement.mozRequestFullScreen) {
					wrapperElement.mozRequestFullScreen();
				  }
				  else if (wrapperElement.webkitRequestFullscreen) {
					wrapperElement.webkitRequestFullscreen();
				  } else {
					console.log("Fullscreen is not supported");
				  }
			}
		});
	

		this.initialized = this.chart.initializing;
		this.anim = this.initialized.then(() => 
		{
			this.chart.container.style.opacity = 0;
			this.chart.on('animation-begin', this.seekToEnd);
			//this.chart.on('background-draw', disableRender);
			//this.chart.on('logo-draw', enableRender);

			console.log(this.chart.container);
			this.chart.container.addEventListener('slide-complete', function (e) {
				console.log("Slide-Complete event");
				toggleSlideControls(false);
			}, false);
			this.chart.on('animation-complete', animationComplete);
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

		document.querySelector("[data-vizzu-currentslide]").innerText = "1";
		document.querySelector("[data-vizzu-totalslides]").innerText = slides.length;
		this.initialized = this.initialized
		.then(() => {
			this.anim =this.chart.animate(this.nullSlide)
		})
		.then(() => { 
			this.chart.off('animation-begin', this.seekToEnd);
			//this.chart.off('background-draw', disableRender);
			//this.chart.off('logo-draw', enableRender);
			//this.chart.on('update', updateSlider)
		}).then(() => {
			
		});
	}

	seekTo(progress)
	{
		return new Promise((resolve) => setTimeout(() => {
			let anim = this.chart.animation;
			anim.seek(progress);
			resolve(this.chart.animation);
		}, 0));
	}

	updateStageNum(stage)
	{
		for(let i = 0; i < this.slides.length; i++)
		{
			for(let k = 0; k < this.slides[i].length; k++)
			{
				if(this.slides[i][k] == stage)
				{
					this.currentAnimation.slideNum = i;
					document.querySelector("[data-vizzu-currentslide]").innerText = (i+1);
					
					this.currentAnimation.stageNum = k;
					return;
				}
			}
		}
	}

	getAnimation(slideNum, stageNum)
	{
		return this.slides[slideNum][stageNum];	
	}

	playAnim(slideNum, stageNum, firstOnly = false, afterUpdate = false)
	{
		console.log("playAnim:", slideNum, stageNum, firstOnly, afterUpdate);
		if(slideNum == 0)
		{
			//hide prev and first buttons
			document.querySelector("[data-vizzu-navbarbtn-prev]").classList.add("vizzu-hidden");
			document.querySelector("[data-vizzu-navbarbtn-prev]").disabled = true;
			document.querySelector("[data-vizzu-navbarbtn-first]").classList.add("vizzu-hidden");
			document.querySelector("[data-vizzu-navbarbtn-first]").disabled = true;
		} else
		{
			document.querySelector("[data-vizzu-navbarbtn-prev]").classList.remove("vizzu-hidden");
			document.querySelector("[data-vizzu-navbarbtn-prev]").disabled = false;
			document.querySelector("[data-vizzu-navbarbtn-first]").classList.remove("vizzu-hidden");
			document.querySelector("[data-vizzu-navbarbtn-first]").disabled = false;
		}

		if(slideNum == this.slides.length - 1)
		{
			//hide next and last buttons
			document.querySelector("[data-vizzu-navbarbtn-next]").classList.add("vizzu-hidden");
			document.querySelector("[data-vizzu-navbarbtn-next]").disabled = true;
			document.querySelector("[data-vizzu-navbarbtn-last]").classList.add("vizzu-hidden");
			document.querySelector("[data-vizzu-navbarbtn-last]").disabled = true;
		} else
		{
			document.querySelector("[data-vizzu-navbarbtn-next]").classList.remove("vizzu-hidden");
			document.querySelector("[data-vizzu-navbarbtn-next]").disabled = false;
			document.querySelector("[data-vizzu-navbarbtn-last]").classList.remove("vizzu-hidden");
			document.querySelector("[data-vizzu-navbarbtn-last]").disabled = false;
		}

		new Promise((resolve) => setTimeout(() => {
				if(!this.firstSlideLoaded)
				{
					this.anim = this.chart.animate(this.nullSlide).then((chart) => {
						this.chart.container.style.opacity = 1;
						this.firstSlideLoaded = true;
						this.playAnim(slideNum, stageNum, false);
					});
				} else
				{
					let animStage = this.getAnimation(slideNum, stageNum);
					console.log("playAnim => slide:", this.slides, slideNum, stageNum);

					if(!afterUpdate) { this.updateStageNum(animStage); }
					
					if(this.animDirection == "forward")
					{
						this.anim = this.chart.animate(animStage).then((chart) => {
							if(afterUpdate) { this.updateStageNum(animStage); }
							
							
							if(!firstOnly) {
								let nextStageNum = (this.currentAnimation.stageNum +1);
								if (nextStageNum < this.slides[this.currentAnimation.slideNum].length)
								{
									this.playAnim(this.currentAnimation.slideNum, nextStageNum);
								} else
								{
									this.anim.then((chart) => {
										const event = new Event('slide-complete');
										this.chart.container.dispatchEvent(event);
									});
								}
							}
							
							return chart;
						});
					} else
					{
						console.log("Animating with direction: ", this.animDirection);
						this.anim = this.chart.animate(animStage).reverse().then((chart) => {
							if(afterUpdate) { this.updateStageNum(animStage); }
							
							if(!firstOnly) {
								
								let prevStageNum = (this.currentAnimation.stageNum -1);
								console.log("stageNums: ", this.currentAnimation.stageNum, prevStageNum);
								console.log("not FirstOnly", prevStageNum);
								if (prevStageNum > 0)
								{
									this.playAnim(this.currentAnimation.slideNum, prevStageNum);
								} else
								{
									console.log("playAnim => prevStageNum is < 0: ", prevStageNum,);
									
									let prevSlide = slideNum - 1;
									if(prevSlide < 0) { prevSlide = 0; }
									let prevStage = this.slides[prevSlide].length - 1;
									if(prevStage < 0) { prevStage = 0; }
									this.playAnim(prevSlide, prevStage, true).then(() => {
										const event = new Event('slide-complete');
										this.chart.container.dispatchEvent(event);
									});
								}
							} else
							{
								this.anim.then((chart) => {
									const event = new Event('slide-complete');
									this.chart.container.dispatchEvent(event);
									return chart;
								});
							}
							
							return chart;
						});
	
						
					}
				}
			resolve(this.chart);
		}, 0));
	}

	

	play()
	{

		for(let slide of this.slides)
		{
			for(let stage of slide)
			{
				
				this.anim = this.chart.animate(stage).then((chart) => {
					this.updateStageNum(stage);
					return chart;
				});
			}
		}
	}

}