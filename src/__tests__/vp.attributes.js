import { waitForSlidesToBeSet } from "./assets/slides/asset-functions.js";

import { slideWithMoreSteps } from "./assets/slides/one-slide-more-steps.js";

import VizzuPlayer from "../vizzu-player.js";

import VizzuMock from "./assets/mocks/vizzu.js";
global.window.Vizzu = VizzuMock;

describe("if attribute", () => {
  const shouldBe = "currentSlide getter should return";

  let slides;
  let vp;

  beforeAll(() => {
    slides = { slides: [] };
    for (let i = 0; i < 6; i++) {
      slides.slides.push(...slideWithMoreSteps.input.slides);
    }
  });

  beforeEach(() => {
    vp = new VizzuPlayer();
  });

  afterEach(() => {
    global.document.location.hash = "";
  });

  describe("hash-navigation is", () => {
    test(`set without value, ${shouldBe} 0`, () => {
      vp.setAttribute("hash-navigation", true);
      vp.slides = slides;
      return vp.connectedCallback().then(() => {
        return waitForSlidesToBeSet(vp, 5000).then(() => {
          expect(vp.currentSlide).toStrictEqual(0);
        });
      });
    });

    test(`set with zero, ${shouldBe} 0`, () => {
      const hash = 0;
      global.document.location.hash = `#${hash}`;
      vp.setAttribute("hash-navigation", true);
      vp.slides = slides;
      return vp.connectedCallback().then(() => {
        return waitForSlidesToBeSet(vp, 5000).then(() => {
          expect(vp.currentSlide).toStrictEqual(0);
        });
      });
    });

    test(`set with a positive number, ${shouldBe} (hash - 1)`, () => {
      const hash = 4;
      global.document.location.hash = `#${hash}`;
      vp.setAttribute("hash-navigation", true);
      vp.slides = slides;
      return vp.connectedCallback().then(() => {
        return waitForSlidesToBeSet(vp, 5000).then(() => {
          expect(vp.currentSlide).toStrictEqual(hash - 1);
        });
      });
    });

    test(`set with a positive number (larger than slides.length), ${shouldBe} an overflow value`, () => {
      const hash = 8;
      global.document.location.hash = `#${hash}`;
      vp.setAttribute("hash-navigation", true);
      vp.slides = slides;
      return vp.connectedCallback().then(() => {
        return waitForSlidesToBeSet(vp, 5000).then(() => {
          expect(vp.currentSlide).toStrictEqual(1); // slides.length should be better
        });
      });
    });

    test(`set with a negative number, ${shouldBe} (slides.length + hash)`, () => {
      const hash = -4;
      global.document.location.hash = `#${hash}`;
      vp.setAttribute("hash-navigation", true);
      vp.slides = slides;
      return vp.connectedCallback().then(() => {
        return waitForSlidesToBeSet(vp, 5000).then(() => {
          expect(vp.currentSlide).toStrictEqual(slides.slides.length + hash);
        });
      });
    });

    test(`set with a negative number (larger than slides.length), ${shouldBe} an overflow value`, () => {
      const hash = -8;
      global.document.location.hash = `#${hash}`;
      vp.setAttribute("hash-navigation", true);
      vp.slides = slides;
      return vp.connectedCallback().then(() => {
        return waitForSlidesToBeSet(vp, 5000).then(() => {
          expect(vp.currentSlide).toStrictEqual(4); // 0 should be better
        });
      });
    });

    test(`changed, ${shouldBe} the changed value`, () => {
      const initialHash = -4;
      global.document.location.hash = `#${initialHash}`;
      vp.setAttribute("hash-navigation", true);
      vp.slides = slides;
      return vp.connectedCallback().then(() => {
        return waitForSlidesToBeSet(vp, 5000).then(() => {
          expect(vp.currentSlide).toStrictEqual(
            slides.slides.length + initialHash
          );
          const newHash = 4;
          global.document.location.hash = `#${newHash}`;
          return new Promise((resolve) => setTimeout(resolve, 100)).then(() => {
            expect(vp.currentSlide).toBe(newHash - 1);
          });
        });
      });
    });
  });

  describe("start-slide is", () => {
    test(`zero, ${shouldBe} 0`, () => {
      const startSlide = 0;
      vp.setAttribute("start-slide", `${startSlide}`);
      vp.slides = slides;
      return vp.connectedCallback().then(() => {
        return waitForSlidesToBeSet(vp, 5000).then(() => {
          expect(vp.currentSlide).toStrictEqual(0);
        });
      });
    });

    test(`a positive number, ${shouldBe} (start-slide - 1)`, () => {
      const startSlide = 4;
      vp.setAttribute("start-slide", `${startSlide}`);
      vp.slides = slides;
      return vp.connectedCallback().then(() => {
        return waitForSlidesToBeSet(vp, 5000).then(() => {
          expect(vp.currentSlide).toStrictEqual(startSlide - 1);
        });
      });
    });

    test(`a positive number (larger than slides.length), ${shouldBe} an overflow value`, () => {
      const startSlide = 8;
      vp.setAttribute("start-slide", `${startSlide}`);
      vp.slides = slides;
      return vp.connectedCallback().then(() => {
        return waitForSlidesToBeSet(vp, 5000).then(() => {
          expect(vp.currentSlide).toStrictEqual(1); // slides.length should be better
        });
      });
    });

    test(`a negative number, ${shouldBe} (slides.length + start-slide)`, () => {
      const startSlide = -4;
      vp.setAttribute("start-slide", `${startSlide}`);
      vp.slides = slides;
      return vp.connectedCallback().then(() => {
        return waitForSlidesToBeSet(vp, 5000).then(() => {
          expect(vp.currentSlide).toStrictEqual(
            slides.slides.length + startSlide
          );
        });
      });
    });

    test(`a negative number (larger than slides.length), ${shouldBe} an overflow value`, () => {
      const startSlide = -8;
      vp.setAttribute("start-slide", `${startSlide}`);
      vp.slides = slides;
      return vp.connectedCallback().then(() => {
        return waitForSlidesToBeSet(vp, 5000).then(() => {
          expect(vp.currentSlide).toStrictEqual(4); // 0 should be better
        });
      });
    });
  });

  describe("hash-navigation and start-slide are", () => {
    test(`unset, ${shouldBe} 0`, () => {
      vp.slides = slides;
      return vp.connectedCallback().then(() => {
        return waitForSlidesToBeSet(vp, 5000).then(() => {
          expect(vp.currentSlide).toStrictEqual(0);
        });
      });
    });

    test(`set, hash-navigation without value, ${shouldBe} the value from start-slide`, () => {
      const startSlide = 4;
      vp.setAttribute("start-slide", `${startSlide}`);
      vp.setAttribute("hash-navigation", true);
      vp.slides = slides;
      return vp.connectedCallback().then(() => {
        return waitForSlidesToBeSet(vp, 5000).then(() => {
          expect(vp.currentSlide).toStrictEqual(startSlide - 1);
        });
      });
    });

    test(`set with the same value, ${shouldBe} that value`, () => {
      const hashAndStartSlide = 4;
      global.document.location.hash = `#${hashAndStartSlide}`;
      vp.setAttribute("start-slide", `${hashAndStartSlide}`);
      vp.setAttribute("hash-navigation", true);
      vp.slides = slides;
      return vp.connectedCallback().then(() => {
        return waitForSlidesToBeSet(vp, 5000).then(() => {
          expect(vp.currentSlide).toStrictEqual(hashAndStartSlide - 1);
        });
      });
    });

    test(`set with different values, ${shouldBe} the value from hash`, () => {
      const hash = -4;
      global.document.location.hash = `#${hash}`;
      const startSlide = 4;
      vp.setAttribute("start-slide", `${startSlide}`);
      vp.setAttribute("hash-navigation", true);
      vp.slides = slides;
      return vp.connectedCallback().then(() => {
        return waitForSlidesToBeSet(vp, 5000).then(() => {
          expect(vp.currentSlide).toStrictEqual(slides.slides.length + hash);
        });
      });
    });

    test(`set, hash-navigation changed, ${shouldBe} the changed value`, () => {
      const initialHash = -4;
      global.document.location.hash = `#${initialHash}`;
      const startSlide = 4;
      vp.setAttribute("start-slide", `${startSlide}`);
      vp.setAttribute("hash-navigation", true);
      vp.slides = slides;
      return vp.connectedCallback().then(() => {
        return waitForSlidesToBeSet(vp, 5000).then(() => {
          expect(vp.currentSlide).toStrictEqual(
            slides.slides.length + initialHash
          );
          const newHash = 5;
          global.document.location.hash = `#${newHash}`;
          return new Promise((resolve) => setTimeout(resolve, 100)).then(() => {
            expect(vp.currentSlide).toBe(newHash - 1);
          });
        });
      });
    });
  });
});
