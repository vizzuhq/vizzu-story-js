import { slidesWithOneSlideWithOneStep } from './one-slide-one-step.js'
import { slideWithMoreSteps } from './one-slide-more-steps.js'

import lodashClonedeep from 'lodash.clonedeep'

const slidesWithMoreSlides = generateSlides()

export { slidesWithMoreSlides }

function addPreviousSlideLastKeyframeToExpected(expected) {
  return expected.map((keyFrame, key) => {
    if (key === 0) return keyFrame

    return [expected[key - 1].at(-1), ...keyFrame]
  })
}

function addLastFilterToExpected(expected) {
  let lastFilter
  return expected.map((keyFrame, key) => {
    return keyFrame.map((keyFrameItem) => {
      if (
        keyFrameItem.target.data &&
        'filter' in keyFrameItem.target.data &&
        keyFrameItem.target.data.filter !== null
      ) {
        lastFilter = keyFrameItem.target.data.filter
      } else if (lastFilter) {
        keyFrameItem.target.data = { filter: lastFilter }
      }
      return keyFrameItem
    })
  })
}

function generateSlides() {
  const slidesWithMoreSlides = []
  slidesWithOneSlideWithOneStep.forEach((slide) => {
    const oneStepAsObjectSlidePlusMoreStepsSlide =
      generateOneStepAsObjectSlidePlusMoreStepsSlide(slide)
    oneStepAsObjectSlidePlusMoreStepsSlide.expected = addPreviousSlideLastKeyframeToExpected(
      oneStepAsObjectSlidePlusMoreStepsSlide.expected
    )
    slidesWithMoreSlides.push(oneStepAsObjectSlidePlusMoreStepsSlide)

    const oneStepAsListSlidePlusMoreStepsSlide = generateOneStepAsListSlidePlusMoreStepsSlide(slide)
    oneStepAsListSlidePlusMoreStepsSlide.expected = addPreviousSlideLastKeyframeToExpected(
      oneStepAsListSlidePlusMoreStepsSlide.expected
    )
    slidesWithMoreSlides.push(oneStepAsListSlidePlusMoreStepsSlide)

    const moreStepsSlidePlusOneStepAsObjectSlide =
      generateMoreStepsSlidePlusOneStepAsObjectSlide(slide)
    moreStepsSlidePlusOneStepAsObjectSlide.expected = addLastFilterToExpected(
      moreStepsSlidePlusOneStepAsObjectSlide.expected
    )
    moreStepsSlidePlusOneStepAsObjectSlide.expected = addPreviousSlideLastKeyframeToExpected(
      moreStepsSlidePlusOneStepAsObjectSlide.expected
    )
    slidesWithMoreSlides.push(moreStepsSlidePlusOneStepAsObjectSlide)

    const moreStepsSlidePlusOneStepAsListSlide = generateMoreStepsSlidePlusOneStepAsListSlide(slide)
    moreStepsSlidePlusOneStepAsListSlide.expected = addLastFilterToExpected(
      moreStepsSlidePlusOneStepAsListSlide.expected
    )
    moreStepsSlidePlusOneStepAsListSlide.expected = addPreviousSlideLastKeyframeToExpected(
      moreStepsSlidePlusOneStepAsListSlide.expected
    )
    slidesWithMoreSlides.push(moreStepsSlidePlusOneStepAsListSlide)
  })
  return slidesWithMoreSlides
}

function generateOneStepAsObjectSlidePlusMoreStepsSlide(slide) {
  const slides = lodashClonedeep(slide)
  slides.description = `slide1(object step with ${slides.description}), slide2(more steps)`
  slides.input.slides.push(slideWithMoreSteps.input.slides[0])
  slides.expected.push(slideWithMoreSteps.expected[0])
  return slides
}

function generateOneStepAsListSlidePlusMoreStepsSlide(slide) {
  const slides = lodashClonedeep(slide)
  slides.description = `slide1(list step with ${slides.description}), slide2(more steps)`
  slides.input.slides[0] = [slides.input.slides[0]]
  slides.input.slides.push(slideWithMoreSteps.input.slides[0])
  slides.expected.push(slideWithMoreSteps.expected[0])
  return slides
}

function generateMoreStepsSlidePlusOneStepAsObjectSlide(slide) {
  const slides = lodashClonedeep(slideWithMoreSteps)
  slides.description = `slide1(more steps), slide2(object step with ${slide.description})`
  slides.input.slides.push(slide.input.slides[0])
  const expected = lodashClonedeep(slide.expected[0])
  slides.expected.push(expected)
  return slides
}

function generateMoreStepsSlidePlusOneStepAsListSlide(slide) {
  const slides = lodashClonedeep(slideWithMoreSteps)
  slides.description = `slide1(more steps), slide2(list step with ${slide.description})`
  slides.input.slides.push([slide.input.slides[0]])
  const expected = lodashClonedeep(slide.expected[0])
  slides.expected.push(expected)
  return slides
}
