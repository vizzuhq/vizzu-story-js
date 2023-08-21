import VizzuMock from "./vizzu.js";

class Vizzu extends VizzuMock {
  get mockType() {
    return "window";
  }
}

export default Vizzu;
