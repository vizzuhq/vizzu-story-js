<p align="center">
  <a href="https://github.com/vizzuhq/vizzu-lib">
    <img src="https://github.com/vizzuhq/vizzu-lib-doc/raw/main/docs/readme/infinite-60.gif" alt="Vizzu" />
  </a>
  <p align="center"><b>Vizzu - Story</b> JavaScript Extension</p>
  <p align="center">
    <a href="https://vizzuhq.github.io/vizzu-ext-js-story/docs/">Example</a>
    · <a href="https://github.com/vizzuhq/vizzu-ext-js-story/">Repository</a>
  </p>
</p>

# About The Extension

Vizzu-Story is an extension for the [Vizzu](https://github.com/vizzuhq/vizzu-lib)
library that allows users to create interactive presentations with animated data 
visualizations.

The extension provides a Web Component to contain the Vizzu data story and adds 
controls for navigating between the story steps.

# Installation

Install via [npm](https://www.npmjs.com/package/vizzu-story):

    npm install vizzu-story

Or use it from CDN:

    https://cdn.jsdelivr.net/npm/vizzu-story@latest/dist/vizzu-story.min.js

# Usage

Create a 'vizzu-player' element that will contain the rendered story:

```html
  <vizzu-player controller></vizzu-player>
```

In a script module element

```html
<script type="module">
```

Import the extension from CDN or from local install:

```javascript
import VizzuPlayer from 'https://cdn.jsdelivr.net/npm/vizzu-story@latest/dist/vizzu-story.min.js';
```

Define the underlying data for the data story. Here you can use the same data 
definition formats of the Vizzu library. 
See [Vizzu tutorial - Data](https://lib.vizzuhq.com/latest/#chapter-0.1).

```javascript
const data = {
  series: [
    { name: 'Foo', values: ['Alice', 'Bob', 'Ted'] },
    { name: 'Bar', values: [15, 32, 12] },
    { name: 'Baz', values: [5, 3, 2] }
  ]
};
```

Define the sequence of slides, creating a data story. A slide can be a single 
transition phase, corresponding to a single '[animation()](https://lib.vizzuhq.com/latest/#chapter-0.0)' call from Vizzu.
Or can be a list of phases. The navigation controls will navigate between slides,
so with multiple phases, you can create more complex transitions.

```javascript
const slides = [
    {
      config: {
        x: 'Foo',
        y: 'Bar'
      }
    },
    {
      config: {
        color: 'Foo',
        x: 'Baz', 
        geometry: 'circle' 
      }
    }
]
```

In each phase, you can define the chart configuration and style with the same
objects as in Vizzu. However, the underlying data cannot be modified between the
slides, only the used data filter.

```typescript
interface Phase
{
  config?: Vizzu.Config.Chart;
  filter?: Vizzu.Data.FilterCallback | null;
  style?: Vizzu.Styles.Chart;
}
```

Put together the data object and the slide list into the story descriptor object.
Here you can also set the 'story' objects 'style' property to provide your style
for the whole story.

```javascript
const story = {
  data: data,
  slides: slides
}
```

Then get the created element and set it up with the configuration object:

```javascript
const vp = document.querySelector("vizzu-player");
vp.slides = story;
```

> [Try it out in JSFiddle!](https://jsfiddle.net/VizzuHQ/topcmuyf/3/)

See [vizzu-story.d.ts](https://github.com/vizzuhq/vizzu-ext-js-story/blob/main/src/vizzu-story.d.ts) 
and [vizzu.d.ts](https://cdn.jsdelivr.net/npm/vizzu@latest/dist/vizzu.d.ts) for detailed API type declarations.

Or check out the source of the example to see a more complex usage:
[code](https://github.com/vizzuhq/vizzu-ext-js-story/blob/main/docs/index.js).

# Contributing

We welcome contributions to the project, visit our [wiki page](https://github.com/vizzuhq/vizzu-lib/wiki) for further info.

# Contact

* Join our Slack: [vizzu-community.slack.com](https://join.slack.com/t/vizzu-community/shared_invite/zt-w2nqhq44-2CCWL4o7qn2Ns1EFSf9kEg)
* Drop us a line at hello@vizzuhq.com
* Follow us on twitter: [https://twitter.com/VizzuHQ](https://twitter.com/VizzuHQ)

# License

Copyright © 2022 [Vizzu Kft.](https://vizzuhq.com).

Released under the [Apache 2.0 License](https://github.com/vizzuhq/vizzu-lib/blob/main/LICENSE).
