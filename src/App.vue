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

    <section class="section">
      <div class="container">
        <h1 class="title">Full Table</h1>
        <point-table>
          <template slot="p-head">
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Phone</th>
            </tr>
          </template>
          <template slot="p-body">
            <tr>
              <td>John Doe</td>
              <td>21 Street</td>
              <td>+627314691</td>
            </tr>
            <tr>
              <td>John Doe</td>
              <td>22 Street</td>
              <td>+627314692</td>
            </tr>
            <tr>
              <td>John Doe</td>
              <td>23 Street</td>
              <td>+627314693</td>
            </tr>
          </template>
        </point-table>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <h1 class="title">Full Table</h1>
        <point-table>
          <template slot="p-extra">
            <tr>
              <th colspan="2"></th>
              <th colspan="6">19 Nov</th>
            </tr>
            <tr>
              <th colspan="2"></th>
              <th colspan="3">Target</th>
              <th colspan="3">Actual</th>
            </tr>
          </template>
          <template slot="p-head">
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Call</th>
              <th>Ec</th>
              <th>Value</th>
              <th>Call</th>
              <th>Ec</th>
              <th>Value</th>
            </tr>
          </template>
          <template slot="p-body">
            <tr>
              <td>1</td>
              <td>Adhi Lorraine</td>
              <td>5</td>
              <td>3</td>
              <td>750000</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
            </tr>
            <tr>
              <td>1</td>
              <td>Bagas Saputra</td>
              <td>5</td>
              <td>3</td>
              <td>750000</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
            </tr>
            <tr>
              <td>1</td>
              <td>Bagus</td>
              <td>5</td>
              <td>3</td>
              <td>650000</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
            </tr>
          </template>
        </point-table>
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
