window.onbeforeunload = function() {
    window.scrollTo(0, 0);
}

import VizzuSlides from '../src/vizzu-slides.js';
import data from './data.js';
import style from './style.js';

function labelHandler(event) {
	let Year = parseFloat(event.data.text);
	if (!isNaN(Year) && Year > 1950 && Year < 2020 && Year % 5 != 0)
		event.preventDefault();
}

let myVizzuSlides = new VizzuSlides('#vizzuWrapper',
[
    [   //1. slide
    chart => chart.animate({
        data: Object.assign(data, {
				filter: record => record.Function != 'Defense',
			}),
            config: {
                channels: {
                    y: {
						set: ['Amount[B$]', 'Function'],
						range: {
							min: '0%',
							max: '100%'
						}
					},
					x: {
						set: ['Year']
					},
					color: 'Function'
				},
				title: 'U.S. Non-Defense R&D Budget by Functions',
				geometry: 'area'
			},
            style: style,
        }),
    ],
    [   //2. slide
        chart => {
			chart.on('plot-axis-label-draw', labelHandler);
			return chart.animate({
				config: {
					title: 'Share of Total Expenditures %',
					align: 'stretch'
				}
			});
		},
    ],
    [   //3. slide
        chart => chart.animate({
			data: {
				filter: record => record.Function == 'Health' || record.Function == 'Space'
			},
			config: {
				title: 'Compare Space & Health',
				align: 'min',
				split: true
			}
		}),        
    
        chart => chart.animate({
			data: {
				filter: record => record.Function != 'Defense',
			},
			config: {
				title: 'All Non-defense Functions Side-by-Side',
				align: 'min',
				split: true
			}
		}),
    ],
    [   //4. slide
        chart => chart.animate({
			data: {
				filter: null,
			},
			config: {
				title: 'Show Defense Expenditures',
				split: false
			}
		}),

        chart => chart.animate({
			data: {
				filter: record => record.Function == 'Defense'
			},
			config: {
				title: 'Defense Expenditures',
				align: 'min'
			}
		}),
    ],
    [   //5. slide
        chart => chart.animate({
			data: {
				filter: null,
			},
			config: {
				title: 'Total U.S. R&D Budget',
			}
		})

    ],
        
]
);

myVizzuSlides.initialized.then(() => {
    console.log("MySlides init");
	myVizzuSlides.playAnim(0,0);
});

