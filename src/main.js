import Vue from 'vue';
import axios from 'axios';
import Buefy from 'buefy';
import ActionCableVue from 'actioncable-vue';
import App from './App.vue';
import router from './router';
import store from './store';
import 'buefy/dist/buefy.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './registerServiceWorker';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
 
library.add(faSignOutAlt)
 
Vue.component('font-awesome-icon', FontAwesomeIcon)


Vue.use(Buefy, { defaultIconComponent: 'font-awesome-icon', defaultIconPack: 'fas' });
Vue.use(ActionCableVue, { debug: true, debugLevel: 'error', connectionUrl: `ws://${process.env.VUE_APP_WS}/cable` })

axios.defaults.baseURL = `${process.env.VUE_APP_API}/api/v1`;
axios.defaults.headers.post['Content-Type'] = 'application/json';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
