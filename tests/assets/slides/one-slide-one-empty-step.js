const slidesWithOneSlideWithOneEmptyStep = [];

slidesWithOneSlideWithOneEmptyStep.push({
  description: "object step",
  input: {
    slides: [{}],
  },
  expected: [[[{ target: { data: {} } }]]],
});

slidesWithOneSlideWithOneEmptyStep.push({
  description: "list step",
  input: {
    slides: [[{}]],
  },
  expected: [[[{ target: { data: {} } }]]],
});

export { slidesWithOneSlideWithOneEmptyStep };
