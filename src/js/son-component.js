/**
 * 定义一个子组件
 */
const son = {
  props: ['message'],

  setup(props, context) {
    let info = ref();
    const submitToFather = function() {
      context.emit('myClick', info.value);
    }
    return {
      info,
      submitToFather
    }
  },

  template: `
    <div class="son">
      <p class="f1">Child Component</p>
      <p>子组件向父组件传值：emit</p>
      <input type="text" v-model="info" style="width: 300px"><button class="btn" @click="submitToFather">确定</button>
      <div style="font-size:30px; font-weight:600;">{{ message }}</div>
    </div>
  `
}