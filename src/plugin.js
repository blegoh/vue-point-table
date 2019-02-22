import PointTable from './components/PointTable.vue'

const Plugin = {
  install (Vue, options) {
    Vue.component('point-table', PointTable)
  }
}

export default Plugin
