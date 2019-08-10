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
        height: "300",
        chat: "",

        transcript: {
          items: []
        }
      }
    },
    computed: {
      ...mapState('Message', {
        chats: state => state.chats,
        currentChat: state => state.currentChat
      })
    },

    watch: {
      chats(newValue) {
        console.log(newValue)
        if (typeof(newValue) == "object")
          this.transcript["items"].push(newValue[newValue.length - 1].messages[0])
      }
    },

    mounted() {
      this.initializeMessages();
    },

    methods: {
      initializeMessages() {
        this.transcript["items"] = this.chats
                                       .filter((message) => { return message.match_id === this.currentChat } )
                                       .reduce((prevVal, item) => { return prevVal.concat(item.messages) }, []);                                  
      },
      submit() {
        this.sendMessage({message: this.chat});
        this.chat = ''
      },
      ...mapActions('Message', ['sendMessage'])
    }
  }
</script>
