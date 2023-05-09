class Control {
  constructor(animation) {
    this._animation = animation;
  }

  store() {
    return this._animation;
  }
}

class Vizzu {
  constructor() {
    this._snapshot = {};
  }

  on() {}

  off() {}

  animate() {
    this._snapshot = [...arguments][0];
    const anim = Promise.resolve("test1");
    anim.activated = Promise.resolve(new Control([...arguments][0]));
    return anim;
  }

  store() {
    return this._snapshot;
  }

  async initializing() {
    return Promise.resolve();
  }
}

export default Vizzu;
