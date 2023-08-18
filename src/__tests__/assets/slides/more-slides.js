import { slidesWithOneSlideAndWithOneStep } from "./one-slide-one-step.js";
import { slidesWithOneSlideAndWithMoreSteps } from "./one-slide-more-steps.js";

import lodashClonedeep from "lodash.clonedeep";

const slidesWithMoreSlides = [];
slidesWithOneSlideAndWithOneStep.forEach((slide) => {
  const oneStepSlide = lodashClonedeep(slide);
  oneStepSlide[1].slides.push(
    lodashClonedeep(slidesWithOneSlideAndWithMoreSteps[0][1].slides[0])
  );
  oneStepSlide[2].push(
    lodashClonedeep(slidesWithOneSlideAndWithMoreSteps[0][2][0])
  );
  slidesWithMoreSlides.push(oneStepSlide);

  const modifiedOneStepSlide = lodashClonedeep(slide);
  modifiedOneStepSlide[1].slides[0] = [modifiedOneStepSlide[1].slides[0]];
  modifiedOneStepSlide[1].slides.push(
    lodashClonedeep(slidesWithOneSlideAndWithMoreSteps[0][1].slides[0])
  );
  modifiedOneStepSlide[2].push(
    lodashClonedeep(slidesWithOneSlideAndWithMoreSteps[0][2][0])
  );
  slidesWithMoreSlides.push(lodashClonedeep(modifiedOneStepSlide));

  const moreStepsSlide1 = lodashClonedeep(
    slidesWithOneSlideAndWithMoreSteps[0]
  );
  moreStepsSlide1[1].slides.push(lodashClonedeep(slide[1].slides[0]));
  const modifiedOneStepRef1 = lodashClonedeep(slide[2][0]);
  if (!modifiedOneStepRef1[0][0].target.data.filter) {
    delete modifiedOneStepRef1[0][0].target.data;
  }
  moreStepsSlide1[2].push(modifiedOneStepRef1);
  slidesWithMoreSlides.push(moreStepsSlide1);

  const moreStepsSlide2 = lodashClonedeep(
    slidesWithOneSlideAndWithMoreSteps[0]
  );
  moreStepsSlide2[1].slides.push(lodashClonedeep([slide[1].slides[0]]));
  const modifiedOneStepRef2 = lodashClonedeep(slide[2][0]);
  if (!modifiedOneStepRef2[0][0].target.data.filter) {
    delete modifiedOneStepRef2[0][0].target.data;
  }
  moreStepsSlide2[2].push(modifiedOneStepRef2);
  slidesWithMoreSlides.push(moreStepsSlide2);
});

export { slidesWithMoreSlides };
