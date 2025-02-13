const nolabel = require('./nolabel')
const basic = require('./basic')
const olympics = require('./olympics.cjs')

const testCases = [
	{
		name: 'nolabel',
		excepted: nolabel
	},
	{
		name: 'basic',
		excepted: basic
	},
	{
		name: 'olympics',
		excepted: olympics
	}
]

for (const testCase of testCases) {
	if (Array.isArray(testCase.expected)) {
		testCase.expected = testCase.expected.sort()
	}
}

module.exports = testCases
