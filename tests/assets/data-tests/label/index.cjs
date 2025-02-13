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

for (const testCase in testCases) {
	const excepted = testCases[testCase].excepted
	if (Array.isArray(excepted)) {
		testCases[testCase].excepted = excepted.sort()
	}
}

module.exports = testCases
