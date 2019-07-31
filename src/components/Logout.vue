<template>
  <div class="column is-12 flex-column">
    <div class="buttons">
      <b-button @click=logout
        type="is-danger"
        size="is-fullwidth"
        icon-left="sign-out-alt">
        Sign out
      </b-button>
  </div>
</template>

<style lang="scss" scoped>
  div.alert-user {
    margin-top: 0px;
  }
</style>


<script>

import store from '../store';
import { mapActions } from 'vuex';

export default {
  methods: {
    ...mapActions(['logout'])
  },

  computed: {
    loggedIn() {
      return store.getters['isLoggedIn']
    }
  }
}

</script>