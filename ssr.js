var Vue = require('vue/dist/vue.common.js')
var createRenderer = require('vue-server-renderer').createRenderer
var renderToString = createRenderer().renderToString

const vm = new Vue({
  template: `
    <foo v-show="false">
      <div>
        <bar class="test" v-show="true"></bar>
      </div>
    </foo>
  `,
  components: {
    foo: {
      render: h => h('bar'),
      components: {
        bar: {
          render: h => h('div', 'inner')
        }
      }
    }

  }
})

renderToString(vm, (err, res) => {
  console.log(res)
})