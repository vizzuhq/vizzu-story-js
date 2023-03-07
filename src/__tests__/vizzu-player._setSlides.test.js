import VizzuPlayer from "../vizzu-player.js";

import { slides } from "./assets/slides.js";

import VizzuMock from "../__mocks__/vizzu.js";

global.window.Vizzu = VizzuMock;

describe("VizzuPlayer class", () => {
  describe("_setSlides method", () => {
    it("should throw error if slides do not contain slides", () => {
      const vizzuPlayer = new VizzuPlayer();
      return vizzuPlayer.connectedCallback().then(() => {
        const passedSlides = {};
        return expect(
          vizzuPlayer._setSlides(passedSlides)
        ).rejects.toMatchObject(TypeError("slides.slides is not iterable"));
      });
    });

    it.each(slides)(
      "should return valid slides if %s",
      (name, passedSlides, expectedSlides) => {
        const vizzuPlayer = new VizzuPlayer();
        return vizzuPlayer.connectedCallback().then(() => {
          return vizzuPlayer._setSlides(passedSlides).then(() => {
            expect(vizzuPlayer.slides).toStrictEqual(expectedSlides);
          });
        });
      }
    );
  });
});
