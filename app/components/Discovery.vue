<template>
  <div :class="$style.discovery">
    <Autocomplete :class="$style.search" placeholder="Search" :items="artists" :loading="loading" :delay="1000" @fetch="fetchOptions" @select="setSelectedArtist"/>
    <!--HorizontalScroll :items="Array.from(Array(15).keys()).map(k => k + 1)" :itemWidth="170"/-->
    <Albums :class="$style.albums" :artistId="13"/>
    <Tracklist :albumId="7184797"/>
  </div>
</template>

<script>
  import {Autocomplete} from './ui';
  import Albums from './Albums.vue';
  import Tracklist from './Tracklist.vue';

  import {mapState, mapActions} from 'vuex';

  export default {
    components: {
      Autocomplete,
      Albums,
      Tracklist
    },
    data() {
      return {
        loading: false
      }
    },
    computed: {
      ...mapState({
        artists: state => state.artists
      })
    },
    methods: {
      ...mapActions({
        setSelectedArtist: 'setSelectedArtist',
        fetchArtists: 'fetchArtists'
      }),
      fetchOptions(query) {
        this.loading = true;
        this.fetchArtists(query)
          .then(
            (options) => {
              this.loading = false;
            }
          ).catch(error => console.log(error));
      }
    }
  }
</script>

<style module>
  .discovery {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .albums {
    margin-top: var(--spacing-2x);
    margin-bottom: var(--spacing-2x);
  }
</style>
