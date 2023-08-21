import VizzuMock from "./vizzu.js";

class Vizzu extends VizzuMock {
  get mockType() {
    return "cdn";
  }
}

export default Vizzu;
