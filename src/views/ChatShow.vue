<template>
  <section class="section">
    <div class="chat">

    </div>
  </section>
</template>

<style lang="scss" scoped>
  section.section {
    padding: 0.5em;

    div.loading {
      padding-top: 10em;

      h1 {
        margin-top: 1em;
      }
    }

    div.empty-selection-list {
      h1 {
        margin-top: 7em;
      }
    }
  }
</style>


<script>
  import { mapActions, mapState } from 'vuex';
  import UserMatch from '../components/UserMatch.vue';

  export default {

    components: {
      UserMatch
    },

    computed: {
      ...mapState('Match', ['selectionList', 'loading', 'currentSelection', 'likePerformed'])
    },

    watch: {
      loading(newValue) {
        if(!newValue) this.setCurrentSelection(0);
      },

      likePerformed(newValue) {
        if(newValue) this.changeCurrentSelection();
      },
    },

    methods: {
      ...mapActions('Match', ['loadSelectionList', 'setCurrentSelection']),
      ...mapActions(['loadGeolocation']),

      changeCurrentSelection() {
        let indexOfCurrent = this.selectionList.indexOf(this.currentSelection);
        if(this.selectionList.length > (indexOfCurrent + 1) ) {
          this.setCurrentSelection(indexOfCurrent + 1);
        } else {
          this.loadSelectionList();
        }
      }
    },

    mounted() {
      this.loadGeolocation();
      if(this.selectionList.length == 0) this.loadSelectionList();
    },
  }
</script>
