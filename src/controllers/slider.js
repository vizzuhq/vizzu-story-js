const LOG_PREFIX = [
  "%cVIZZU%cSLIDER",
  "background: #e2ae30; color: #3a60bf; font-weight: bold",
  "background: #000000; color: #fafafa;",
];

let pausedState = null;
class Slider extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = this._render();

    this.slider = this.shadowRoot.getElementById("slider");

    // Set up slider event listener
    this.slider.addEventListener("input", (event) => {
      if (this.isDisabled()) {
        return;
      }

      this.seek(event.target.value / 10);
    });

    this.slider.addEventListener("pointerdown", async (e) => {
      /*       if (this.isDisabled()) {
        return;
      } */

      this.log("pointerdown", e);

      const direction = this.player.direction;

      const options = {
        direction: direction,
        position: direction === "normal" ? 1 : 0,
        playState: "paused",
        duration: "1s",
      };

      this.player.animationQueue.manualUpdate(
        this.player.lastAnimation || {},
        options
      );
      this.seek(this.slider.value / 10);

      /*       if (pausedState) {
        await pausedState.play();
      }
      const direction = this.player.direction;
      const options = {
        direction: direction,
        position: direction === "normal" ? 1 : 0,
        playState: "paused",
        duration: "1s"
      };
      await this.player.vizzu
        .animate(this.player.lastAnimation || {}, options)
        .activated.then((control) => (pausedState = control));
      this.seek(this.slider.value / 10); */
    });

    this.slider.addEventListener("pointerup", async (e) => {
      this.player.animationQueue.continue();

      const direction = this.player.direction;
      if (direction === "reverse" && !this.player.animationQueue.hasNext()) {
        const actualSlideKey = this.player.currentSlide || 0;
        const ps = this.player.slides[actualSlideKey];
        this.player._step(ps[0], { position: 1 });
      }
      /*       if (this.isDisabled()) {
        return;
      }

      this.player.lockControll();
      const direction = this.player.direction;
      if (pausedState) {
        //pausedState.play();
        //pausedState = null;

        const currentPercent = this.slider.value/10;
        const isNormal = direction === "normal";
        let percentage = isNormal? 0 + currentPercent : 100 - currentPercent;
        const interval = 1000 / 30; 

        const increment = isNormal ? 1 : -1;

        

        let counter = 0;
        const intervalId = setInterval(function () {
          if (counter < interval) {
            pausedState.seek(`${percentage}%`)
            counter++;
            percentage += increment * interval/100; ;
          } else {
            const seekPoisition = isNormal?`100%`: "0%";
            pausedState.seek(seekPoisition);
            pausedState.play();
            pausedState = null;
            if (direction === "reverse") {

      
              const actualSlideKey = this.player.currentSlide || 0;
              const ps = this.player.slides[actualSlideKey];
              this.player._step(ps[0], { position: 1 });
            }
            clearInterval(intervalId);
          }
        }, interval);

      }  */
    });
  }

  async connectedCallback() {
    await Promise.resolve();
    if (!this.controller) {
      const parent = this.getRootNode()?.host;
      if (parent.nodeName === "VIZZU-CONTROLLER") {
        this.controller = parent;
        this.player = parent.player;
        parent.updateSlider = this._updateSlider.bind(this);
      }
    }
  }

  seek(percent) {
    this.player._update(this.player._state);
    this.player.seek(percent);
  }

  isDisabled() {
    return this.slider.hasAttribute("disabled");
  }

  log(...msg) {
    if (this.player.debug) {
      console.log(...LOG_PREFIX, ...msg);
    }
  }

  _update(state) {
    this.log("update", state);
    const e = new CustomEvent("update", { detail: state });
    this.dispatchEvent(e);
  }

  _updateSlider(value) {
    if (!this.slider) {
      return null;
    }

    if (this.player.direction === "normal" && this.player.currentSlide === 0) {
      this.slider.setAttribute("disabled", true);
      this.slider.value = 0;
    } else {
      this.slider.removeAttribute("disabled");
      this.slider.value = value;
    }
  }

  _render() {
    return `
    <style>
    :host {
      width: 100%;
      display: flex;
    }
    .slider {
        display: flex;
        width: 100%;
        padding: 15px;
        padding-left: 40px;
        background: #fcfcfc;
        border-radius: 20px;
        align-items: center;
    }
    
    .slider input[type="range"] {
        -webkit-appearance: none !important;
        width: 100%;
        height: 4px;
        background: var(--vizzu-button-color, #c6c6c6);
        border: none;
        outline: none;
    }
    .slider input[type="range"]:disabled {
      opacity: 0.5;
    }
    .slider input[type="range"]:not([disabled]):hover
     {
      background: var(--_hc);
      cursor: pointer;
    }
    
    .slider input[type="range"]::-webkit-slider-thumb,
    .slider input[type="range"]::-moz-range-thumb {
        -webkit-appearance: none !important;
        width: 10px;
        height: 10px;
        background: var(--vizzu-button-color, #c6c6c6);
        border: 2px solid var(--vizzu-button-color, #c6c6c6);
        border-radius: 50%;
    }
    
    .slider input[type="range"]::-webkit-slider-thumb:hover,
    .slider input[type="range"]::-moz-range-thumb:hover {
        background: var(--_hc);
        border: var(--_hc);
        height: 50px
    }
    [aria-label] {
        position: relative;
      }
      [aria-label]:hover::after {
        content: attr(aria-label);
        color: var(--_hc);
        position: absolute;
        top: -14px;
        left: -20em;
        right: -20em;
        text-align: center;
      }
    </style>
    <div class="slider" id="slider-container">
        <input aria-label="Seek animation" type="range" min="0" max="1000" id="slider"/>
      </div>`;
  }
}

try {
  if (!customElements.get("vizzu-controller-slider")) {
    customElements.define("vizzu-controller-slider", Slider);
  } else {
    console.warn("Slider already defined");
  }
} catch (e) {
  console.error("Failed to register custom element: ", e);
}

export default Slider;
