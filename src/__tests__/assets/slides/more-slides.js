import { slidesWithOneSlideWithOneStep } from "./one-slide-one-step.js";
import { slideWithMoreSteps } from "./one-slide-more-steps.js";

import lodashClonedeep from "lodash.clonedeep";

const slidesWithMoreSlides = generateSlides();

export { slidesWithMoreSlides };

function generateSlides() {
  const slidesWithMoreSlides = [];
  slidesWithOneSlideWithOneStep.forEach((slide) => {
    const oneStepAsObjectSlidePlusMoreStepsSlide =
      generateOneStepAsObjectSlidePlusMoreStepsSlide(slide);
    slidesWithMoreSlides.push(oneStepAsObjectSlidePlusMoreStepsSlide);

    const oneStepAsListSlidePlusMoreStepsSlide =
      generateOneStepAsListSlidePlusMoreStepsSlide(slide);
    slidesWithMoreSlides.push(oneStepAsListSlidePlusMoreStepsSlide);

    const moreStepsSlidePlusOneStepAsObjectSlide =
      generateMoreStepsSlidePlusOneStepAsObjectSlide(slide);
    slidesWithMoreSlides.push(moreStepsSlidePlusOneStepAsObjectSlide);

    const moreStepsSlidePlusOneStepAsListSlide =
      generateMoreStepsSlidePlusOneStepAsListSlide(slide);
    slidesWithMoreSlides.push(moreStepsSlidePlusOneStepAsListSlide);
  });
  return slidesWithMoreSlides;
}

function generateOneStepAsObjectSlidePlusMoreStepsSlide(slide) {
  const slides = lodashClonedeep(slide);
  slides.description = `slide1(object step with ${slides.description}), slide2(more steps)`;
  slides.input.slides.push(lodashClonedeep(slideWithMoreSteps.input.slides[0]));
  slides.expected.push(lodashClonedeep(slideWithMoreSteps.expected[0]));
  return slides;
}

function generateOneStepAsListSlidePlusMoreStepsSlide(slide) {
  const slides = lodashClonedeep(slide);
  slides.description = `slide1(list step with ${slides.description}), slide2(more steps)`;
  slides.input.slides[0] = [slides.input.slides[0]];
  slides.input.slides.push(lodashClonedeep(slideWithMoreSteps.input.slides[0]));
  slides.expected.push(lodashClonedeep(slideWithMoreSteps.expected[0]));
  return slides;
}

function generateMoreStepsSlidePlusOneStepAsObjectSlide(slide) {
  const slides = lodashClonedeep(slideWithMoreSteps);
  slides.description = `slide1(more steps), slide2(object step with ${slide.description})`;
  slides.input.slides.push(lodashClonedeep(slide.input.slides[0]));
  const expected = lodashClonedeep(slide.expected[0]);
  if (!expected[0][0].target.data.filter) {
    delete expected[0][0].target.data;
  }
  slides.expected.push(expected);
  return slides;
}

function generateMoreStepsSlidePlusOneStepAsListSlide(slide) {
  const slides = lodashClonedeep(slideWithMoreSteps);
  slides.description = `slide1(more steps), slide2(list step with ${slide.description})`;
  slides.input.slides.push(lodashClonedeep([slide.input.slides[0]]));
  const expected = lodashClonedeep(slide.expected[0]);
  if (!expected[0][0].target.data.filter) {
    delete expected[0][0].target.data;
  }
  slides.expected.push(expected);
  return slides;
}
