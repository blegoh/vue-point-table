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
import PointTable from './components/PointTable'
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

### Using Slot with extra header table

```html
<div id="app">
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
