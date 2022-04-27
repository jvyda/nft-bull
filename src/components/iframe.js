import { head } from "lodash"
import Vue from "vue"

// Vue.component('i-frame', {
//   render(h) {
//     return  h('iframe', {
//     	on: { load: this.renderChildren }
//     })
//   },
//   beforeUpdate() {
//     //freezing to prevent unnessessary Reactifiation of vNodes
//     this.iApp.children = Object.freeze(this.$slots.default)
//   },  
//   methods: {
//     renderChildren() {
//       const children = this.$slots.default
//       const body = this.$el.contentDocument.body      
//       const el = document.createElement('DIV') // we will mount or nested app to this element
//       body.appendChild(el)
//       var styles = `html,body{padding:0;border:0;margin:0}
//       .image-frame{
//         width: 180px;
//         height: 180px;
//         padding: 0;
//         margin: 0;
//     }
//     svg{
//       max-width:180px;
//       max-height:180px;
//     }`
//     var pagestyles = document.createElement("style")
//     pagestyles.setAttribute("id","svf-frame")
//     pagestyles.innerHTML = styles
//     head.appendChild(pagestyles)
//     console.log(pagestyles)
//       const iApp = new Vue({
//       	name: 'iApp',
//         //freezing to prevent unnessessary Reactifiation of vNodes
//         data: { children: Object.freeze(children) }, 
//         render(h) {
//           return h('div', this.children)
//         },
//       })

//       iApp.$mount(el) // mount into iframe

//       this.iApp = iApp // cache instance for later updates


//     }
//   }
// })

// // Vue.component('test-child', {
// //   template: `<div>
// //     <h3>{{ title }}</h3>
// //     <p>
// //       <slot/>
// //     </p>
// //   </div>`,
// //   props: ['title'],
// //   methods: {
// //     // log:  lodash.debounce(function() {
// //     //   console.log('resize!')
// //     // }, 200)
// //   },
// //   mounted() {
// //     this.$nextTick(() => {
// //     	const doc = this.$el.ownerDocument
// //       const win = doc.defaultView
// //       win.addEventListener('resize', this.log)
// //     })
// //   },
// //   beforeDestroy() {
// //   	const doc = this.$el.ownerDocument
// //     const win = doc.defaultView
// //     win.removeEventListener('resize', this.log)
// //   }
// // })

// new Vue({
//   el: '#app',
//   data: {
//     dynamicPart: 'InputContent',
//     show: false,
//   }
// })

Vue.component('i-frame', {

  render(h) {
    return  h('iframe', {
    	on: { load: this.renderChildren }
    })
  },
  beforeUpdate() {
    //freezing to prevent unnessessary Reactifiation of vNodes
    this.iApp.children = Object.freeze(this.$slots.default)
  },  
  methods: {
    renderChildren() {
      const children = this.$slots.default
      const body = this.$el.contentDocument.body      
      const head = this.$el.contentDocument.head
      const el = document.createElement('DIV') // we will mount or nested app to this element
      body.appendChild(el)
      var styles = `html,body{padding:0;border:0;margin:0; border: none;}
      .image-frame{
        width: 100px;
        height: 100px;
        padding: 0;
        margin: 0;
    }
    svg{
      max-width:100px;
      max-height:100px;
    }`
    var pagestyles = document.createElement("style")
    pagestyles.setAttribute("id","svf-frame")
    pagestyles.innerHTML = styles
    head.appendChild(pagestyles)
      const iApp = new Vue({
      	name: 'iApp',
        //freezing to prevent unnessessary Reactifiation of vNodes
        data: { children: Object.freeze(children) }, 
        render(h) {
          return h('div', this.children)
        },
      })

      iApp.$mount(el) // mount into iframe

      this.iApp = iApp // cache instance for later updates


    }
  }
})

Vue.component('test-child', {
  template: `<div>
    <h3>{{ title }}</h3>
    <p>
      <slot/>
    </p>
  </div>`,
  props: ['title'],
  methods: {
    log:  _.debounce(function() {
      console.log('resize!')
    }, 200)
  },
  mounted() {
    this.$nextTick(() => {
    	const doc = this.$el.ownerDocument
      const win = doc.defaultView
      win.addEventListener('resize', this.log)
    })
  },
  beforeDestroy() {
  	const doc = this.$el.ownerDocument
    const win = doc.defaultView
    win.removeEventListener('resize', this.log)
  }
})

new Vue({
  el: '#app',
  data: {
    dynamicPart: 'InputContent',
    show: false,
  }
})