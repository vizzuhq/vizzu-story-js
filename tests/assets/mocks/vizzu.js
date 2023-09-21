class Presets {
  stream(config) {
    return {
      channels: {
        x: config.x,
        y: [config.y, config.stackedBy],
        color: config.stackedBy,
      },
    };
  }
}

class Control {
  constructor(animation) {
    this._animation = animation;
  }
}

class Vizzu {
  constructor() {
    this._snapshot = {};
  }

  animate() {
    this._snapshot = [...arguments][0];
    const anim = Promise.resolve("test1");
    anim.activated = Promise.resolve(new Control([...arguments][0]));
    return anim;
  }

  get config() {
    return this._snapshot.config || {};
  }

  getComputedStyle() {
    return this._snapshot?.style || {};
  }

  feature() {}

  on() {}

  off() {}

  static get presets() {
    return new Presets();
  }

  async initializing() {
    return Promise.resolve();
  }
}

export default Vizzu;
