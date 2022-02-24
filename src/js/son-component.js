const son = {
  props: ['message'],

  setup(props, context) {
    let info = ref('0');
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
      <p>Child Component</p>
      <input type="text" v-model="info"><button class="btn" @click="submitToFather">确定</button>
      <div style="font-size:30px; font-weight:600; color: #ffffff">{{ message }}</div>
    </div>
  `
}