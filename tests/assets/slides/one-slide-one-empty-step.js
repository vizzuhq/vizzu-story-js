const slidesWithOneSlideWithOneEmptyStep = []

slidesWithOneSlideWithOneEmptyStep.push({
  description: 'object step',
  input: {
    slides: [{}]
  },
  expected: [[{ target: { config: {}, style: {}, data: { filter: null} } }]]
})

slidesWithOneSlideWithOneEmptyStep.push({
  description: 'list step',
  input: {
    slides: [[{}]]
  },
  expected: [[{ target: { config: {}, style: {}, data: { filter: null} } }]]
})

export { slidesWithOneSlideWithOneEmptyStep }
