# Vue Point Table

Table component that support freeze column, fix header when scrolling down, and manage column visibility

## Installation

### Install Package

```
npm i vue-point-table
```

or

```
yarn add vue-point-table
```

### Import Globally

```javascript
import PointTable from 'vue-point-table'

Vue.use(PointTable)
```

### Import Inside Component

```javascript
import PointTable from 'vue-point-table'

export default {
  components: {
    PointTable
  }
}
```

## Usage

### Using Props

Template

```html
<div id="app">
  <vue-table :data="users"/>
</div>
```

Scripts

```javascript
import PointTable from './components/Table'
import users from './users.json'

export default {
  name: 'app',
  components: {
    PointTable
  },
  data () {
    return {
      users: users
    }
  }
}
```

### Using Slot

```html
<div id="app">
  <point-table>
    <template slot="p-head">
        <tr>
          <th>Name</th>
          <th>Address</th>
          <th>Phone</th>
        </tr>
    </template>
    <template slot="p-filter">
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
```

### Rename Header

```html
<div id="app">
  <vue-table v-bind:data="users" v-bind:headers="headers"></vue-table>
</div>
```

```javascript
var app = new Vue({
  el: '#app',
  data: {
    users: [
      {
        "id": 1,
        "first_name": "John",
        "last_name": "Doe",
        "gender": "male",
        "age": 24,
        "email": "johndoe@point.red",
      },      
    ],
    headers: {
      "id": "ID",
      "first_name": "First Name",
      "last_name": "Last Name",
      "gender": "Gender",
      "age": "Age",
      "email": "Email",
    }
  }
})
```