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
    this.shadowRoot.getElementById("status").innerText = `${(data.currentSlide || 0) + 1}/${data.length || '?'}`;
    if (this.slider) {
      this.slider.value = data.seekPosition * 10;
    }
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
          justify-content: center;
          width: 100%;
          line-height: 2em;
        }
        button {
          background: transparent;
          padding: 0;
          margin: 0;
          border: 1px solid #666;
          boder-radius: 2px;
          cursor: pointer;
          width: 3em;
        }
      </style>
      <div id="status">${(this._state?.currentSlide || 0) + 1}/${(this._state?.length || '?')}</div>
      <div id="playerctrls">
        <button id="start" aria-label="Jump to start">|&lt;</button>
        <button id="previous" aria-label="Previous slide">&lt;</button>
        <input aria-label="Seek animation between slides" type="range" min="0" max="1000" id="slider"/>
        <button id="next" aria-label="Next slide">&gt;</button>
        <button id="end" aria-label="Jump to the end">&gt;|</button>
      </div>
      <button id="fullscreen" aria-label="Toggle fullscreen">[]</button>
      `;
  }
}

customElements.define('vizzu-controller', VizzuController);

export default VizzuController;
