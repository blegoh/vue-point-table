<template>
<div>
  <div class="columns">
    <!-- Search Box -->
    <div class="column">
      <input 
      v-model="search"
      @keypress="page=1"
      class="input"
      type="search"
      placeholder="Search"
      aria-label="Search">
    </div>
    <!-- Number of Rows -->
    <div class="column">
      <div class="select">
        <select v-model="perPage" @change="page=1">
          <option>10</option>
          <option>15</option>
          <option>20</option>
          <option>25</option>
        </select>
      </div>
    </div>
    <!-- Freeze Column -->
    <div class="column has-text-right" v-if="!isCustomHeaders">
      <div class="select">
        <select v-model="fixedColumnChange">
          <template v-for="(value, index) in dataTable[0]">
            <option :key="value" v-if="checkedColumnComputed.indexOf(index) != -1" :value="index">
              <span>
                {{dataHeaders[index]}}
              </span>
            </option>
          </template>
        </select>
      </div>
    </div>
    <!-- Show or Hide Column -->
    <div class="column" v-if="!isCustomHeaders">
      <div @click="dropdown" :class="{'dropdown': true, 'is-active': isActive }">
        <div class="dropdown-trigger">
          <button class="button" aria-haspopup="true">
            <span>Show/hide column</span>
            <span class="icon is-small">
              <i class="fas fa-angle-down" aria-hidden="true"></i>
            </span>
          </button>
        </div>
        <div class="dropdown-menu" role="menu">
          <div class="dropdown-content">
            <div
              class="dropdown-item"
              v-for="(value, index) in dataTable[0]"
              :key="index">
              <label class="checkbox">
              <input
                type="checkbox"
                :value="index"
                :disabled="checkedColumnComputed.length == 1 && checkedColumnComputed[0] == index"
                v-model="checkedColumnComputed">
                {{dataHeaders[index]}}
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>    
  </div>
  <div :id="uuid+'horizontal-scroll'" style="overflow-x:auto;" @scroll="horizontalScroll">
    <table class="table is-bordered is-fullwidth" :id="uuid+'main-table'">
      <thead :id="'thead'+uuid">
        <tr v-for="(head, index) in dataCustomHeaders" :key="index">
          <template v-if="isCustomHeaders">
            <th
              :id="uuid+'-maintable-custom-header-'+index+'-'+i"
              v-for="(field, i) in head.fields"
              :key="i"
              :colspan="field.colSpan">
              {{field.caption}}
            </th>
          </template>
        </tr>
        <tr>
          <th
            :id="getThId('a', fixedColumnChange)"
            @click="sort(fixedColumnChange)"
            class="first">
            {{dataHeaders[fixedColumnChange]}} <i :class="icon" v-if="sortBy == fixedColumnChange"></i>
          </th>
          <template v-for="(value, key) in dataTable[0]">
            <th
              :id="getThId('a', key)"
              @click="sort(key)"
              :key="key"
              v-if="checkedColumnComputed.indexOf(key) != -1 && key != fixedColumnChange"
              :class="{'first' : checkedColumnComputed.indexOf(key) == 0}">
              {{dataHeaders[key]}} <i :class="icon" v-if="sortBy == key"></i>
            </th>
          </template>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(datum, index) in filtered" :key="index">
          <td :id="getTdId('a', index, fixedColumnChange)">{{datum[fixedColumnChange]}}</td>
          <template v-for="(value, key) in datum">
            <td
              :id="getTdId('a', index, key)"
              :key="key"
              v-if="checkedColumnComputed.indexOf(key) != -1 && key != fixedColumnChange">
              {{value}}
            </td>
          </template>
        </tr>
      </tbody>
    </table>
  </div>
  <table class="table is-bordered col-fixed" :id="uuid+'table-col'">
    <thead>
      <template v-for="(head, index) in dataCustomHeaders">
        <tr v-if="isCustomHeaders" :key="index">
          <th :id="uuid+'-col-table-custom-header-'+index">{{head.fields[0].caption}}</th>
        </tr>
      </template>
      <tr>
        <th :id="uuid+'col-fix-th'" @click="sort(fixedColumnChange)">{{dataHeaders[fixedColumnChange]}} <i
          :class="icon"
          v-if="sortBy == fixedColumnChange"></i>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(datum, index) in filtered" :key="index">
        <td :id="getTdId('b', index, fixedColumnChange)">{{datum[fixedColumnChange]}}</td>
      </tr>
    </tbody>
  </table>
  <table class="table is-bordered is-fullwidth header-fixed" :id="uuid+'header-fixed'" v-show="isShow">
    <thead>
      <template v-for="(head, index) in dataCustomHeaders">
      <tr v-if="isCustomHeaders" :key="index">
        <th
          :id="uuid+'-header-table-custom-header-'+index+'-'+i"
          v-for="(field, i) in head.fields"
          :key="i"
          :colspan="field.colSpan">
          {{field.caption}}
        </th>
      </tr>
      </template>
      <tr>
        <th
          :id="getThId('b', fixedColumnChange)"
          @click="sort(fixedColumnChange)">
          {{dataHeaders[fixedColumnChange]}}
          <i :class="icon" v-if="sortBy == fixedColumnChange"></i>
        </th>
        <template v-for="(value, index) in dataTable[0]">
        <th
          :key="index"
          :id="getThId('b', index)"
          @click="sort(index)"
          v-if="checkedColumnComputed.indexOf(index) != -1 && index != fixedColumnChange">
          {{dataHeaders[index]}} <i :class="icon" v-if="sortBy == index"></i>
      </th>
      </template>
    </tr>
    </thead>
  </table>
  <table class="table is-bordered header-fixed" v-show="isShow">
    <thead>
      <template v-for="(head, index) in dataCustomHeaders">
      <tr :key="index" v-if="isCustomHeaders">
        <th :id="uuid+'-first-left-table-custom-header-'+index">{{head.fields[0].caption}}</th>
      </tr>
      </template>
      <tr>
        <th :id="uuid+'top-left-col'" @click="sort(fixedColumnChange)">
          {{dataHeaders[fixedColumnChange]}} <i :class="icon" v-if="sortBy == fixedColumnChange"></i>
        </th>
      </tr>
    </thead>
  </table>
  <br>
  <nav class="pagination is-centered" role="navigation" aria-label="pagination">
    <a class="pagination-previous" @click="(page > 1)?page -= 1:page=page" :disabled="page == 1">Previous</a>
    <a class="pagination-next" @click="(page < pageCount)?page += 1:page=page" :disabled="page == pageCount">Next</a>
    <ul class="pagination-list">
      <template v-for="(n, index) in pageCount">
      <li :key="index" v-if="n > page - 5 && n < page + 5">
        <a @click="page=n" :class="classListPage(n)">{{n}}</a>
      </li>
      </template>
    </ul>
  </nav>
</div>
</template>
<script>
  export default {
    name: "Table",
    props: ['data', 'headers', 'customHeaders'],
    data: function () {
      return {
        search: '',
        sortBy: '',
        sortMethod: 'asc',
        perPage: 10,
        page: 1,
        checkedColumn: null,
        isActive: false,
        isShow: false,
        fixedColumn: null,
        uuid: this.guid()
      }
    },
    computed: {
      checkedColumnComputed: {
        get: function () {
          if (!this.checkedColumn) {
            this.checkedColumn = Object.keys(this.dataTable[0]);
          }
          return this.checkedColumn;
        },
        set: function (newValue) {
          this.checkedColumn = newValue;
        }
      },
      isCustomHeaders: function () {
        return !!this.customHeaders || this.hasHeadSlot;
      },
      hasHeadSlot() {
        return !!this.$slots['p-head']
      },
      hasFilterSlot() {
        return !!this.$slots['p-filter']
      },
      hasbodySlot() {
        return !!this.$slots['p-body']
      },
      dataTable: function(){
        if (!!this.data) {
          return this.data;
        } else if (this.hasbodySlot) {
          let data = [];
          let idx = 0;
          for (let i = 0; i < this.$slots['p-body'].length; i++) {
            if (!!this.$slots['p-body'][i].tag) {
              let datum = [];
              let index = 0;
              for (let k = 0; k < this.$slots['p-body'][i].children.length; k++) {
                if (!!this.$slots['p-body'][i].children[k].tag) {
                  datum[index++] = this.$slots['p-body'][i].children[k].children[0].text;
                }
              }
              datum = Object.assign({}, datum);
              data[idx++] = datum;
            }
          }
          return data;
        }else {
          return null;
        }
      },
      dataHeaders: function(){
        if (!!this.headers) {
          return this.headers
        } else if (this.hasFilterSlot) {
          let headers = [];
          let idx = 0;
          for (let i = 0; i < this.$slots['p-filter'].length; i++) {
            if (!!this.$slots['p-filter'][i].tag) {
              for (let k = 0; k < this.$slots['p-filter'][i].children.length; k++) {
                if (!!this.$slots['p-filter'][i].children[k].tag) {
                  headers[idx++] = this.$slots['p-filter'][i].children[k].children[0].text;
                }
              }
            }
          }
          headers = Object.assign({}, headers);
          return headers;
        }else {
          let a = Object.keys(this.dataTable[0]);
          let headers = [];
          for (let i= 0; i < a.length;i++){
            headers[a[i]] = a[i];
          }
          headers = Object.assign({}, headers);
          return headers;
        }
      },
      dataCustomHeaders: function () {
        if (!!this.customHeaders) {
          return this.customHeaders
        } else if (this.hasHeadSlot) {
          let customHeaders = [];
          let idx = 0;
          for (let i = 0; i < this.$slots['p-head'].length; i++) {
            if (!!this.$slots['p-head'][i].tag) {
              let fields = [];
              let index = 0;
              for (let k = 0; k < this.$slots['p-head'][i].children.length; k++) {
                if (!!this.$slots['p-head'][i].children[k].tag) {
                  fields[index++] = {
                    caption: (!!this.$slots['p-head'][i].children[k].children)?this.$slots['p-head'][i].children[k].children[0].text:"",
                    colSpan: (!!this.$slots['p-head'][i].children[k].data.attrs.colspan)?this.$slots['p-head'][i].children[k].data.attrs.colspan:1,
                    rowSpan: (!!this.$slots['p-head'][i].children[k].data.attrs.rowspan)?this.$slots['p-head'][i].children[k].data.attrs.rowspan:1
                  };
                }
              }
              customHeaders[idx++] = {
                fields : fields
              }
            }
          }
          return customHeaders;
        }
      },
      fixedColumnChange: {
        get: function () {
          if (!this.fixedColumn) {
            this.fixedColumn = Object.keys(this.dataTable[0])[0];
          }
          if (this.checkedColumnComputed.indexOf(this.fixedColumn) < 0) {
            this.fixedColumn = this.getFirstColumn();
          }
          return this.fixedColumn;
        },
        set: function (newValue) {
          this.fixedColumn = newValue;
        }
      },
      // filter data with search keyword
      filterSearch: function () {
        let f = this.dataTable.filter((p) => {
          let x = (this.search == '');
          for (let key in p) {
            let value = p[key] + '';
            if (value.toLowerCase().match('.*' + this.search.toLowerCase() + '.*')) {
              x = true;
            }
          }
          return x;
        });
        return f;
      },
      filtered: function () {
        let f = this.filterSearch;
        if (this.sortBy != '') {
          let k = this.sortBy;
          let m = this.sortMethod;
          f.sort(function (a, b) {
            if (m == 'asc') {
              if (a[k] < b[k]) {
                return -1;
              }
              if (a[k] > b[k]) {
                return 1;
              }
            }

            if (m == 'desc') {
              if (a[k] > b[k]) {
                return -1;
              }
              if (a[k] < b[k]) {
                return 1;
              }
            }

            return 0;
          });
        }
        return f.slice((this.page - 1) * this.perPage, this.page * this.perPage);
      },
      icon: function () {
        if (this.sortMethod == 'asc') {
          return "fas fa-sort-up";
        } else {
          return "fas fa-sort-down";
        }
      },
      // get page count to generate pagination
      pageCount: function () {
        let count = Math.ceil(this.filterSearch.length / this.perPage);
        return count;
      }
    },
    methods: {
      s4: function () {
        return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
      },
      guid: function () {
        return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' +
        this.s4() + '-' + this.s4() + this.s4() + this.s4();
      },
      getThId: function (a, key) {
        return (a == 'a') ? this.uuid + 'col-' + key : this.uuid + 'cl-' + key;
      },
      getTdId: function (a, index, key) {
        if (key != this.fixedColumnChange)
          return '';
        return (a == 'a') ? this.uuid + 'left-' + index : this.uuid + 'lft-' + index;
      },
      // toggle dropdown for show/hide column
      dropdown: function () {
        this.isActive = !this.isActive;
      },
      sort: function (s) {
        this.sortBy = s;
        this.sortMethod = (this.sortMethod == 'asc') ? 'desc' : 'asc';
      },
      classListPage: function (p) {
        if (p == this.page) {
          return 'pagination-link is-current'
        } else {
          return 'pagination-link'
        }
      },
      classPrevNext: function (p) {
        if (p == 'prev' && this.page == 1) {
          return 'page-item disabled'
        }
        if (p == 'next' && this.page == Math.ceil(this.dataTable.length / this.perPage)) {
          return 'page-item disabled'
        }
        return 'page-item'
      },
      horizontalScroll: function () {
        let elmnt = document.getElementById(this.uuid + 'horizontal-scroll');
        let mainTable = document.getElementById(this.uuid + 'main-table');
        let secondTable = document.getElementById(this.uuid + 'header-fixed');
        let thirdTable = document.getElementById(this.uuid + 'table-col');
        let dv = document.getElementById(this.uuid + 'horizontal-scroll');
        secondTable.style.left = mainTable.getBoundingClientRect().x + 'px';
        for (let key in this.dataTable[0]) {
          if (this.checkedColumnComputed.indexOf(key) != -1) {
            let a = document.getElementById(this.uuid + 'cl-' + key);
            if (a.getBoundingClientRect().x < thirdTable.getBoundingClientRect().x || a.getBoundingClientRect().x > (thirdTable.getBoundingClientRect().x + dv.getBoundingClientRect().width)) {
              a.classList.add('hide');
            } else {
              a.classList.remove('hide');
            }
          }
        }
        if (this.isCustomHeaders) {
          for (let index = 0; index < this.dataCustomHeaders.length; index++) {
            for (let i = 0; i < this.dataCustomHeaders[index].fields.length; i++) {
              let a = document.getElementById(this.uuid + '-header-table-custom-header-' + index + '-' + i);
              if (a.getBoundingClientRect().x < thirdTable.getBoundingClientRect().x || a.getBoundingClientRect().x > (thirdTable.getBoundingClientRect().x + dv.getBoundingClientRect().width)) {
                a.classList.add('hide');
              } else {
                a.classList.remove('hide');
              }
            }
          }
        }
      },
      tableHeader: function () {
        let mainTable = document.getElementById(this.uuid + 'main-table');
        let secondTable = document.getElementById(this.uuid + 'header-fixed');
        let thead = document.getElementById('thead'+this.uuid);
        secondTable.style.width = mainTable.offsetWidth + 'px';
        if (mainTable.getBoundingClientRect().y <= 0 && mainTable.getBoundingClientRect().y >= (-1 * mainTable.offsetHeight)+ thead.offsetHeight) {
          this.isShow = true;
        } else {
          this.isShow = false;
        }
        let x = document.getElementById(this.uuid + 'top-left-col');
        let y = document.getElementById(this.uuid + 'col-' + this.fixedColumnChange);
        x.width = y.offsetWidth;
        for (let key in this.dataTable[0]) {
          if (this.checkedColumnComputed.indexOf(key) != -1) {
            let a = document.getElementById(this.uuid + 'cl-' + key);
            let b = document.getElementById(this.uuid + 'col-' + key);
            a.width = b.offsetWidth;
          }
        }
      },
      colHeight: function () {
        let x = document.getElementById(this.uuid + 'top-left-col');
        let z = document.getElementById(this.uuid + 'col-fix-th');
        let y = document.getElementById(this.uuid + 'col-' + this.fixedColumnChange);
        x.height = y.offsetHeight;
        z.height = y.offsetHeight;
        for (let i = 0; i < this.filtered.length; i++) {
          let a = document.getElementById(this.uuid + 'left-' + i);
          let b = document.getElementById(this.uuid + 'lft-' + i);
          b.height = a.offsetHeight;
        }
        if (this.isCustomHeaders) {
          for (let i = 0; i < this.dataCustomHeaders.length; i++) {
            let c = document.getElementById(this.uuid + '-maintable-custom-header-' + i + '-0');
            let d = document.getElementById(this.uuid + '-col-table-custom-header-' + i);
            let e = document.getElementById(this.uuid + '-first-left-table-custom-header-' + i);
            d.height = c.offsetHeight;
            e.height = c.offsetHeight;
          }
        }
      },
      colWidth: function () {
        let x = document.getElementById(this.uuid + 'col-fix-th');
        let a = document.getElementById(this.uuid + 'col-' + this.fixedColumnChange);
        x.width = a.offsetWidth;
      },
      colFixed: function () {
        let mainTable = document.getElementById(this.uuid + 'main-table');
        let secondTable = document.getElementById(this.uuid + 'table-col');
        secondTable.style.top = mainTable.getBoundingClientRect().y + 'px';
      },
      getFirstColumn: function () {
        for (let key in this.dataTable[0]) {
          if (this.checkedColumnComputed.indexOf(key) != -1)
            return key;
        }
        return this.checkedColumnComputed[0];
      }
    },
    mounted() {
      this.colHeight();
      this.colWidth();
      this.colFixed();
    },
    created() {
      window.addEventListener('scroll', this.tableHeader);
      window.addEventListener('scroll', this.colFixed);
      window.addEventListener('scroll', this.horizontalScroll);
      window.addEventListener("resize", this.tableHeader);
      window.addEventListener('resize', this.horizontalScroll);
      window.addEventListener('resize', this.colFixed);
      window.addEventListener('resize', this.colHeight);
      window.addEventListener('resize', this.colWidth);
    },
    updated() {
      this.colHeight();
      this.colWidth();
      this.tableHeader();
    }
  }
</script>

<style>
.header-fixed {
  position: fixed;
  display: block;
  top: 0px;
  background-color: white;
  border: none;
}

.header-fixed thead {
  border: none;
}

.header-fixed tr {
  border: none;
}

.col-fixed {
  position: fixed;
  display: block;
  overflow-x: auto;
  top: 5px;
  background-color: white;
}

.col-fixed td {
  word-wrap: break-word;
  max-width: 100px;
}

.hide {
  visibility: hidden;
  border: none !important;
}
</style>