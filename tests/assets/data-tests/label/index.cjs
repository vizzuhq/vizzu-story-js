const basic = require('./basic')
const olympics = require('./olympics.cjs')

const testCases = [
	{
		name: 'basic',
		excepted: basic
	},
	{
		name: 'olympics',
		excepted: olympics
	}
]

module.exports = testCases
