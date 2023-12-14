const slidesWithOneSlideWithOneEmptyStep = []

slidesWithOneSlideWithOneEmptyStep.push({
	description: 'object step',
	input: {
		slides: [{}]
	},
	expected: [[{ target: { data: { filter: null }, config: {}, style: {} } }]]
})

slidesWithOneSlideWithOneEmptyStep.push({
	description: 'list step',
	input: {
		slides: [[{}]]
	},
	expected: [[{ target: { data: { filter: null }, config: {}, style: {} } }]]
})

export { slidesWithOneSlideWithOneEmptyStep }
