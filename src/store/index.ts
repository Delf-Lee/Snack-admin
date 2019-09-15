import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import auth from './auth';

Vue.use(Vuex);

const store: StoreOptions<IRootState> = {
  modules: {
    auth
  }
};

export default new Vuex.Store(store);
