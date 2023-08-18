import { dataAssets } from "./assets/chart-params/data.js";
import { styleAssets } from "./assets/chart-params/style.js";

import { waitForSlidesToBeSet } from "./assets/slides/asset-functions.js";
import { slidesWithZeroSlide } from "./assets/slides/zero-slide.js";

import VizzuPlayer from "../vizzu-player.js";

import lodashClonedeep from "lodash.clonedeep";

import VizzuMock from "./assets/mocks/vizzu.js";
global.window.Vizzu = VizzuMock;

describe("if using vp.slides setter", () => {
  describe("with zero slide ", () => {
    test.each(slidesWithZeroSlide)(
      "vp.slides getter should return empty list",
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
  describe("with initial data and zero slide ", () => {
    test.each(slidesWithZeroSlide)(
      "vp.slides getter should return empty list",
      (name, input, ref) => {
        const vp = new VizzuPlayer();
        const modifiedInput = lodashClonedeep(input);
        modifiedInput.data = dataAssets.dataInit;
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
  describe("with initial style and zero slide ", () => {
    test.each(slidesWithZeroSlide)(
      "vp.slides getter should return empty list",
      (name, input, ref) => {
        const vp = new VizzuPlayer();
        const modifiedInput = lodashClonedeep(input);
        modifiedInput.style = styleAssets.styleInit;
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
  describe("with initial data and style and zero slide ", () => {
    test.each(slidesWithZeroSlide)(
      "vp.slides getter should return empty list",
      (name, input, ref) => {
        const vp = new VizzuPlayer();
        const modifiedInput = lodashClonedeep(input);
        modifiedInput.data = dataAssets.dataInit;
        modifiedInput.style = styleAssets.styleInit;
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
