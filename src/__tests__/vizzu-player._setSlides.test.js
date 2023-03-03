import VizzuPlayer from "../vizzu-player.js";

import Vizzu from "../__mocks__/vizzu.js";
import { slides } from "./assets/slides.js";

describe("VizzuPlayer class", () => {
  describe("_setSlides method", () => {
    it("should throw error if slides do not contain slides", () => {
      const vizzuPlayer = new VizzuPlayer();
      vizzuPlayer.vizzu = new Vizzu();
      const passedSlides = {};
      return expect(vizzuPlayer._setSlides(passedSlides)).rejects.toMatchObject(
        TypeError("slides.slides is not iterable")
      );
    });

    it.each(slides)(
      "should return valid slides if %s",
      (name, passedSlides, expectedSlides) => {
        const vizzuPlayer = new VizzuPlayer();
        vizzuPlayer.vizzu = new Vizzu();
        return vizzuPlayer._setSlides(passedSlides).then(() => {
          expect(vizzuPlayer.slides).toStrictEqual(expectedSlides);
        });
      }
    );
  });
});
