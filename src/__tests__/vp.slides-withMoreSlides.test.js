import { dataAssets } from "./assets/chart-params/data.js";
import { styleAssets } from "./assets/chart-params/style.js";

import { waitForSlidesToBeSet } from "./assets/slides/asset-functions.js";
import { slidesWithMoreSlides } from "./assets/slides/more-slides.js";

import VizzuPlayer from "../vizzu-player.js";

import lodashClonedeep from "lodash.clonedeep";

import VizzuMock from "./assets/mocks/vizzu.js";
global.window.Vizzu = VizzuMock;

describe("if using vp.slides setter", () => {
  describe("with more slides", () => {
    test.each(slidesWithMoreSlides)(
      "vp.slides getter should return valid slides",
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
  describe("with initial data and more slides", () => {
    test.each(slidesWithMoreSlides)(
      "vp.slides getter should return valid slides",
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
  describe("with initial style and more slides", () => {
    test.each(slidesWithMoreSlides)(
      "vp.slides getter should return valid slides",
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
  describe("with initial data and style and more slides", () => {
    test.each(slidesWithMoreSlides)(
      "vp.slides getter should return valid slides",
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
