import axios from 'axios';
import store from '../store';

export default {
  async loadSelectionList() {
    let response = await axios.get("selection_lists", { headers: store.getters['accountHeaders'] })
    return response.data;
  },
  async like(user_id, liked) {
    let response = await axios.post(`users/${user_id}/like`, { like: { liked: liked } }, { 
                                    headers: store.getters['accountHeaders'] })
    return response.data;
  }
}