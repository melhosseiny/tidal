# Tidal Discovery

This is a Vue.js app that utilizes the Deezer API to implement music catalog discovery.

## Live demo

I deployed the app using Heroku at https://shrouded-lowlands-75769.herokuapp.com/. I added a `robots.txt` to block web crawlers.

## Lighthouse score

    Performance 98
    Accessibility 100
    Best Practices 93
    SEO 90

## Build setup

1. `npm install` to install dependencies
2. `npm run watch` to run webpack
3. `npm start` to start the app at `localhost:5000`

You can also run `npm run build` to build the app for production.

## Supported (tested) browsers

I use the following `browserslist` config

    "browserslist": [
      "last 1 version",
      "> 1%",
      "maintained node versions",
      "not dead"
    ],

However, `IE11` is not supported.

## Application structure

    app/
      assets/           --> Global assets such as custom CSS props
      components/       --> Vue single file components
        ui/             --> Tiny UI library
      filters/          --> Vue filter functions
      router/           --> App routes
      store/            --> Vuex store files
    app.js              --> Main app entry
    App.vue             --> Root component
    dist/               --> Webpack build output
    static/             --> Static files such as robots.txt
    babel.config.js     --> Babel config
    index.html          --> Root markup template
    postcss.config.js   --> PostCSS config
    Procfile            --> Heroku Procfile
    server.mjs          --> Express server
    webpack.config.*    --> Webpack config

## Frameworks/Libraries

- Client web framework: [Vue](https://vuejs.org/)
- Server web framework: [Express](https://expressjs.com/)
- ECMAScript compiler: [Babel](https://babeljs.io/)
- Module bundler: [Webpack](https://webpack.js.org/)
- CSS processor: [PostCSS](https://postcss.org/)
- HTTP Client: [Axios](https://github.com/axios/axios)
- Date/time library: [Luxon](https://moment.github.io/luxon/)

## Design notes

- Deezer doesn't enable CORS and Axios doesn't support JSONP, so I call Deezer's API server side and expose it to the client

      /search/artist?q=:q&limit=10
      /albums/:artistId
      /tracklist/:albumId

- Instead of using a user interface library, I built autocomplete and carousel components and abstracted their inner workings from application components.

- The `Albums` component uses the slot outlet exposed by `HorizontalScroll` to add its content without `HorizontalScroll` having to know about the structure of an album data item. This works by binding the item to the slot element in the child component which makes **slot props** accessible in the parent scope.

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

- I really, really wanted to include unit tests using [Vue Test Utils](https://vue-test-utils.vuejs.org/) and [Jest](https://jestjs.io/) or [Storybook](https://storybook.js.org/) visual testing.

## Babel config

- [preset-env](https://babeljs.io/docs/en/babel-preset-env) to automatically manage syntax transforms.
- [plugin-syntax-dynamic-import](https://babeljs.io/docs/en/babel-plugin-syntax-dynamic-import) to transform `() => import()` syntax.

## PostCSS config

- [CSS Modules](https://github.com/css-modules/css-modules) to locally scope style rules
- [autoprefixer](https://github.com/postcss/autoprefixer) to automatically add vendor prefixes
- [postcss-preset-env](https://preset-env.cssdb.org/) to use modern CSS features such as custom props, custom media queries and nesting rules
- [cssnano](https://cssnano.co/) to compress CSS

## Webpack config

### Common

- [vue-loader](https://vue-loader.vuejs.org/) to load single-file components
- [babel-loader](https://github.com/babel/babel-loader) to transpile JavaScript files using babel
- [clean-webpack-plugin](https://github.com/johnagan/clean-webpack-plugin) to clean build folder

### Dev

- mode set to `development`
- Inline source maps
- `postcss-loader` to process CSS with PostCSS

### Prod

- mode set to `production`
- [mini-css-extract-plugin](https://github.com/webpack-contrib/mini-css-extract-plugin) to avoid flash of unstyled content

Dev/prod configs are merged with the common config using [webpack-merge](https://github.com/survivejs/webpack-merge).

## Repo guidelines

- [Commit template](http://programmers.stackexchange.com/questions/42110/can-you-recommend-a-good-commit-message-template-guidelines-to-enforce-in-the)
