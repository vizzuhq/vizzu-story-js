# Tutorial

This is an excellent starting point to get acquainted with `Vizzu-Story`, as it
walks you through the installation and initialization of the extension,
introduces the logic it employs and the different settings to control how your
animated data stories look and behave.

The tutorial is organized into chapters that introduce the concept and the
details of `Vizzu-Story` step-by-step. You can find the list of chapters at the
end of this page and in the menu.

Since `Vizzu-Story` is built on top of
[Vizzu](https://github.com/vizzuhq/vizzu), it's recommended that you learn and
understand `Vizzu` first. The tutorial for `Vizzu` can be found
[here](https://lib.vizzuhq.com/latest/tutorial/).

## Basic logic of Vizzu-Story

With `Vizzu-Story`, you can build and show a `story` object that contains all of
the data being shown throughout the story and the charts created based on that
data, arranged into `slides` and `steps`. When played,`Vizzu-Story`
automatically adds a set of buttons underneath the chart, via which the users
can navigate between the `slides` within the story.

`slides` can contain one or more `steps`.

A `step` (and a single-step `slide`) is basically the same as a single chart
corresponding to an [animate](https://lib.vizzuhq.com/latest/tutorial/) call
from `Vizzu`, with some minor, but important differences (for now):

- all of the data has to be added to the story at initialization, and it can be
  filtered at every `step` throughout the `story`.
- animation options are not available

In case of a `slide` with multiple `steps`, all, but the last `steps` are
interim charts that connect a `slide` with a previous `slide` but the animation
will not stop at these `steps` when the `story` is being played.

## Installation

Install via [npm](https://www.npmjs.com/package/vizzu-story):

```sh
npm install vizzu-story
```

Or use it from [CDN](https://www.jsdelivr.com/package/npm/vizzu-story):

```javascript
import VizzuPlayer from 'https://cdn.jsdelivr.net/npm/vizzu-story@latest/dist/vizzu-story.min.js';
```

Visit [Installation chapter](../installation.md) for more options and details.

## Usage
