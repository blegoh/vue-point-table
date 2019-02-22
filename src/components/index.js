import Vue from 'vue'
import PointTable from './PointTable'

const Components = {
  PointTable
}

Object.keys(Components).forEach(name => {
  Vue.component(name, Components[name])
})

export default Components