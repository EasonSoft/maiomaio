<template>
  <div class="search_body">
    <div class="search_input">
      <div class="search_input_wrapper">
        <img src="../../assets/chazhao/chazhao.svg" alt @click="search(message)" />
        <input type="text" v-model="message" />
      </div>
    </div>
    <div class="search_result">
      <h3>电影/电视剧/综艺</h3>
      <Loading v-if="isLoading"/>
      <ul>
        <li v-for="item in moviesList" :key="item.id">
          <div class="img">
            <img :src=" item.img" />
          </div>
          <div class="info">
            <p>
              <span>{{ item.nm }}</span>
              <span>{{ item.sc }}</span>
            </p>
            <p>{{ item.enm }}</p>
            <p>{{ item.cat }}</p>
            <p>{{ item.rt }}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// import axios from "axios";
export default {
  name: "Search",
  data() {
    return {
      message: "",
      moviesList: [],
      isLoading:false
    };
  },
  //cinemas movie list  /api2/v2/movie/search?count=10&q=
  //start : 数据的开始项

  // count：单页条数

  // q：要搜索的电影关键字

  // tag：要搜索的电影的标签
  methods: {
    search(message) {
      this.isLoading=true;
      console.log(message);
      this.axios
        .get("/api1/searchList?cityId=10&kw=a" + message)
        .then(response => {
          this.isLoading=false;
          var datalist = response.data.data;
          console.log(response);
          var movieList = this.searchMovie(datalist);
          this.moviesList = movieList;
        })
        .catch(function(Error) {
          console.log(Error);
        });
    },
    searchMovie(datalist) {
      var moviesList = [];
      for (let index = 0; index < datalist.movies.list.length; index++) {
        moviesList.push(datalist.movies.list[index]);
      }
      return moviesList;
    }
  }
};
</script>

<style>
#content .search_body {
  flex: 1;
  overflow: auto;
  margin-bottom: 50px;
  margin-top: 95px;
}
.search_body .search_input {
  padding: 8px 10px;
  background-color: #f5f5f5;
  border-bottom: 1px solid #e5e5e5;
}
.search_body .search_input_wrapper {
  padding: 0 10px;
  border: 1px solid #e6e6e6;
  border-radius: 5px;
  background-color: #fff;
  display: flex;
  line-height: 20px;
}
.search_body .search_input_wrapper img {
  width: 16px;
  padding: 4px 0;
}
.search_body .search_input_wrapper input {
  border: none;
  font-size: 13px;
  color: #333;
  padding: 4px 0;
  outline: none;
  margin-left: 5px;
  width: 100%;
}
.search_body .search_result h3 {
  font-size: 15px;
  color: #999;
  padding: 9px 15px;
  border-bottom: 1px solid #e6e6e6;
}
.search_body .search_result li {
  border-bottom: 1px #c9c9c9 dashed;
  padding: 10px 15px;
  box-sizing: border-box;
  display: flex;
}
.search_body .search_result .img {
  width: 60px;
  float: left;
}
.search_body .search_result .img img {
  width: 100%;
}
.search_body .search_result .info {
  float: left;
  margin-left: 15px;
  flex: 1;
}
.search_body .search_result .info p {
  height: 22px;
  display: flex;
  line-height: 22px;
  font-size: 12px;
}
.search_body .search_result .info p:nth-of-type(1) span:nth-of-type(1) {
  font-size: 18px;
  flex: 1;
}
.search_body .search_result .info p:nth-of-type(1) span:nth-of-type(2) {
  font-size: 16px;
  color: #fc7103;
}
</style>
