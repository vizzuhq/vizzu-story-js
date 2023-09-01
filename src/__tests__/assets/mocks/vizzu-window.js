import VizzuMock from "./vizzu.js";

class Vizzu extends VizzuMock {
  get instanceMockType() {
    return "windowInstance";
  }

  static get classMockType() {
    return "windowClass";
  }
}

export default Vizzu;
