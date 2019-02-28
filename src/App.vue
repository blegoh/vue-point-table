<template>
  <div id="app">
    <section class="hero is-info">
      <div class="hero-body">
        <div class="container">
          <h1 class="title has-text-centered">
            Vue Point Table
          </h1>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <h1 class="title">Simple Table</h1>
        <point-table :data="streets"/>
      </div>
    </section>

    <hr>

    <section class="section">
      <div class="container">
        <h1 class="title">Full Table</h1>
        <point-table :data="posts"/>
      </div>
    </section>
  </div>
</template>

<script>
import PointTable from './components/PointTable'
import posts from './posts.json'
import streets from './street.json'

export default {
  name: 'app',
  components: {
    PointTable
  },
  data () {
    return {
      streets: streets,
      posts: posts
    }
  }
}
</script>
