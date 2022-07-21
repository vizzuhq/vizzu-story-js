import VizzuPlayer from "../vizzu-player.js";

import { slides } from "./assets/slides.js";

describe("VizzuPlayer class", () => {
  describe("_convertSlides method", () => {
    it("should throw error if slides do not contain slides", () => {
      const vizzuPlayer = new VizzuPlayer();
      const passedSlides = {};
      return expect(
        vizzuPlayer._convertSlides(passedSlides)
      ).rejects.toMatchObject(TypeError("slides.slides is not iterable"));
    });

    it.each(slides)(
      "should return valid slides if %s",
      (name, passedSlides, expectedSlides) => {
        const vizzuPlayer = new VizzuPlayer();
        return vizzuPlayer
          ._convertSlides(passedSlides)
          .then((convertedSlides) => {
            expect(convertedSlides).toStrictEqual(expectedSlides);
          });
      }
    );
  });
});
