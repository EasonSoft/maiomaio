<template>
  <div class="movie_body" ref="movie_body">
    <Loading v-if="isLoading" />
    <!-- <Scroller v-else :handleToScroll="handleToScroll" :handleToTouchEnd="handleToTouchEnd"> -->
    <div >
      <ul>
        <li class="pullDown">{{ pullDownMsg }}</li>
        <li v-for="item in movieList" :key="item.id" v-on:click="handleToDetail(item.id)" >
          <div class="pic_show" >
            <img :src="item.images.small" referrerpolicy="no-referrer" />
          </div>
          <div class="info_list">
            <h2 >
              {{item.title}}
              <img v-if="item.has_video" src="@/assets/maxs.png" alt />
            </h2>
            <p>
              观众评
              <span class="grade">{{ item.collect_count }}</span>
            </p>
            <p>主演: {{ item.casts[0].name }},{{ item.casts[1].name }},{{ item.casts[2].name }}</p>
            <p>{{ item.mainland_pubdate }}</p>
          </div>
          <div class="btn_mall">购票</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
//import BScroll from 'better-scroll';

import Scroller from '@/components/Scroller'
import axios from "axios";
export default {
  name: "NowPlaying",
  data() {
    return {
      movieList: [],
      pullDownMsg: "",
      isLoading: true,
      prevCityId: -1
    };
  },

  created() {
    axios
      .get("/api2/movie/in_theaters")
      .then(
        res => {
          console.log(res.data.subjects),
          this.movieList = res.data.subjects,
          this.isLoading = false
        }
      )
      .catch(function(error) {
        // 请求失败处理
        console.log(error);
      });
  },
  methods: {
    handleToDetail(movieIdd) {
      console.log(movieIdd);
      this.$router.push("/movie/detail/nowplaying/"+ movieIdd);
    },
    handleToScroll(pos) {
      if (pos.y > 30) {
        this.pullDownMsg = "正在更新中";
      }
    },
    handleToTouchEnd(pos) {
      if (pos.y > 30) {
        this.axios.get("/api2/movie/in_theaters").then(res => {
          console.log(res.data.subjects);
          this.movieList = res.data.subjects;
          if (msg === "ok") {
            this.pullDownMsg = "更新成功";
            setTimeout(() => {
              this.movieList = res.data.data.movieList;
              this.pullDownMsg = "";
            }, 1000);
          }
        });
      }
    }
  },
  components:{
    Scroller
  }
};
</script>

<style scoped>
.movie_body {
  flex: 1;
  overflow: auto;
  margin-bottom: 50px;
  margin-top: 95px;
}
.movie_body ul {
  margin: 0 12px;
  overflow: hidden;
}
.movie_body ul li {
  margin-top: 12px;
  display: flex;
  align-items: center;
  border-bottom: 1px #e6e6e6 solid;
  padding-bottom: 10px;
}
.movie_body .pic_show {
  width: 64px;
  height: 90px;
}
.movie_body .pic_show img {
  width: 100%;
}
.movie_body .info_list {
  margin-left: 10px;
  flex: 1;
  position: relative;
}
.movie_body .info_list h2 {
  font-size: 17px;
  line-height: 24px;
  width: 150px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.movie_body .info_list p {
  font-size: 13px;
  color: #666;
  line-height: 22px;
  width: 200px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.movie_body .info_list .grade {
  font-weight: 700;
  color: #faaf00;
  font-size: 15px;
}
.movie_body .info_list img {
  width: 50px;
  position: absolute;
  right: 10px;
  top: 5px;
}
.movie_body .btn_mall,
.movie_body .btn_pre {
  width: 47px;
  height: 27px;
  line-height: 28px;
  text-align: center;
  background-color: #f03d37;
  color: #fff;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
}
.movie_body .btn_pre {
  background-color: #3c9fe6;
}
.movie_body .pullDown {
  margin: 0;
  padding: 0;
  border: none;
}
.movie_body .pullDown {
  margin: 0;
  padding: 0;
  border: none;
}
</style>
