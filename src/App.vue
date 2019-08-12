<template>
  <div id="app">
    <Navbar />
    <Alert />
    <router-view/>
  </div>
</template>

<script>

import { mapActions, mapGetters } from 'vuex';
import router from './router';
import store from './store';
import Navbar from "./components/Navbar";
import Alert from "./components/Alert";

export default {
  components: {
    Navbar,
    Alert
  },

  channels: {
    MatchNotificationChannel: {
      received(data) {
        this.alert({ type: 'success', message: data['message'] })
      }
    },

    ChatChannel: {
      received(data) {
        this.alert({ type: 'info', message: `Você recebeu uma mensage de ${data.messages[0].name}` })
        this.pushMessage({ message: data })
      }
    }
  },

  computed: {
    ...mapGetters(['isGeolocationEnabled', 'accountToken'])
  },

  watch: {
    isGeolocationEnabled(newValue) {
      if(newValue) router.push('/');
    },

    accountToken(newValue) {
      this.performConnectionBasedOnToken(newValue);
    }
  },

  mounted() {
    this.performConnectionBasedOnToken(this.accountToken);
  },

  methods: {
    ...mapActions('Notification', ['alert']),
    ...mapActions('Message', ['pushMessage']),

    performConnectionBasedOnToken(token) {
      if(token) {
        this.$cable.subscribe({ channel: 'MatchNotificationChannel', token: token });
        this.$cable.subscribe({ channel: 'ChatChannel', token: token });
      } else {
        this.$cable.unsubscribe('MatchNotificationChannel');
        this.$cable.unsubscribe('ChatChannel');
      }
    }
  }
}
</script>
