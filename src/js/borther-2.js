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
      <p>Borther 2</p>
      <p>{{ msg }}</p>
      <input type="texxt" v-model="bother2"/>
      <button @click="send">bother2 发送</button>
    </div>
  `
}