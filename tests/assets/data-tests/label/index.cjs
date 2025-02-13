const nolabel = require('./nolabel')
const basic = require('./basic')
const olympics = require('./olympics.cjs')

const testCases = [
	{
		name: 'nolabel',
		expected: nolabel
	},
	{
		name: 'basic',
		expected: basic
	},
	{
		name: 'olympics',
		expected: olympics
	}
]

for (const testCase of testCases) {
	for (const key in testCase.expected) {
		if (Array.isArray(testCase.expected[key])) {
			testCase.expected[key] = testCase.expected[key].sort()
		}
	}
}

module.exports = testCases
