# Initialization

Create a `vizzu-player` element that will contain the rendered story:

```
<vizzu-player controller></vizzu-player>
```

!!! note
    You can use different version of `vizzu` with the `vizzu-url` `HTML`
    attribute.

    ```
    <vizzu-player controller vizzu-url="<url>/vizzu.min.js"></vizzu-player>
    ```

In a script module element

```html
<html>
 <head>
  <script type="module">
  </script>
 </head>
</html>

```

Import the extension from CDN or local install:

```javascript
import VizzuPlayer from 'https://cdn.jsdelivr.net/npm/vizzu-story@latest/dist/vizzu-story.min.js';
```
