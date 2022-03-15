const bother_2 = {
  setup() {
    let bother2 = ref(null);
    let msg = ref(null);

    const send = function() {
      bus.emit('msg', bother2.value);
      console.log('bother2 send ' + bother2.value);
    }

    nextTick(() => {
      bus.on('biulist', val => {
        msg.value = val;
        console.log('msg', msg.value);
      })
    })

    return {
      bother2,
      msg,
      send
    }
  },

  template: `
    <div>
      <p class="t">Borther 2</p>
      <input type="text" v-model="bother2"/>
      <button @click="send">发送</button>
      <p>{{ msg }}</p>
    </div>
  `
}