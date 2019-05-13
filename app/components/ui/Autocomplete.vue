<template>
  <div>
    <form :class="$style.autocomplete">
      <input :class="$style.input" :placeholder="placeholder" @focus="showOptions" @blur="hideOptions" @keyup="autocomplete" @keyup.down="arrowDown" @keyup.up="arrowUp" @keyup.enter="enter" type="text" v-model="query" ref="input">
      <div :class="[$style.options, inputFocus? $style.active : '']">
        <div :class="$style.progress" v-if="loading">Loading ...</div>
        <div v-else>
          <div v-if="items && items.length">
            <ul :class="$style.optionsList">
              <li :class="[$style.option, index === arrowCount? $style.active : '']" v-for="(item, index) in items" :key="item.id" @mousedown="select(item)">{{item.name}}</li>
            </ul>
          </div>
          <div :class="$style.noMatches" v-else>
            No matches
          </div>
        </div>
      </div>
      <button @click.prevent="autocomplete">Search</button>
    </form>
  </div>
</template>

<script>
  import _ from 'lodash';

  export default {
    props: [
      'loading',
      'items',
      'placeholder',
      'delay'
    ],
    data() {
      return {
        query: "",
        selectedItem: null,
        inputFocus: false,
        arrowCount: -1
      }
    },
    methods: {
      autocomplete(event) {
        if (!event.key) {
          return;
        }
        if (event.key === "ArrowUp" || event.key === "ArrowDown" || event.key === "Enter") {
          return;
        }
        //return _.throttle(function() {
        this.$emit('fetch', this.query);
        //}, 1000)
      },
      arrowDown() {
        if (this.arrowCount < this.items.length-1) {
          this.arrowCount++;
        }
      },
      arrowUp() {
        if (this.arrowCount > 0) {
          this.arrowCount--;
        }
      },
      enter() {
        this.select(this.items[this.arrowCount]);
        this.$refs.input.blur();
      },
      select(item) {
        this.query = item.name
        const match = this.items.filter(item => item.name === this.query);

        if (match.length > 0) {
          this.selectedItem = match[0].id;
          this.$emit('select', this.selectedItem);
        }
      },
      showOptions() {
        this.inputFocus = true;
      },
      hideOptions() {
        this.inputFocus = false;
      }
    }
  }
</script>

<style module>
  .noMatches, .progress {
    padding: var(--spacing);
  }

  .autocomplete {
    display: flex;
    position: relative;
    & .input {
      font-family: var(--type);
      background: rgba(255,255,255,.05);
      color: rgba(255,255,255,.4);
      font-size: inherit;
      flex-grow: 1;
      margin-right: var(--spacing);
      border: 0;
      border-radius: var(--border-radius);
      padding: 0 var(--spacing);
      transition: background-color 0.5s ease;
      &:focus {
        outline: none;
        color: #000;
        background-color: #fff;
        &::placeholder {
          color: #000;
        }
      }
      &::placeholder {
        color: rgba(255,255,255,.4);
        font-family: var(--type);
      }
    }
  }

  .options {
    display: none;
    z-index: 100;
    position: absolute;
    top: calc(100% + var(--spacing-half));
    left: 0;
    right: calc(102.94px + var(--spacing));
    background-color: var(--overlay-background-color);
    border: 0;
    border-radius: var(--border-radius);
    @media(--sm-viewport) {
      right: 0;
    }

    & .optionsList {
      margin: 0;
      padding-left: 0;
      list-style: none;
    }

    & .option {
      padding: var(--spacing-half) var(--spacing);
      &:hover, &.active {
        background-color: rgba(255,255,255,.1)
      }
      &:before {
        content: none;
      }
    }

    &.active {
      display: block;
    }
  }
</style>
