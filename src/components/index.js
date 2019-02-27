import PointTable from './PointTable'

export default {
  install (Vue, options) {
    // Add a component or directive to your plugin, so it will be installed globally to your project.
    Vue.component('point-table', PointTable)
    // Add `Vue.mixin()` to inject options to all components.
    Vue.mixin({
      // Add component lifecycle hooks or properties.
      created () {
        console.log('Point Table component created hook!')
      }
    })
  }
}
