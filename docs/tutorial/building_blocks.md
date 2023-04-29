# Building blocks

Create the data story by defining a sequence of slides. A slide can be a single
chart corresponding to a single
[animate](https://lib.vizzuhq.com/latest/tutorial/) call from `Vizzu`. Or a
slide can be a sequence of animation calls, in which case all of these
animations will be played until the last one in the sequence, allowing for more
complex transitions between slides. Navigation controls beneath the chart will
navigate between the slides. You can use the `PgUp` and `PgDn` buttons, left and
right arrows to navigate between slides, and the `Home` and `End` buttons to
jump to the first or last slide.

```javascript
const slides = [{
    config: {
        x: 'Foo',
        y: 'Bar'
    }
}, {
    config: {
        color: 'Foo',
        x: 'Baz',
        geometry: 'circle'
    }
}]
```

On each chart, you can define the chart configuration and style with the same
objects as in `Vizzu`. However, you can not modify the underlying data between
the slides, only the data filter used.

```typescript
interface Chart
{
  config?: Vizzu.Config.Chart;
  filter?: Vizzu.Data.FilterCallback | null;
  style?: Vizzu.Styles.Chart;
}
```

Put the data object and the slide list into the story descriptor object. Here
you can also set the `story` objects `style` property to set the chart style
used for the whole story.

```javascript
const story = {
    data: data,
    slides: slides
}
```

Then set up the created element with the configuration object:

```javascript
const vp = document.querySelector("vizzu-player");
vp.slides = story;
```
