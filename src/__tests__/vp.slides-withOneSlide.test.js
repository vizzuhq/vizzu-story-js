import { dataAssets } from "./assets/chart-params/data.js";
import { styleAssets } from "./assets/chart-params/style.js";

import { waitForSlidesToBeSet } from "./assets/slides/asset-functions.js";
import { slidesWithOneSlideAndWithOneStep } from "./assets/slides/one-slide-one-step.js";
import { slidesWithOneSlideAndWithMoreSteps } from "./assets/slides/one-slide-more-steps.js";

import VizzuPlayer from "../vizzu-player.js";

import lodashClonedeep from "lodash.clonedeep";

import VizzuMock from "./assets/mocks/vizzu.js";
global.window.Vizzu = VizzuMock;

describe("if using vp.slides setter", () => {
  describe("with one slide and one step (as an object)", () => {
    test.each(slidesWithOneSlideAndWithOneStep)(
      "which contains %s, vp.slides getter should return valid slides",
      (name, input, ref) => {
        const vp = new VizzuPlayer();
        vp.slides = lodashClonedeep(input);
        return vp.connectedCallback().then(() => {
          return waitForSlidesToBeSet(vp, 5000).then(() => {
            expect(vp.slides).toStrictEqual(ref);
          });
        });
      }
    );
  });
});

describe("if using vp.slides setter", () => {
  describe("with one slide and one step (as a single-item list)", () => {
    test.each(slidesWithOneSlideAndWithOneStep)(
      "which contains %s, vp.slides getter should return valid slides",
      (name, input, ref) => {
        const vp = new VizzuPlayer();
        const modifiedInput = lodashClonedeep(input);
        modifiedInput.slides[0] = [modifiedInput.slides[0]];
        vp.slides = modifiedInput;
        return vp.connectedCallback().then(() => {
          return waitForSlidesToBeSet(vp, 5000).then(() => {
            expect(vp.slides).toStrictEqual(ref);
          });
        });
      }
    );
  });
});

describe("if using vp.slides setter", () => {
  describe("with initial data and one slide and one step (as an object)", () => {
    test.each(slidesWithOneSlideAndWithOneStep)(
      "which contains %s, vp.slides getter should return valid slides",
      (name, input, ref) => {
        const vp = new VizzuPlayer();
        const modifiedInput = lodashClonedeep(input);
        modifiedInput.data = dataAssets.dataInit;
        const modifiedRef = lodashClonedeep(ref);
        modifiedRef[0][0][0].target.data = Object.assign(
          modifiedRef[0][0][0].target.data,
          dataAssets.dataInit
        );
        vp.slides = modifiedInput;
        return vp.connectedCallback().then(() => {
          return waitForSlidesToBeSet(vp, 5000).then(() => {
            expect(vp.slides).toStrictEqual(modifiedRef);
          });
        });
      }
    );
  });
});

describe("if using vp.slides setter", () => {
  describe("with initial data and one slide and one step (as a single-item list)", () => {
    test.each(slidesWithOneSlideAndWithOneStep)(
      "which contains %s, vp.slides getter should return valid slides",
      (name, input, ref) => {
        const vp = new VizzuPlayer();
        const modifiedInput = lodashClonedeep(input);
        modifiedInput.data = dataAssets.dataInit;
        modifiedInput.slides[0] = [modifiedInput.slides[0]];
        const modifiedRef = lodashClonedeep(ref);
        modifiedRef[0][0][0].target.data = Object.assign(
          modifiedRef[0][0][0].target.data,
          dataAssets.dataInit
        );
        vp.slides = modifiedInput;
        return vp.connectedCallback().then(() => {
          return waitForSlidesToBeSet(vp, 5000).then(() => {
            expect(vp.slides).toStrictEqual(modifiedRef);
          });
        });
      }
    );
  });
});

describe("if using vp.slides setter", () => {
  describe("with initial style and one slide and one step (as an object)", () => {
    test.each(slidesWithOneSlideAndWithOneStep)(
      "which contains %s, vp.slides getter should return valid slides",
      (name, input, ref) => {
        const vp = new VizzuPlayer();
        const modifiedInput = lodashClonedeep(input);
        modifiedInput.style = styleAssets.styleInit;
        const modifiedRef = lodashClonedeep(ref);
        if (!modifiedRef[0][0][0].target.style) {
          modifiedRef[0][0][0].target.style = styleAssets.styleInit;
        }
        vp.slides = modifiedInput;
        return vp.connectedCallback().then(() => {
          return waitForSlidesToBeSet(vp, 5000).then(() => {
            expect(vp.slides).toStrictEqual(modifiedRef);
          });
        });
      }
    );
  });
});

describe("if using vp.slides setter", () => {
  describe("with initial style and one slide and one step (as a single-item list)", () => {
    test.each(slidesWithOneSlideAndWithOneStep)(
      "which contains %s, vp.slides getter should return valid slides",
      (name, input, ref) => {
        const vp = new VizzuPlayer();
        const modifiedInput = lodashClonedeep(input);
        modifiedInput.style = styleAssets.styleInit;
        modifiedInput.slides[0] = [modifiedInput.slides[0]];
        const modifiedRef = lodashClonedeep(ref);
        if (!modifiedRef[0][0][0].target.style) {
          modifiedRef[0][0][0].target.style = styleAssets.styleInit;
        }
        vp.slides = modifiedInput;
        return vp.connectedCallback().then(() => {
          return waitForSlidesToBeSet(vp, 5000).then(() => {
            expect(vp.slides).toStrictEqual(modifiedRef);
          });
        });
      }
    );
  });
});

describe("if using vp.slides setter", () => {
  describe("with initial data and style and one slide and one step (as an object)", () => {
    test.each(slidesWithOneSlideAndWithOneStep)(
      "which contains %s, vp.slides getter should return valid slides",
      (name, input, ref) => {
        const vp = new VizzuPlayer();
        const modifiedInput = lodashClonedeep(input);
        modifiedInput.data = dataAssets.dataInit;
        modifiedInput.style = styleAssets.styleInit;
        const modifiedRef = lodashClonedeep(ref);
        modifiedRef[0][0][0].target.data = Object.assign(
          modifiedRef[0][0][0].target.data,
          dataAssets.dataInit
        );
        if (!modifiedRef[0][0][0].target.style) {
          modifiedRef[0][0][0].target.style = styleAssets.styleInit;
        }
        vp.slides = modifiedInput;
        return vp.connectedCallback().then(() => {
          return waitForSlidesToBeSet(vp, 5000).then(() => {
            expect(vp.slides).toStrictEqual(modifiedRef);
          });
        });
      }
    );
  });
});

describe("if using vp.slides setter", () => {
  describe("with initial data and style and one slide and one step (as a single-item list)", () => {
    test.each(slidesWithOneSlideAndWithOneStep)(
      "which contains %s, vp.slides getter should return valid slides",
      (name, input, ref) => {
        const vp = new VizzuPlayer();
        const modifiedInput = lodashClonedeep(input);
        modifiedInput.data = dataAssets.dataInit;
        modifiedInput.style = styleAssets.styleInit;
        modifiedInput.slides[0] = [modifiedInput.slides[0]];
        const modifiedRef = lodashClonedeep(ref);
        modifiedRef[0][0][0].target.data = Object.assign(
          modifiedRef[0][0][0].target.data,
          dataAssets.dataInit
        );
        if (!modifiedRef[0][0][0].target.style) {
          modifiedRef[0][0][0].target.style = styleAssets.styleInit;
        }
        vp.slides = modifiedInput;
        return vp.connectedCallback().then(() => {
          return waitForSlidesToBeSet(vp, 5000).then(() => {
            expect(vp.slides).toStrictEqual(modifiedRef);
          });
        });
      }
    );
  });
});

describe("if using vp.slides setter", () => {
  describe("with one slide and more steps", () => {
    test.each(slidesWithOneSlideAndWithMoreSteps)(
      "which contain %s, vp.slides getter should return valid slides",
      (name, input, ref) => {
        const vp = new VizzuPlayer();
        vp.slides = lodashClonedeep(input);
        return vp.connectedCallback().then(() => {
          return waitForSlidesToBeSet(vp, 5000).then(() => {
            expect(vp.slides).toStrictEqual(ref);
          });
        });
      }
    );
  });
});

describe("if using vp.slides setter", () => {
  describe("with initial data and one slide and more steps", () => {
    test.each(slidesWithOneSlideAndWithMoreSteps)(
      "which contain %s, vp.slides getter should return valid slides",
      (name, input, ref) => {
        const vp = new VizzuPlayer();
        const modifiedInput = lodashClonedeep(input);
        modifiedInput.data = dataAssets.dataInit;
        const modifiedRef = lodashClonedeep(ref);
        modifiedRef[0][0][0].target.data = Object.assign(
          modifiedRef[0][0][0].target.data,
          dataAssets.dataInit
        );
        vp.slides = modifiedInput;
        return vp.connectedCallback().then(() => {
          return waitForSlidesToBeSet(vp, 5000).then(() => {
            expect(vp.slides).toStrictEqual(modifiedRef);
          });
        });
      }
    );
  });
});

describe("if using vp.slides setter", () => {
  describe("with initial style and one slide and more steps", () => {
    test.each(slidesWithOneSlideAndWithMoreSteps)(
      "which contain %s, vp.slides getter should return valid slides",
      (name, input, ref) => {
        const vp = new VizzuPlayer();
        const modifiedInput = lodashClonedeep(input);
        modifiedInput.style = styleAssets.styleInit;
        const modifiedRef = lodashClonedeep(ref);
        if (!modifiedRef[0][0][0].target.style) {
          modifiedRef[0][0][0].target.style = styleAssets.styleInit;
        }
        vp.slides = modifiedInput;
        return vp.connectedCallback().then(() => {
          return waitForSlidesToBeSet(vp, 5000).then(() => {
            expect(vp.slides).toStrictEqual(modifiedRef);
          });
        });
      }
    );
  });
});

describe("if using vp.slides setter", () => {
  describe("with initial data and style and one slide and more steps", () => {
    test.each(slidesWithOneSlideAndWithMoreSteps)(
      "which contain %s, vp.slides getter should return valid slides",
      (name, input, ref) => {
        const vp = new VizzuPlayer();
        const modifiedInput = lodashClonedeep(input);
        modifiedInput.data = dataAssets.dataInit;
        modifiedInput.style = styleAssets.styleInit;
        const modifiedRef = lodashClonedeep(ref);
        modifiedRef[0][0][0].target.data = Object.assign(
          modifiedRef[0][0][0].target.data,
          dataAssets.dataInit
        );
        if (!modifiedRef[0][0][0].target.style) {
          modifiedRef[0][0][0].target.style = styleAssets.styleInit;
        }
        vp.slides = modifiedInput;
        return vp.connectedCallback().then(() => {
          return waitForSlidesToBeSet(vp, 5000).then(() => {
            expect(vp.slides).toStrictEqual(modifiedRef);
          });
        });
      }
    );
  });
});
