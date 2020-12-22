# Tidal Discovery

[Vue 2](https://github.com/vuejs/vue) app that implements music catalog discovery using the [Deezer API](https://developers.deezer.com/).

![App screenshot on desktop](/static/tidal-screenshot-desktop.png)

[Live demo](https://shrouded-lowlands-75769.herokuapp.com/)

## Build

1. `npm install` to install dependencies
2. `npm run watch` to run webpack
3. `npm start` to start the app at `localhost:5000`

You can also run `npm run build` to build the app for production.

## Lighthouse score

    Performance 98
    Accessibility 100
    Best Practices 93
    SEO 92

## Design notes

- Deezer doesn't enable CORS and Axios doesn't support JSONP, so I call Deezer's API server side and expose it to the client

      /search/artist?q=:q&limit=10
      /albums/:artistId
      /tracklist/:albumId

- The `Albums` component uses the slot outlet exposed by `HorizontalScroll` to add its content without `HorizontalScroll` having to know about the structure of an album data item. This works by binding the item to the slot element in the child component which makes slot props accessible in the parent scope.

- Application state lives in a Vuex store, but passed down using props to user interface components to avoid coupling them to the application data format.

- Filters such as `duration` are registered globally since they're likely to be used across application components.

- Album covers are lazy loaded upon scrolling using the Intersection Observer API. Since it is not supported in all browsers, I added a polyfill. I used a tiny base64 transparent GIF as a placeholder.

      data:image/gif;base64,R0lGODlhqgCqAAAAACH5BAEAAAAALAAAAACqAKoAAAICTAEAOw==

- I used content placeholders and a pulse animation to indicate progress on asynchronous data operations.  

      @keyframes pulse {
        0% { opacity: 0.75; }
        50% { opacity: 1; }
        100% { opacity: 0.75; }
      }

      animation: pulse 1000ms linear infinite forwards;
