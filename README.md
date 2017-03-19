# v-show-ssr-bug

This repo is used to reproduces the SSR v-show render bug.

## env
vue@latest

## steps

1. `git clone https://github.com/defcc/v-show-ssr-bug.git v-show-ssr-bug`
2. `npm install`
3. `npm test`

The result is `<div server-rendered="true">inner</div>`, it should be `<div server-rendered="true" style="display:none;">inner</div>`

## demo code

```js
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

```
