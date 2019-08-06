<template>
  <section class="section">
    <div class="message">
      <div :style="{width: width}" :class="['elevation-5']">
        <vc-toolbar narrow>
          <vc-toolbar-icon-left icon="fa-bars" />
          <vc-toolbar-title>My Chat App</vc-toolbar-title>
        </vc-toolbar>
        <vc-chat
          :height="height"
          :width="width"
          :transcript="transcript" />
        <form @submit.prevent="submit" :class="['pa-16']">
          <vc-text
            autofocus
            placeholder="Type something and hit enter"
            color="primary"
            icon-left="fa-comment-dots"
            type="text"
            v-model="chat"
            name="chatbox" />
        </form>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
  
</style>


<script>
  import { mapActions, mapState } from 'vuex';
  import ChatService from '../services/chat_service.js';
  import store from '../store';
  import router from '../router'

  export default {
    data() {
      return {
        width: "300",
        height: "1000",
        chat: "",

        transcript: {
          items: []
        }
      }
    },
    computed: {

      ...mapState('Message', {
        chats: state => state.chats
      })
    },

    mounted() {
      this.appendMessages();
    },

    methods: {
      appendMessages() {
        this.transcript["items"] = this.chats[0].messages;
      }
    }
  }
</script>
