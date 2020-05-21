<template>
  <div class="movie_body">
    <Loading v-if="isLoading" />
    <ul>
      <li v-for="item in comingList" :key="item.id" @click="toComingSoon(item.id)">
        <div class="pic_show">
          <img :src="item.images.small" referrerpolicy="no-referrer" />
        </div>
        <div class="info_list">
          <h2>{{item.title}}</h2>
          <p>
            <span class="person">{{item.collect_count}}</span> 人想看
          </p>
          <!-- <p>{{item.casts[0].name}},{{item.casts[1].name}},{{item.casts[2].name}}</p> -->
          <span v-for="cast in item.casts" :key="cast.id">{{cast.name}}，</span>
          <p>{{item.mainland_pubdate}}</p>
        </div>
        <div class="btn_pre">预售</div>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "ComingSoon",
  data() {
    return {
      comingList: [],
      isLoading: true,
      prevCityId: -1,
      star: null,
      small: null,
      casts: []
    };
  },
  created() {
    axios
      .get("/api2/movie/coming_soon")
      .then(res => {
        this.isLoading = false;
        console.log(res.data.subjects);
        this.comingList = res.data.subjects;
        this.casts = res.item.casts;
        this.starCasts(this.comingList);
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  methods: {
    starCasts(List) {
      console.log("***********");
      var casts = List.casts;
      console.log(List.casts);

      // var star = [];
      // for (let index = 0; index <List.casts.length; index++) {
      //   star.push(comingList.casts[index].name);
      // }
      // console.log(star);
      // this.small=comingList.images.small;
      // console.log( this.small);
      // return star.toString(",");
    },
    toComingSoon(id) {
      console.log("***********" + id);
      this.$router.push("/movie/detail/nowplaying/"+ id);
    }
  }
};
</script>

<style scoped>
.movie_body {
  flex: 1;
  overflow: hidden;
  position: relative;
  margin-bottom: 50px;
  margin-top: 95px;
}
.movie_body ul {
  margin: 0 12px;
  overflow: auto;
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
.movie_body .info_list span {
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
</style>
