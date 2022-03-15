/**
 * 图片列表组件
 */
const imgList = {
  props: ["img"],

  template: `<div style='width:250px; height:90%;' class="img-box">
    <img v-for="item in img" :key="item.id" :src="item.img_url"  class="img-border img-item" style='width:100%; height:100%;' />
  </div>`,
};
