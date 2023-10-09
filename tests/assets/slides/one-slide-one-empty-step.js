const slidesWithOneSlideWithOneEmptyStep = []

slidesWithOneSlideWithOneEmptyStep.push({
  description: 'object step',
  input: {
    slides: [{}]
  },
  expected: [[{ target: { config: {}, style: {} } }]]
})

slidesWithOneSlideWithOneEmptyStep.push({
  description: 'list step',
  input: {
    slides: [[{}]]
  },
  expected: [[{ target: { config: {}, style: {} } }]]
})

export { slidesWithOneSlideWithOneEmptyStep }
