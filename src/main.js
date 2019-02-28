import Vue from 'vue'
import App from './App.vue'
import './../node_modules/bulma/css/bulma.css'
import PointTable from 'vue-point-table'

Vue.use(PointTable)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
