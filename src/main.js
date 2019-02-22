import Vue from 'vue'
import Demo from './Demo.vue'
import PointTable from './components/PointTable'

Vue.config.productionTip = false

Vue.use(PointTable)

new Vue({
  render: h => h(Demo)
}).$mount('#app')
