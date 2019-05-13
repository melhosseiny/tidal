import Vue from 'vue';
import Vuex from 'vuex';

import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    selectedArtist: null,
    selectedAlbum: null,
    artists: [],
    albums: [],
    tracklist: []
  },
  actions: {
    setSelectedArtist({commit}, artistId) {
      commit('setSelectedArtist', artistId)
    },
    setSelectedAlbum({commit}, album) {
      commit('setSelectedAlbum', album)
    },
    fetchArtists({commit}, q) {
      return new Promise((resolve, reject) => {
        axios.get(`search/artist`, {
          params: {
            q: q
          }
        })
        .then(res => {
          commit('setArtists', res.data);
          resolve(res.data);
        })
        .catch(error => reject(error))
      })
    },
    fetchAlbums({commit}, artistId) {
      return new Promise((resolve, reject) => {
        axios.get(`albums/${artistId}`)
          .then(res => {
            commit('setAlbums', res.data);
            resolve(res.data);
          })
          .catch(error => reject(error))
      });
    },
    fetchTracklist({commit}, albumId) {
      return new Promise((resolve, reject) => {
        axios.get(`tracklist/${albumId}`)
          .then(res => {
            commit('setTracklist', res.data)
            resolve(res.data);
          })
          .catch(error => reject(error))
      })
    }
  },
  mutations: {
    setSelectedArtist(state, artistId) {
      state.selectedArtist = artistId;
    },
    setSelectedAlbum(state, albumId) {
      state.selectedAlbum = albumId;
    },
    setArtists(state, artists) {
      state.artists = artists;
    },
    setAlbums(state, albums) {
      state.albums = albums;
    },
    setTracklist(state, tracklist) {
      state.tracklist = tracklist;
    }
  }
})
