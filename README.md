<p align="center">
  <a href="https://vizzu-story.vizzuhq.com/latest/">
    <img src="https://vizzu-story.vizzuhq.com/latest/assets/vizzu-story.gif" alt="Vizzu-Story" />
  </a>
  <p align="center"><b>Vizzu-Story</b> - Build and present animated data stories</p>
  <p align="center">
    <a href="https://vizzu-story.vizzuhq.com/latest/">Documentation</a>
    · <a href="https://vizzu-story.vizzuhq.com/latest/examples/">Examples</a>
    · <a href="https://vizzu-story.vizzuhq.com/latest/reference/">Code reference</a>
    · <a href="https://github.com/vizzuhq/vizzu-story-js/">Repository</a>
    · <a href="https://blog.vizzuhq.com">Blog</a>
  </p>
</p>

[![npm version](https://badge.fury.io/js/vizzu-story.svg)](https://badge.fury.io/js/vizzu-story)
[![install size](https://packagephobia.com/badge?p=vizzu-story)](https://packagephobia.com/result?p=vizzu-story)

# Vizzu-Story

## About The Extension

`Vizzu-Story` is an extension for the
[Vizzu](https://github.com/vizzuhq/vizzu-lib) `JavaScript` library that allows
users to create interactive presentations from the animated data visualizations
built with `Vizzu`.

The extension provides a `Web Component` that contains the presentation and adds
controls for navigating between slides - predefined stages within the story.

## Installation

Install via [npm](https://www.npmjs.com/package/vizzu-story):

```sh
npm install vizzu-story
```

Or use it from [CDN](https://www.jsdelivr.com/package/npm/vizzu-story):

```javascript
import VizzuPlayer from 'https://cdn.jsdelivr.net/npm/vizzu-story@latest/dist/vizzu-story.min.js'
```

## Usage

![Example story](https://vizzu-story.vizzuhq.com/latest/assets/readme-example.gif)

Create a `vizzu-player` element that will contain the rendered story:

```
<vizzu-player controller></vizzu-player>
```

In a script module element import the extension from `CDN` or local install:

```
<script type="module">
  import VizzuPlayer from 
  'https://cdn.jsdelivr.net/npm/vizzu-story@latest/dist/vizzu-story.min.js'
</script>
```

Add the underlying data for the data story. You can use the same data definition
formats as in the `Vizzu` library, but you must add the entire data set for the
whole story in the initial step; you can not change this later. See
[Data chapter](https://vizzu-story.vizzuhq.com/latest/tutorial/data/) for more
details on data formats.

```javascript
const data = {
    series: [{
        name: 'Foo',
        values: ['Alice', 'Bob', 'Ted']
    }, {
        name: 'Bar',
        values: [15, 32, 12]
    }, {
        name: 'Baz',
        values: [5, 3, 2]
    }]
}
```

Create the data story by defining a sequence of slides. A slide can be a single
chart corresponding to an [animate](https://lib.vizzuhq.com/latest/tutorial/)
call from `Vizzu`. Or a slide can be a sequence of animation calls, in which
case all of these animations will be played until the last one in the sequence,
allowing for more complex transitions between slides.

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

Navigation controls beneath the chart will navigate between the slides. You can
use the `PgUp` and `PgDn` buttons, left and right arrows to navigate between
slides, and the `Home` and `End` buttons to jump to the first or last slide.

On each chart, you can define the chart configuration and style with the same
objects as in `Vizzu`. However, you can not modify the underlying data between
the slides, only the data filter used.

```typescript
interface Chart {
  config?: Vizzu.Config.Chart
  filter?: Vizzu.Data.FilterCallback | null
  style?: Vizzu.Styles.Chart
  animOptions?: Vizzu.Anim.Options
}
```

Put the data and the slide list into the `story` descriptor object. Here you can
also set the `story` `style` property to set the chart style used for the whole
`story`.

```javascript
const story = {
    data: data,
    slides: slides
}
```

Then set up the created element with the configuration object:

```javascript
const vp = document.querySelector('vizzu-player')
vp.slides = story
```

> [Check out a live example in JSFiddle!](https://jsfiddle.net/VizzuHQ/topcmuyf/3/)

## Documentation

Visit our [Documentation site](https://vizzu-story.vizzuhq.com/latest/) for more
details and a step-by-step tutorial into `Vizzu-Story` or check out our
[Example gallery](https://vizzu-story.vizzuhq.com/latest/examples/).

## Contributing

We welcome contributions to the project; visit our
[Contributing guide](https://vizzu-story.vizzuhq.com/latest/CONTRIBUTING/) for
further info.

## Contact

- Join our Slack:
    [vizzu-community.slack.com](https://join.slack.com/t/vizzu-community/shared_invite/zt-w2nqhq44-2CCWL4o7qn2Ns1EFSf9kEg)
    

- Drop us a line at hello@vizzuhq.com

- Follow us on Twitter:
    [https://twitter.com/VizzuHQ](https://twitter.com/VizzuHQ)

## License

Copyright © 2022-2025 [Vizzu Inc.](https://vizzuhq.com)

Released under the
[Apache 2.0 License](https://vizzu-story.vizzuhq.com/latest/LICENSE/).
