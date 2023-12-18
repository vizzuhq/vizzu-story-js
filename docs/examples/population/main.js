// Import VizzuPlayer
// eslint-disable-next-line no-unused-vars
import VizzuPlayer from 'https://cdn.jsdelivr.net/npm/vizzu-story@latest/dist/vizzu-story.min.js'
import Csv2Js from '../../assets/javascripts/csv2js.js'

// Get the created element
const vp = document.querySelector('vizzu-player')
// Set the size of the HTML element
vp.style.cssText = 'width: 100%; height: 400px;'
// Initializing Vizzu Player
const vpInitialized = vp.initializing

// Create data object
const dataLoaded = Csv2Js.csv('./population.csv', { dimensions: ['Year'] })

// Because using presets here, you need to
// create the configuration object after initialization
// (then presets are accessible via vp.Vizzu.presets)
Promise.all([dataLoaded, vpInitialized]).then((results) => {
	const data = results[0]
	const chart = results[1]

	// Switch on the tooltip that appears
	// when the user hovers the mouse over a chart element
	chart.feature('tooltip', true)

	// Each slide here is a page in the final interactive story
	const slides = [
		{
			filter: (record) => record.Continent === 'Africa',
			style: { plot: { xAxis: { label: { angle: 2.0 } } } },
			config: vp.Vizzu.presets.stackedArea({
				x: 'Year',
				y: 'Medium',
				stackedBy: 'Subregion',
				title: 'Population of Africa 1953-2098'
			})
		},
		{
			config: vp.Vizzu.presets.percentageArea({
				x: 'Year',
				y: 'Medium',
				stackedBy: 'Subregion'
			})
		},
		{
			config: vp.Vizzu.presets.stream({
				x: 'Year',
				y: 'Medium',
				stackedBy: 'Subregion'
			})
		},
		{
			config: vp.Vizzu.presets.violin({
				x: 'Year',
				y: 'Medium',
				splittedBy: 'Subregion'
			})
		}
	]

	// Create story configuration object, add data and slides to it
	const story = {
		data,
		slides
	}

	// Set up the created element with the configuration object
	vp.slides = story
})
