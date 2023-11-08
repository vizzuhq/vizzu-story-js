const olympics = require("./olympics.cjs")
const basic = require("./basic")

const cases = [
	{
		name: "Basic",
		slides: basic.vizzuPlayerData,
		excepted: basic.excepted
	},
	// Too large :(
/* 	{
		name: "Olympics",
		slides: olympics.vizzuPlayerData,
		excepted: olympics.excepted
	} */
]

module.exports = cases;