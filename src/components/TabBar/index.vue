<template>
  <footer id="footer">
    <ul>
      <router-link tag="li" to="/movie/nowPlaying">
        <img :src="zhuye[index[0]]" alt />
        <p>电影</p>
      </router-link>
      <router-link tag="li" to="/cinema">
        <img :src="yingyuan[index[1]]" alt />
        <p>影院</p>
      </router-link>
      <router-link tag="li" to="/mine">
        <img :src="wode[index[2]]" alt />
        <p>我的</p>
      </router-link>
    </ul>
  </footer>
</template>

<script>
import zhuye2 from "../../assets/zhuye/homepage2.png";
import zhuye1 from "../../assets/zhuye/homepage.png";
import yingyuan1 from "../../assets/zhuye/dianyingyuan.png";
import yingyuan2 from "../../assets/zhuye/dianyingyuan2.png";
import wode1 from "../../assets/zhuye/wode.png";
import wode2 from "../../assets/zhuye/wode2.png";
export default {
  data() {
    return {
      zhuye: [zhuye1, zhuye2],
      yingyuan: [yingyuan1, yingyuan2],
      wode: [wode1, wode2]
    };
  },
  props: {
    index: {
      type: Array,
      default: [0, 0, 0]
    }
  }
};
</script>

<style scoped>
#footer {
  width: 100%;
  height: 50px;
  background: white;
  border-top: 2px #ebe8e3 solid;
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 1000;
}
#footer ul {
  display: flex;
  text-align: center;
  height: 50px;
  align-items: center;
}
#footer ul li {
  flex: 1;
  height: 40px;

}
#footer ul li.active {
  color: #f03d37;
}
#footer ul li.router-link-active {
  color: #f03d37;
}
#footer ul img {
  width: 20px;
  height:20px;
  margin: 0 auto;
}
#footer ul p {
  font-size: 12px;
  line-height: 18px;
}
</style>
