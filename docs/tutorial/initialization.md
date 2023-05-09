# Initialization

## Import

In a script module element import the extension from `CDN` or local install:

```
<script type="module">
  import VizzuPlayer from 
  'https://cdn.jsdelivr.net/npm/vizzu-story@latest/dist/vizzu-story.min.js';
</script>
```

## Constructor

In order to initialize a `VizzuPlayer` with a `VizzuController` that will
contain the rendered `story`, create a `vizzu-player` `HTML` element:

```
<vizzu-player controller></vizzu-player>
```

## Size

`Vizzu-Story` tries to apply the ideal size for the story, but you can also set
them manually via the `width` and `height` style properties of the
`vizzu-player` `HTML` element:

Set size in `HTML`

```
<head>
  <style>
    vizzu-player {
      width: 100%;
      height: 400px;
    }
  </style>
</head>
<body>
  <vizzu-player controller></vizzu-player>
</body>
```

or in `JavaScript`:

```javascript
const vp = document.querySelector('vizzu-player');
vp.style.cssText = 'width: 100%;height: 400px;';
```

## HTML attributes

### vizzu-url

`Vizzu-Story` requires and downloads the
[Vizzu](https://github.com/vizzuhq/vizzu-lib) `JavaScript`/`C++`
[library](https://www.jsdelivr.com/package/npm/vizzu) from `jsDelivr CDN`, but
you can also use a different or self-hosted version of it.

Set `Vizzu` via the `vizzu-url` `HTML` attribute

```
<vizzu-player controller vizzu-url="<url>/vizzu.min.js"></vizzu-player>
```

or add it to `window`:

```javascript
import Vizzu from '<url>/vizzu.min.js';


window.Vizzu = Vizzu;
```

### hash-navigation and start-slide

If you add `hash-navigation` attribute, slides can be selected using the `URL`
hash (`#` part), for example `presentation.html#3` selects slide `3`.

```
<vizzu-player controller hash-navigation></vizzu-player>
```

You can also start the story on a specific slide via the `start-slide` `HTML`
attribute:

```
<vizzu-player controller hash-navigation start-slide="3"></vizzu-player>
```

### custom-spinner

You can use a custom loading animation. Set spinner via the `custom-spinner`
`HTML` attribute:

```
<vizzu-player controller custom-spinner="loadinganim.svg"></vizzu-player>
```
