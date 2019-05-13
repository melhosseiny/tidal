<template>
  <div>
    <div :class="$style.progress" v-if="loading">
      <div :class="$style.mock">
        <div :class="[$style.item, $style.header]"></div>
        <div :class="$style.item"></div>
        <div :class="$style.item"></div>
        <div :class="$style.item"></div>
      </div>
    </div>
    <div v-else>
      <div :class="$style.albumTracklist" v-if="selectedAlbum">
        <img :class="$style.cover" :src="selectedAlbum.cover" :alt="selectedAlbum.title">
        <h2 :class="$style.albumTitle">
          <span>{{selectedAlbum.title}}</span>
          <span :class="$style.released">{{selectedAlbum.release_date | released }}</span>
        </h2>
        <ul :class="$style.tracklist">
          <li :class="[$style.track,$style.header]">
            <span :class="[$style.meta, $style.position]">#</span>
            <span :class="[$style.meta, $style.title]">Title</span>
            <span :class="[$style.meta, $style.artist]">Artist</span>
            <span :class="[$style.meta, $style.time]">Time</span>
            <span :class="[$style.meta, $style.released]">Released</span>
          </li>
          <li :class="$style.track" v-for="track in tracklist">
            <span :class="[$style.meta, $style.position]">{{track.track_position}}</span>
            <span :class="[$style.meta, $style.title]" :title="track.title">{{track.title}}</span>
            <span :class="[$style.meta, $style.artist]" :title="track.artist.name">{{track.artist.name}}</span>
            <span :class="[$style.meta, $style.time]">{{track.duration | duration}}</span>
            <span :class="[$style.meta, $style.released]">{{selectedAlbum.release_date | released}}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex';

export default {
  props: [
    'albumId'
  ],
  data() {
    return {
      loading: false
    }
  },
  computed: {
    ...mapState({
      selectedAlbum: state => state.selectedAlbum,
      tracklist: state => state.tracklist
    })
  },
  methods: {
    ...mapActions({
      fetchTracklist: 'fetchTracklist'
    })
  },
  watch: {
    selectedAlbum(newSelectedAlbum, oldSelectedAlbum) {
      if (!newSelectedAlbum) return;
      this.loading = true;
      this.fetchTracklist(newSelectedAlbum.id)
        .then(
          (tracklist) => {
            this.loading = false;
          }
        ).catch(error => console.log(error));
    }
  }
}
</script>

<style module>
  @keyframes pulse {
    0% { opacity: 0.75; }
    50% { opacity: 1; }
    100% { opacity: 0.75; }
  }

  /* progress */
  .progress {
    & .mock {
      display: flex;
      flex-direction: column;
      max-width: 320px;
      & .item {
        display: flex;
        flex: 0 0 auto;
        width: 100%;
        height: var(--spacing-half);
        margin-bottom: var(--spacing);
        background-color: rgba(255,255,255,0.1);
        animation: pulse 1000ms linear infinite forwards;
        &.header {
          flex: 0 0 auto;
          width: 50%;
        }
      }
    }
  }

  .albumTracklist {
    position: relative;
    & .cover {
      position: absolute;
      top: 0;
      left: 16px;
      box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12), 0 2px 4px -1px rgba(0, 0, 0, 0.4);
      @media(--sm-viewport) {
        display: none;
      }
    }
    & .albumTitle {
      color: var(--primary-color);
      @media(--gt-sm-viewport) {
        padding-left: calc(140px + var(--spacing));
      }
      & .released {
        color: #fff;
        font-weight: normal;
      }
    }
  }
  .tracklist {
    display: flex;
    flex-direction: column;
    border-radius: 2px;
    & .track {
      display: flex;
      flex-direction: row;
      background-color: rgba(255,255,255,0.075);
      transition: background-color 0.5s ease;
      @media(--gt-sm-viewport) {
        padding-left: 140px;
      }
      &:last-child {
        & .meta:not(.position) {
          border-bottom: 0;
        }
      }
      &:before {
        content: none;
      }
      &:hover {
        cursor: pointer;
        background-color: rgba(255,255,255,.1);
      }
      &.header {
        background-color: transparent;
        border: 0;
        & .meta {
          font-weight: bold;
        }
      }
      & .meta {
        padding: var(--spacing);
        text-align: left;
        box-sizing: border-box;
        &:not(.position) {
          border-bottom: 1px solid var(--background-color);
        }
        &.title, &.artist {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        &.title {
          flex-grow: 1;
        }
        &.position {
          flex: 0 0 56px;
        }
        &.artist {
          flex: 0 1 150px;
          max-width: 150px;
          @media(--md-viewport) {
            display: none;
          }
        }
        &.time {
          flex: 0 0 80px;
        }
        &.released {
          flex: 0 0 120px;
          text-align: center;
          @media(--md-viewport) {
            display: none;
          }
        }
      }
    }
  }
</style>
