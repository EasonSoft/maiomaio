<template>
  <div id="detailContrainer" class="slide-enter-active">
    <Header title="影片详情">
      <img src="../../assets/zhuye/black2.png" v-on:click="handleToBack()" />
    </Header>
    <Loading v-if="isLoading" />
    <div v-else id="content" class="contentDetail">
      <div class="detail_list">
        <!-- <div class="detail_list_bg"></div>
        <div class="detail_list_filter"></div>-->
        <div class="detail_list_content">
          <div class="detail_list_img">
            <img v-bind:src="detailImg" referrerpolicy="no-referrer" alt />
          </div>
          <div class="detail_list_info">
            <h2>{{detailMovie.title}}</h2>
            <span>主演：</span>
            <span v-for="(name1,index1) in detailcasts" :key="index1">{{name1}}</span>
            <p>评分：{{detailAverage}}分</p>
            <span v-for=" (item2,index2) in detailgenres" :key="'index2-'+index2">{{item2}}</span>
            <p>{{countries}} / {{durations}}</p>
            <p>{{detailpubdates}}</p>
          </div>
        </div>
        <div class="detail_intro">
          <p>{{detailMovie.summary}}</p>
        </div>
        <div class="detail_player swiper-container">
          <ul class="swiper-wrapper">
            <li
              class="swiper-slide"
              v-for="(item,index) in commentsInfo"
              :key="'commentsInfo-'+index"
            >
              <div class="swiper_slide_img">
                <img :src="item.author.avatar" referrerpolicy="no-referrer" alt />
                <p>{{item.author.name}}</p>
              </div>
              <p>{{item.content}}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";

export default {
  data() {
    return {
      isLoading: false,
      detailMovie: {},
      genres: [], //类型
      pubdates: [], //上映日期
      castsStart: [], //演员
      detailImg: null,
      detailAverage: null,
      countries: null,
      durations: null,
      commentsInfo: []
    };
  },
  components: {
    Header
  },
  props: ["movieId"],
  methods: {
    handleToBack() {
      this.$router.back();
    },
    detailComments(info) {
      for (let index = 0; index < info.length; index++) {
        const element = info[index];
      }
    }
  },
  mounted() {
    this.axios
      .get(
        "/api3/subject/" +
          this.movieId +
          "?apikey=0df993c66c0c636e29ecbb5344252a4a"
      )
      .then(res => {
        this.detailMovie = res.data;
        console.log(this.detailMovie);
        this.genres = this.detailMovie.genres;
        this.pubdates = this.detailMovie.pubdates;
        this.detailImg = this.detailMovie.images.small;
        this.detailAverage = this.detailMovie.rating.average;
        this.countries = this.detailMovie.countries[0];
        this.durations = this.detailMovie.durations[0];
        for (let item = 0; item < this.detailMovie.casts.length; item++) {
          this.castsStart.push(this.detailMovie.casts[item].name);
        }
        //解析评论
        this.commentsInfo = this.detailMovie.popular_comments;
        console.log(this.commentsInfo);
      });
  },
  computed: {
    detailgenres: function() {
      for (let item = 0; item < this.genres.length; item++) {
        if (item != this.genres.length - 1)
          this.genres[item] = this.genres[item] + "，";
      }
      return this.genres;
    },
    detailpubdates: function() {
      for (let item = 0; item < this.pubdates.length; item++) {
        if (item == this.pubdates.length - 1) return this.pubdates[item];
      }
    },
    detailcasts: function() {
      for (let index = 0; index < this.castsStart.length; index++) {
        if (index != this.castsStart.length) {
          this.castsStart[index] = this.castsStart[index] + "，";
        }
      }
      return this.castsStart;
    }
  }
};
</script>

<style scope>
#detailContrainer {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 100;
  width: 100%;
  margin-bottom: 50px;
  background: white;
}
#detailContrainer.slide-enter-active {
  animation: 0.3s slideMove;
}
@keyframes slideMove {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0);
  }
}
#content {
  margin-bottom: 50px;
  margin-top: 50px;
  z-index: 1;
}
#content.contentDetail {
  display: block;
  margin-top: 50px;
}
#content .detail_list {
  height: 100%;
  width: 100%;
  position: relative;
  overflow: hidden;
}
.detail_list .detail_list_bg {
  width: 100%;
  height: 100%;
  background: 0 40%;
  filter: blur(20px);
  background-size: cover;
  position: absolute;
  left: 0;
  top: 0;
}
.detail_list .detail_list_filter {
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: #40454d;
  opacity: 0.55;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
}
.detail_list .detail_list_content {
  display: flex;
  width: 100%;
  height: 100%;
  position: relative;
  left: 0;
  top: 0;
  z-index: 2;
}
.detail_list .detail_list_img {
  width: 135px;
  border: solid 1px #f0f2f3;
  margin: 20px;
}
.detail_list .detail_list_img img {
  width: 135px;
}
.detail_list .detail_list_info {
  margin-top: 20px;
}
.detail_list .detail_list_info h2 {
  font-size: 20px;
  color: #ccc;
  font-weight: normal;
  line-height: 40px;
}
.detail_list .detail_list_info p,
span {
  line-height: 20px;
  font-size: 14px;
  color: #ccc;
}
#content .detail_intro {
  padding: 10px;
  position: relative;
}
#content .detail_player {
  margin: 20px;
}
.detail_player .swiper-slide {
  width: 100%;
  margin-right: 20px;
  font-size: 14px;
  margin-bottom: 10px;
}
.detail_player .swiper-slide .swiper_slide_img {
  height: 30px;
}
.detail_player .swiper-slide div img {
  width: 30px;
  margin-bottom: 5px;
  border-radius: 50%;
  float: left;
}
.detail_player .swiper-slide .swiper_slide_img p {
  margin-left: 5px;
  line-height: 30px;
  float: left;
}
.detail_player .swiper-slide p:nth-of-type(2) {
  color: #999;
}
</style>