import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

import './css/global.css'
import Trend from 'vuetrend'
Vue.use(Trend)
Vue.use(Buefy)

Vue.config.productionTip = false

Vue.prototype.$window = window

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
