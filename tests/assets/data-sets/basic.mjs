const vizzuPlayerData = {
	data: {
		series: [
			{
				name: 'Foo',
				values: ['Alice', 'Bob', 'Ted']
			},
			{
				name: 'Bar',
				values: [15, 32, 12]
			},
			{
				name: 'Baz',
				values: [5, 3, 2]
			}
		]
	},
	slides: [
		[
			{
				config: {
					x: 'Foo',
					y: 'Bar',
					label: 'Bar'
				}
			}
		],
		[
			{
				filter: (record) => record.Foo === 'Bob',
				config: {
					color: 'Foo',
					x: 'Baz',
					label: 'Baz',
					geometry: 'circle'
				}
			}
		]
	]
}

export default vizzuPlayerData
