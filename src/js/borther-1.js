const bother_1 = {
  setup() {
    let inputContent = ref(null);
    let msg = ref(null);

    const biu = function() {
      bus.emit('biulist', inputContent.value);
    }

    nextTick(() => {
      bus.on('msg', val => {
        msg.value = val;
        console.log('msg: ' + msg.value);
      })
    });

    return {
      inputContent,
      msg,
      biu
    }
  },

  template: `
    <div>
      <p class="t">Borther 1</p>
      <input type="text" v-model="inputContent" />
      <button @click="biu">发送</button>
      <p>{{ msg }}</p>
    </div>
  `
}