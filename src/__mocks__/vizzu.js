class Vizzu {
  constructor() {
    this._snapshot = {};
  }

  on() {}

  off() {}

  async animate() {
    this._snapshot = [...arguments][0];
    return Promise.resolve();
  }

  store() {
    return this._snapshot;
  }

  async initializing() {
    return Promise.resolve();
  }
}

export default Vizzu;
