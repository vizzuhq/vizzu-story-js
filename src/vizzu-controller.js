const LOG_PREFIX = ["%cVIZZU%cCONTROLLER", "background: #e2ae30; color: #3a60bf; font-weight: bold", "background: #3a60bf; color: #e2ae30;"];

class VizzuController extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = this._render();

    this._sliderUpdate = this.getAttribute("slider-update") || "change"; // change or input

    this._update = this.update.bind(this);

    this.shadowRoot.addEventListener("click", e => {
      let btn = e.target.closest("button");

      if (btn) {
        if (btn.id === "start") {
          this.toStart();
        } else if (btn.id === "end") {
          this.toEnd();
        } else if (btn.id === "previous") {
          this.previous();
        } else if (btn.id === "next") {
          this.next();
        } else if (btn.id === "fullscreen") {
          this.fullscreen();
        }
      }
    });

    this.shadowRoot.addEventListener(this._sliderUpdate, e => {
      let slider = e.target.closest("input[type=range]");

      if (slider) {
        this.seek(slider.value / 10);
      }
    });
  }

  update(e) {
    const data = e.detail;
    this.log("update", data);
    this._state = data;
    if (data.locked) {
      this.setAttribute("locked", "");
    } else {
      this.removeAttribute("locked");
    }
    this.shadowRoot.getElementById("status").innerHTML = this._html_status;
    if (this.slider) {
      this.slider.value = data.seekPosition * 10;
    }
  }

  get _html_status() {
    return `<span class="current">${(this._state?.currentSlide || 0) + 1}</span>/<span class="length">${(this._state?.length || '?')}</span>`;
  }

  _unsubscribe(player) {
    player?.removeEventListener("update", this._update);
    this._player = null;
  }

  _subscribe(player) {
    player?.addEventListener("update", this._update);
    this._player = player;
  }

  get slider() {
    return this.shadowRoot.getElementById("slider");
  }

  connectedCallback() {
    if (!this._player) {
      const p = this.getRootNode()?.host;
      if (p.nodeName === 'VIZZU-PLAYER') {
        this._player = this.getRootNode()?.host;
        this._subscribe(this._player);
      }
    }
  }

  disconnectedCallback() {
    if (this._player) {
      this._unsubscribe(this._player);
    }
  }

  get player() {
    return this._player;
  }

  set player(player) {
    this._player = player;
  }

  get debug() {
    let debugCookie = document.cookie.split(";").some(c => c.startsWith("vizzu-debug"));
    return debugCookie || this.hasAttribute("debug");
  }

  set debug(debug) {
    document.cookie = `vizzu-debug=${debug ? "true" : ""}; path=/`;
  }

  log(...msg) {
    if (this.debug) {
      console.log(...LOG_PREFIX, ...msg); // eslint-disable-line no-console
    }
  }

  seek(percent) {
    this.log("seek", percent);
    this.player?.seek(percent);
  }

  toStart() {
    this.log("toStart");
    this.player?.toStart();
  }

  toEnd() {
    this.log("toEnd");
    this.player?.toEnd();
  }

  previous() {
    this.log("previous");
    this.player?.previous();
  }

  next() {
    this.log("next");
    this.player?.next();
  }

  get fullscreenTarget() {
    return this._fullscreenTarget || this.getRootNode()?.host || this.parentElement;
  }

  fullscreen() {
    this.log("fullscreen");
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      this.fullscreenTarget?.requestFullscreen();
    }
  }

  _render() {
    return `
      <style>
        :host {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          max-width: 100%;
          overflow-x: hidden;
          padding: 20px 0 10px;
          height: 22px;
          font-family: sans-serif;
          --_c: var(--vizzu-button-color, #c6c6c6);
          --_bg: var(--vizzu-button-background-color, #fff);
          --_hc: var(--vizzu-button-hover-color, #494949);
          --_hs: var(--vizzu-slider-hover, #009edb);
          color: var(--_c);
        }
        :host([locked]) {
          pointer-events: none;
          opacity: 0.5;
        }
        button {
          background: transparent;
          padding: 0;
          margin: 0;
          border: none;
          cursor: pointer;
          min-width: 25px;
          height: 22px;
        }
        button > svg {
          vertical-align: middle;
        }
        button > svg path {
          fill: var(--_c);
        }
        button:focus > svg path,
        button:hover > svg path {
          fill: var(--_hc);
        }
        #playerctrls {
          display: flex;
          flex: 1;
          justify-content: space-between;
          align-items: center;
          max-width: 550px;
          margin: 0 10px;
        }
        #status {
          margin-left: 10px;
        }
        #fullscreen {
          margin-right: 10px;
        }
        #slider {
          flex: 1;
          max-width: 350px;
          min-width: 60px;
          margin: 0 10px;
          padding: 7px 0;
          -webkit-appearance: none;
          background: transparent;
        }
        #slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          border: 2px solid var(--_c);
          border-radius: 50%;
          width: 15px;
          height: 15px;
          background-color: var(--_bg);
          margin-top: -7px;
        }
        #slider::-webkit-slider-runnable-track {
          -webkit-appearance: none;
          width: 100%;
          height: 2px;
          cursor: pointer;
          background: var(--_c);
        }
        #slider:focus::-webkit-slider-thumb,
        #slider:hover::-webkit-slider-thumb {
          background: var(--_hs);
          border-color: var(--_hs);
        }
        #slider:focus::-webkit-slider-runnable-track,
        #slider:hover::-webkit-slider-runnable-track {
          background: var(--_hs);
        }
        [aria-label] {
          position: relative;
        }
        [aria-label]:focus::after,
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
      <div id="status">${this._html_status}</div>
      <div id="playerctrls">
        <button id="start" aria-label="Jump to start">
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="11" height="11" viewBox="0 0 11 11">
            <path id="first-pass" d="M1.467,5.867 L1.467,5.133 L11.000,0.000 L11.000,2.200 L11.000,8.800 L11.000,11.000 L1.467,5.867 zM0.000,11.000 C0.000,11.000 0.000,2.019 0.000,-0.000 C0.000,-0.000 1.467,-0.000 1.467,-0.000 L1.467,11.000 L0.000,11.000 z" fill="#A2A2A2" />
          </svg>
        </button>
        <button id="previous" aria-label="Previous slide">
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="13" height="15" viewBox="0 0 13 15">
            <path id="play_pass" d="M13.000,15.000 L-0.000,8.000 L-0.000,7.000 L13.000,-0.000 L13.000,15.000 z" fill="#A2A2A2" />
          </svg>
        </button>
        <input aria-label="Seek animation between slides" type="range" min="0" max="1000" id="slider"/>
        <button id="next" aria-label="Next slide">
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="13" height="15" viewBox="0 0 13 15">
            <path id="nextBtn" d="M-0.000,15.000 L13.000,8.000 L13.000,7.000 L-0.000,-0.000 L-0.000,15.000 z" fill="#A2A2A2" />
          </svg>
        </button>
        <button id="end" aria-label="Jump to the end">
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="11" height="11" viewBox="0 0 11 11">
            <path id="first-pass" d="M9.533,5.133 L-0.000,-0.000 L-0.000,2.200 L-0.000,8.800 L-0.000,11.000 L9.533,5.867 L9.533,5.133 zM11.000,-0.000 C11.000,-0.000 9.533,-0.000 9.533,-0.000 C9.533,11.000 9.533,11.000 9.533,11.000 L11.000,11.000 C11.000,11.000 11.000,2.019 11.000,-0.000 z" fill="#A2A2A2" />
          </svg>
        </button>
      </div>
      <button id="fullscreen" aria-label="Toggle fullscreen">
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="15" height="15" viewBox="0 0 15 15">
          <path id="fullscreen_pass" d="M9.000,12.000 L12.000,12.000 L12.000,9.000 L15.000,9.000 L15.000,15.000 L12.000,15.000 L9.000,15.000 L9.000,12.000 zM9.000,-0.000 L15.000,-0.000 L15.000,6.000 L12.000,6.000 L12.000,3.000 L9.000,3.000 L9.000,-0.000 zM3.000,9.000 L3.000,12.000 L6.000,12.000 L6.000,15.000 L-0.000,15.000 L-0.000,9.000 L3.000,9.000 zM-0.000,-0.000 L6.000,-0.000 L6.000,3.000 L3.000,3.000 L3.000,6.000 L-0.000,6.000 L-0.000,-0.000 z" fill="#A2A2A2" />
        </svg>
      </button>
      `;
  }
}

customElements.define('vizzu-controller', VizzuController);

export default VizzuController;
