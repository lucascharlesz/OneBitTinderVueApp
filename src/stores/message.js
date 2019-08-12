import ChatService from '../services/chat_service.js';
import MatchService from '../services/match_service.js';
import store from '../store'

export default {
  namespaced: true,

  state: {
    chats: [],
    matches: [],
    currentChat: null
  },

  mutations: {
    getChats(state) {
      ChatService.load().then(chats => {
        state.chats = chats;
      })
    },
    loadMatches(state) {
      MatchService.loadMyMatches().then(matches => {
        state.matches = matches;
      })
    },
    pushMessage(state, message) {
      state.chats.push(message);
    },
    setCurrentChat(state, match_id) {
      state.currentChat = match_id;
    },
  },

  actions: {
    getChats(context) {
      context.commit("getChats");
    },
    loadMatches(context) {
      context.commit("loadMatches");
    },
    pushMessage(context, { message }) {
      console.log(message);
      context.commit("pushMessage", message);
    },
    setCurrentChat(context, { match_id }) {
      context.commit("setCurrentChat", match_id)
    },
    sendMessage(context, { message }) {
      this.msg = {
        message: {
          match_id: context.state.currentChat,
          body: message
        }
      }

      ChatService.sendMessage(this.msg).then(data => {
        context.commit("pushMessage", data);
      }, (error) => {
        store.dispatch('Notification/alert', { type: 'danger', message: 'Falha ao enviar mensagem.' });
      });
    }
  },

  getters: {
    chats(state) {
      return state.chats;
    },
    currentMatch(state){
      return state.currentChat;
    }
  }
}
