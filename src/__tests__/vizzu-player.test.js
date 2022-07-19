import VizzuPlayer from "../vizzu-player.js";

describe("test VizzuPlayer class", () => {
  describe("test _setSlides() method", () => {
    test("test without slides ", () => {
      const vp = new VizzuPlayer();
      const slides = {};
      return expect(vp._setSlides(slides)).rejects.toMatchObject(
        TypeError("slides.slides is not iterable")
      );
    });

    test("test with slides - slides is an empty list", () => {
      const vp = new VizzuPlayer();
      const slides = {
        slides: [],
      };
      return vp._setSlides(slides).then(() => {
        expect(vp.slides).toStrictEqual([]);
      });
    });
  });
});
