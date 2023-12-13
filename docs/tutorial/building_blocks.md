# Building blocks

In `Vizzu-Story`, you can build and show a `story` object that contains all of
the data being shown throughout the story and the charts created based on that
data, arranged into `slides` and `steps`.

## Slides and steps

Create the data story by defining a sequence of slides. A slide can be a single
chart corresponding to an [animate](https://lib.vizzuhq.com/latest/tutorial/)
call from `Vizzu`. Or a slide can be a sequence of animation calls, in which
case all of these animations will be played until the last one in the sequence,
allowing for more complex transitions between slides.

```javascript
const slides = [
    // This slide contains a single animation step
    {
        config: {
            x: 'Foo',
            y: 'Bar'
        }
    },
    // This slide contains multiple steps
    [{
        config: {
            color: 'Foo',
            x: 'Baz',
            geometry: 'circle'
        }
    }, {
        config: {
            color: 'Foo',
            x: 'Baz',
            geometry: 'rectangle'
        }
    }],
];
```

Navigation controls beneath the chart will navigate between the slides. You can
use the `PgUp` and `PgDn` buttons, left and right arrows to navigate between
slides, and the `Home` and `End` buttons to jump to the first or last slide.

On each chart, you can define the chart configuration and style with the same
objects as in `Vizzu`. However, you can not modify the underlying data between
the slides, only the data filter used.

```typescript
interface Chart {
  config?: Vizzu.Config.Chart;
  filter?: Vizzu.Data.FilterCallback | null;
  style?: Vizzu.Styles.Chart;
  animOptions?: Vizzu.Anim.Options;
}
```

```javascript
const slides = [
    // This slide sets config, filter, style and animOptions
    {
        config: {
            x: 'Foo',
            y: 'Bar'
        },
        filter: record => record['Foo'] === 'Bob',
        style: {
            plot: {
                marker: {
                    colorPalette: '#FF0000'
                }
            }
        },
        animOptions: {
            duration: 1
        }
    }
];
```

!!! tip
    Check
    [Vizzu - Filtering & adding new records chapter](https://lib.vizzuhq.com/latest/tutorial/filter_add_new_records/)
    and [Vizzu - Style chapter](https://lib.vizzuhq.com/latest/tutorial/style/)
    for more details on data filtering and style options.

## Story

Put the `data` object (described in the [Data chapter](./data.md)) and the slide
list into the `story` descriptor object.

```javascript
const story = {
    data: data,
    slides: slides
};
```

Here you can also set the `story` `style` property to set the chart style used
for the whole `story`.

```javascript
const style = {
    title: {
        fontSize: 50
    }
};

const story = {
    data: data,
    style: style,
    slides: slides
};
```

Then set up the created element with the configuration object:

```javascript
const vp = document.querySelector('vizzu-player');
vp.slides = story;
```

## Chart features

You can enable or disable chart features, such as the `Tooltip` that appears if
the viewer hovers their mouse over a specific element of the chart.

```javascript
vp.initializing.then((chart) => {
    chart.feature("tooltip", true);
});
```

!!! tip
    See
    [Vizzu - Axes, title, tooltip chapter](https://lib.vizzuhq.com/latest/tutorial/axes_title_tooltip/)
    for more details on chart features.

## Chart events

You have many more options to change the look and feel of the `story` by using
events.

```javascript
vp.initializing.then((chart) => {
    chart.on("click", (event) => {
        alert(JSON.stringify(event.detail))
    });
});
```

!!! tip
    See
    [Vizzu - Events chapter](https://lib.vizzuhq.com/latest/tutorial/events/)
    for more details on events.
