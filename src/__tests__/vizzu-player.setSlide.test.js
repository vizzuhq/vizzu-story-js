import { jest } from "@jest/globals";

import VizzuPlayer from "../vizzu-player.js";

import VizzuMock from "../__mocks__/vizzu.js";
import { story } from "./assets/slides.js";

describe("VizzuPlayer class", () => {
  describe("setSlide method", () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it("should not call _update if slides are not set", () => {
      const vizzuPlayer = new VizzuPlayer();
      const _updateMock = jest.spyOn(vizzuPlayer, "_update");
      return vizzuPlayer.setSlide(0).then(() => {
        expect(_updateMock).not.toHaveBeenCalled();
      });
    });

    it("should not call _update if not acquire lock", () => {
      const vizzuPlayer = new VizzuPlayer();
      vizzuPlayer._slides = story[2];
      vizzuPlayer._locked = true;
      const _updateMock = jest.spyOn(vizzuPlayer, "_update");
      return vizzuPlayer.setSlide(0).then(() => {
        expect(_updateMock).not.toHaveBeenCalled();
      });
    });

    it("should call _update if slides are not empty and acquire lock", () => {
      const vizzuPlayer = new VizzuPlayer();
      vizzuPlayer.vizzu = new VizzuMock();
      vizzuPlayer._slides = story[2];
      vizzuPlayer._locked = false;
      const _updateMock = jest.spyOn(vizzuPlayer, "_update");
      return vizzuPlayer.setSlide(0).then(() => {
        expect(_updateMock).toHaveBeenCalledTimes(2);
      });
    });
  });
});
