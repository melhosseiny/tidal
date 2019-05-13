<template>
  <div>
    <div :class="$style.progress" v-if="loading">
      <div :class="$style.mock">
        <div :class="$style.item"></div>
        <div :class="$style.item"></div>
        <div :class="$style.item"></div>
      </div>
    </div>
    <div v-else>
      <HorizontalScroll v-if="albums.length" :items="albums" :itemWidth="170">
        <template v-slot:default="slotProps">
          <figure>
            <img class="lazy" @click.prevent="select(slotProps.item)" src="data:image/gif;base64,R0lGODlhqgCqAAAAACH5BAEAAAEALAAAAACqAKoAADs=" :data-src="slotProps.item.cover_medium" :alt="slotProps.item.title">
          </figure>
          <a href="#" @click.prevent="select(slotProps.item)">{{slotProps.item.title}}</a>
        </template>
      </HorizontalScroll>
      <div v-else>
        No albums found
      </div>
    </div>
  </div>
</template>

<script>
import {HorizontalScroll} from './ui';
import {mapState, mapActions} from 'vuex';

export default {
  props: [
    'artistId'
  ],
  data() {
    return {
      loading: false
    }
  },
  components: {
    HorizontalScroll
  },
  computed: {
    ...mapState({
      selectedArtist: state => state.selectedArtist,
      albums: state => state.albums
    })
  },
  methods: {
    ...mapActions({
      setSelectedAlbum: 'setSelectedAlbum',
      fetchAlbums: 'fetchAlbums'
    }),
    select(album) {
      this.setSelectedAlbum(album);
    }
  },
  created() {
    this.loading = true;
    this.fetchAlbums(this.artistId)
      .then(
        (albums) => {
          this.loading = false;
        }
      );
  },
  watch: {
    selectedArtist (newSelectedArtist, oldSelectedArtist) {
      this.fetchAlbums(newSelectedArtist);
      this.setSelectedAlbum(null);
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
      flex-direction: row;
      overflow-x: hidden;
      & .item {
        display: flex;
        flex: 0 0 170px;
        width: 170px;
        height: 170px;
        margin-right: var(--spacing);
        background-color: rgba(255,255,255,0.1);
        animation: pulse 1000ms linear infinite forwards;
      }
    }
  }
</style>
