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

module.exports = testCases
