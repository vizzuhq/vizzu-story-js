import { filterAssets } from '../chart-params/filter.js'
import { configAssets } from '../chart-params/config.js'
import { styleAssets } from '../chart-params/style.js'
import { animOptionsAssets } from '../chart-params/animOptions.js'

const slideWithMoreSteps = {
	input: {
		slides: [
			[
				{
					filter: filterAssets.filter2,
					config: configAssets.config2,
					style: styleAssets.style2,
					animOptions: animOptionsAssets.animOptions2
				},
				{
					filter: filterAssets.filter3,
					config: configAssets.config3,
					style: styleAssets.style3,
					animOptions: animOptionsAssets.animOptions3
				}
			]
		]
	},
	expected: [
		[
			{
				target: {
					data: { filter: filterAssets.filter2 },
					config: configAssets.config2,
					style: styleAssets.style2
				},
				options: animOptionsAssets.animOptions2
			},
			{
				target: {
					data: { filter: filterAssets.filter3 },
					config: configAssets.config3,
					style: styleAssets.style3
				},
				options: animOptionsAssets.animOptions3
			}
		]
	]
}

export { slideWithMoreSteps }
