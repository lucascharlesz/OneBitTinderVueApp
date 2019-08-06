import ChatService from '../services/chat_service.js';
import MatchService from '../services/match_service.js';

export default {
  namespaced: true,

  state: {
    chats: [],
    matches: [],
    currentMatch: ""
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
    }
  },

  actions: {
    getChats(context) {
      context.commit("getChats")
    },
    loadMatches(context) {
      context.commit("loadMatches")
    }
  }
}