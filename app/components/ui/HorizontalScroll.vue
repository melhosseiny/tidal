<template>
  <div :class="$style.itemsContainer">
    <ul :class="$style.items" ref="items">
      <li :class="$style.item" v-for="item in items">
        <slot :item="item">
        </slot>
      </li>
    </ul>
    <button :disabled="requestIds.length > 0" :class="$style.leftButton" @click="left">
      <i class="material-icons">keyboard_arrow_left</i>
    </button>
    <button :disabled="requestIds.length > 0" :class="$style.rightButton" @click="right">
      <i class="material-icons">keyboard_arrow_right</i>
    </button>
  </div>
</template>

<script>
  import intersectionObserver from 'intersection-observer';

  const placeholderGIF = "data:image/gif;base64,R0lGODlhqgCqAAAAACH5BAEAAAAALAAAAACqAKoAAAICTAEAOw==";

  let linear = function(t,b,e,d) {
    return (e-b)*t/d + b;
  }

  export default {
    props: [
      'itemWidth',
      'items'
    ],
    data() {
      return {
        requestIds: [],
        page: 1,
        groupSize: 5,
        itemRightMargin: 10,
        viewPortWidth: 0,
        lazyImageObserver: null
      }
    },
    computed: {
      pages() {
        return Math.ceil(this.items.length / this.groupSize);
      },
      itemTotalWidth() {
        return this.itemWidth + this.itemRightMargin;
      },
      groupWidth() {
        return this.groupSize * this.itemTotalWidth;
      }
    },
    mounted () {
      this.viewPortWidth = this.$refs.items.clientWidth;
      this.visibleItemCount();
      window.addEventListener('resize', () => {
        this.viewPortWidth = this.$refs.items.clientWidth;
        this.visibleItemCount();
      })
      this.lazyLoad();
    },
    methods: {
      lazyLoad() {
        let lazyImages = [].slice.call(this.$refs.items.querySelectorAll("img.lazy"));
        let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
          entries.forEach(function(entry) {
            if (entry.isIntersecting) {
              let lazyImage = entry.target;
              lazyImage.src = lazyImage.dataset.src;
              lazyImage.classList.remove("lazy");
              lazyImage.classList.add("lazy-loaded");
              lazyImageObserver.unobserve(lazyImage);
            }
          });
        }, {
          root: this.$refs.items,
          threshold: 0.5
        });

        this.lazyImageObserver = lazyImageObserver;

        lazyImages.forEach(function(lazyImage) {
          lazyImageObserver.observe(lazyImage);
        });
      },
      resetLazyLoad() {
        let lazyImages = [].slice.call(this.$refs.items.querySelectorAll("img.lazy-loaded"));

        let lazyImageObserver = this.lazyImageObserver;
        lazyImages.forEach(function(lazyImage) {
          lazyImage.src = placeholderGIF;
          lazyImage.classList.remove("lazy-loaded");
          lazyImage.classList.add("lazy");
          lazyImageObserver.unobserve(lazyImage);
        });
      },
      visibleItemCount() {
        this.groupSize = Math.ceil(this.viewPortWidth/this.itemTotalWidth);
      },
      cancelAllAnimationFrames() {
        this.requestIds.forEach(r => cancelAnimationFrame(r));
        this.requestIds = [];
      },
      animateScrollLeft(node, from, to, t) {
        if (from < to) {
          node.scrollLeft = linear(t, from, to, 300);
          if (node.scrollLeft + this.viewPortWidth >= node.scrollWidth) {
            this.cancelAllAnimationFrames();
            return;
          }
        } else if (from > to) {
          node.scrollLeft = linear(t, from, to, 300);
          if (from <= 0) {
            this.cancelAllAnimationFrames();
            return;
          }
        } else {
          this.cancelAllAnimationFrames();
          return;
        }

        const requestId = requestAnimationFrame(
          () => this.animateScrollLeft(node, node.scrollLeft, to, t+10)
        );
        this.requestIds.push(requestId);
      },
      left() {
        if (this.page > 1) this.page--;
        const scrollLeft = this.$refs.items.scrollLeft - this.groupWidth;
        this.animateScrollLeft(this.$refs.items, this.$refs.items.scrollLeft, scrollLeft, 0);
      },
      right() {
        if (this.page < this.pages) this.page++;
        const scrollLeft = this.$refs.items.scrollLeft + this.groupWidth;
        this.animateScrollLeft(this.$refs.items, this.$refs.items.scrollLeft, scrollLeft, 0);
      },
      reset() {
        this.$refs.items.scrollLeft = 0;
        this.page = 1
      }
    },
    watch: {
      items (newItems, oldItems) {
        this.resetLazyLoad();
        this.lazyLoad();
        this.reset();
      }
    }
  }
</script>

<style module>
  .itemsContainer {
    position: relative;
    --item-size: 170px;
  }

  .items {
    display: flex;
    flex-direction: row;
    padding-left: 0;
    overflow-x: auto;
    &::-webkit-scrollbar {
      display: none;
    }
    scrollbar-width: none;
    -ms-overflow-style: none;
  }

  .item {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    flex: 0 0 var(--item-size);
    width: var(--item-size);
    min-height: var(--item-size);
    margin-right: 10px;
    & figure {
      display: block;
      background-color: rgba(255,255,255,0.1);
      margin-bottom: 8px;
      & img {
        display: block;
        width: var(--item-size);
        height: var(--item-size);
        transition: opacity 0.5s ease;
        &:hover {
          cursor: pointer;
          opacity: 0.5;
        }
      }
    }
    &:before {
      content: none;
    }
  }

  .item:last-child {
    margin-right: 0;
  }

  .leftButton, .rightButton {
    position: absolute;
    top: 0;
    height: 170px;
    background: none;
    border: 0;
    border-radius: 0;
    color: #fff;
    margin: 0;
    padding: 0;
    &:hover {
      background-color: transparent;
    }
    & :global(.material-icons) {
      font-size: 36px;
    }
  }

  .leftButton {
    left: 0;
    background: linear-gradient(to left, rgba(0,0,0,0), color-mod(var(--background-color) a(0.8)));
  }

  .rightButton {
    right: 0;
    background: linear-gradient(to right, rgba(0,0,0,0), color-mod(var(--background-color) a(0.8)));
  }
</style>
