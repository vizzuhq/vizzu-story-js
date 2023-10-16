const LOG_PREFIX = [
  "%cVIZZU%cSLIDER",
  "background: #e2ae30; color: #3a60bf; font-weight: bold",
  "background: #000000; color: #fafafa;",
];

const TEXT = {
  SEEK: "Seek animation",
};

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
      if (this.isDisabled()) {
        return;
      }
      const currentSlide =
        this.player.animationQueue.getParameter("currentSlide");
      this.player._currentSlide = currentSlide;
      this.player.animationQueue.clear();
      this.player.animationQueue.seekStart(this.slider.value / 10);
    });

    this.slider.addEventListener("pointerup", async (e) => {
      if (this.isDisabled()) {
        return;
      }
      this.player.animationQueue.continue();
    });
  }

  async connectedCallback() {
    await Promise.resolve();
    if (!this.controller) {
      const parent = this.getRootNode()?.host;
      if (parent.nodeName === "VIZZU-CONTROLLER") {
        this.controller = parent;
        await parent.initializing;
        this.player = parent.player;

        const updateSlider = (event) => {
          if (this.player.animationQueue.playing) {
            const process = event.data.progress * 1000;
            if (
              this.player.direction === this.player.animationQueue.direction
            ) {
              this._updateSlider(process);
            } else {
              this._updateSlider(1000 - process);
            }

            if (!this.player.animationQueue.seekerEnabled) {
              this.slider.setAttribute("readonly", true);
            }
          }
        };
        this.player.vizzu.on("update", updateSlider);

        const _checkDisabeld = () => {
          this.slider.removeAttribute("readonly");
          if (
            !this.player.animationQueue.playing &&
            !this.player.animationQueue.seekerEnabled
          ) {
            this.slider.setAttribute("disabled", true);
          }
        };
        this.player.vizzu.on("animation-complete", _checkDisabeld);
      }
    }
  }

  seek(percent) {
    this.player.animationQueue.seek(percent);
  }

  isDisabled() {
    return (
      this.slider.hasAttribute("disabled") ||
      this.slider.hasAttribute("readonly")
    );
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
      this.slider.removeAttribute("readonly");
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
        width: 100%;
        height: 4px;
        background: var(--vizzu-button-color, #c6c6c6);
        border: none;
        outline: none;
    }
    .slider input[type="range"]:disabled,
    .slider input[type="range"][readonly] {
      opacity: 0.5;
    }
    .slider input[type="range"]:not([disabled]):not([readonly]):hover
     {
      background: var(--_hc);
      cursor: pointer;
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

      input[type=range] {
        -webkit-appearance: none;
        -moz-appearance: none;
      }
      
      input[type=range]::-webkit-slider-thumb {
        -webkit-appearance: none;
        width: 16px;
        height: 16px;
        background: var(--vizzu-button-color, #c6c6c6);
        border: 1px solid var(--vizzu-button-color, #c6c6c6);
        border-radius: 50%;
      }
      
      input[type=range]:hover:not([disabled])::-webkit-slider-thumb {
        background: var(--_hc);
        border-color: var(--_hc);
      }
      
      input[type=range]::-moz-range-thumb {
        -moz-appearance: none;
        width: 16px;
        height: 16px;
        background: var(--vizzu-button-color, #c6c6c6);
        border: 1px solid var(--vizzu-button-color, #c6c6c6);
        border-radius: 50%;
      }
      
      input[type=range]:hover:not([disabled])::-moz-range-thumb {
        background: var(--_hc);
        border-color: var(--_hc);
      }
    </style>
    <div class="slider" id="slider-container">
        <input aria-label="${TEXT.SEEK}" type="range" min="0" max="1000" value="0" id="slider" disabled/>
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
