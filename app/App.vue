<template>
  <main id="main">
    <router-view/>
  </main>
</template>

<script>
import Discovery from './components/Discovery.vue';

export default {
  name: 'App',
  components: {
    Discovery,
  }
}
</script>

<style module>
  @import url('assets/props.css');

  /* reset */
  html, body, section, nav, article, aside, h1, h2, h3,
  h4, h5, h6, hgroup, header, footer, address, p, hr, pre,
  blockquote, ol, ul, li, dl, dt, dd, figure, figcaption,
  div, table, caption, form, fieldset {
    vertical-align: baseline;
    margin: 0;
    padding: 0;
  }

  /* layout */
  header {
    padding: var(--spacing);
  }

  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-grow: 1;
    margin: 1em;
  }

  /* color */
  body {
    background-color: var(--background-color);
    color: var(--text-color);
  }

  header {
    background: #000;
    color: #fff;
  }

  /* typography */
  body {
    font-size: 1rem;
    line-height: 1.375; /* 22px */
    font-family: var(--type);
    font-feature-settings: "liga" 1, "onum" 1, "kern" 1;
    @media (--gt-md-viewport) {
      font-size: 1rem;
      line-height: 1.375;
    }
    @media (--gt-lg-viewport) {
      font-size: 1.25rem;
      line-height: 1.3;
    }
  }

  @supports (font-variant-ligatures: common-ligatures) {
    body {
      font-feature-settings: normal;
      font-variant-ligatures: common-ligatures;
      font-variant-numeric: oldstyle-nums;
    }
  }

  @supports (kerning: normal) {
    body {
      font-feature-settings: normal;
      kerning: normal;
    }
  }

  h1, h2, h3, h4, h5, h6 {
    font-feature-settings: "onum" 0;
  }

  @supports (font-variant-ligatures: common-ligatures) {
    h1, h2, h3, h4, h5, h6 {
    font-feature-settings: normal;
      font-variant-numeric: lining-nums;
    }
  }

  h1 {
    text-transform: uppercase;
    text-align: center;
    margin-top: 1em;
    margin-bottom: 1em;
  }

  h3, h4, h5, h6 {
    font-weight: normal;
  }

  h1, h2, h3, h4, h5, h6 {
    font-size: 1rem; /* 16px */
    line-height: 1.375;
    @media (--gt-md-viewport) {
      font-size: 1rem; /* 20px */
      line-height: 1.375;
    }
    @media (--gt-lg-viewport) {
      font-size: 1.25rem; /* 26px */
      line-height: 1.3;
    }
  }

  h3, abbr {
    hyphens: manual;
    text-transform: lowercase;
    font-feature-settings: "smcp" 1, "c2sc" 1;
  }

  @supports (font-variant-caps: all-small-caps) {
    h3, abbr {
      font-feature-settings: normal;
      font-variant-caps: all-small-caps;
    }
  }

  .caps { letter-spacing: 0.05em; } /* add 5% spacing */

  sub { font-feature-settings: "subs" 1; }

  @supports (font-variant-position: sub) {
    sub {
      font-feature-settings: normal;
      font-variant-position: sub;
    }
  }
  @supports ((font-variant-position: sub) or (font-feature-settings: "subs" 1)) {
    sub {
      vertical-align: inherit;
      font-size: inherit;
    }
  }

  sup {
    font-feature-settings: "sups" 1;
  }

  @supports (font-variant-position: super) {
    sup {
      font-feature-settings: normal;
      font-variant-position: super;
    }
  }
  @supports ((font-variant-position: super) or (font-feature-settings: "sups" 1)) {
    sup {
      vertical-align: inherit;
      font-size: inherit;
    }
  }

  article {
    max-width: 38em;
  }

  p {
    hyphens: auto;
    hyphenate-limit-lines: 2;
    hyphenate-limit-chars: 6 3 2;
    hyphenate-limit-zone: 8%;
    hyphenate-limit-last: always;
    margin-top: 0;
    margin-bottom: 1.375em;
    color: var(--text-color);
    @media (--gt-md-viewport) {
      font-size: 1rem;
      margin-bottom: 1.375em;
    }
    @media (--gt-lg-viewport) {
      font-size: 1.25rem;
      margin-bottom: 1.3em;
    }
  }

  hr {
    border-color: rgba(0,0,0,.12);
    border-width: 1px 0 0;
    margin: 0;
    box-sizing: content-box;
    height: 0;
    margin-bottom: 1em;
  }

  ul, ol {
    padding-left: 0;
    margin-left: 0;
    margin-bottom: 1em;
    list-style: none;
    counter-reset: mylist;
  }

  ul li:before {
    counter-increment: mylist;
    content: '\2022';
    margin-right: 0.5em;
  }

  ol li:before {
    counter-increment: mylist;
    content: counter(mylist);
    margin-right: 0.5em;
    font-weight: 600;
  }

  /* Hyperlinks: LVFHA */
  a, a:link, a:visited, a:hover, a:active {
    color: var(--primary-color);
    text-decoration: none;
    transition: color 0.5s ease;
  }

  a:visited {
    color: #0ff;
  }

  a:hover, a:active {
    color: color-mod(var(--primary-color) a(0.8));
  }

  /* buttons */
  button, a:global(.btn) {
    font-family: var(--type);
    font-size: 1rem;
    background-color: var(--primary-color);
    border: 1px solid rgba(0,0,0,0.2);
    text-decoration: none;
    text-transform: uppercase;
    padding: 0 24px;
    display: inline-flex;
    position: relative;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    min-width: 64px;
    height: 48px;
    outline: none;
    user-select: none;
    -webkit-appearance: none;
    overflow: hidden;
    vertical-align: middle;
    border-radius: 4px;
    color: #000;

    &:active {
      outline: none;
    }

    &:hover {
      cursor: pointer;
      background-color: color-mod(var(--primary-color) a(0.8));
      transition: background-color 0.5s ease;
    }

    &:global(.material-icons) {
      margin-right: 8px;
    }
  }
</style>
