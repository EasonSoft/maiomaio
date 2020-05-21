<template>
  <div class="city_body">
    <div class="city_list" ref="city_List">
      <div class="city_hot">
        <h2>热门城市</h2>
        <ul class="clearfix">
          <li
            v-for="item in hotList"
            :key="item.id"
            @click="handleToCity(item.nm , item.id)"
          >{{item.nm}}</li>
        </ul>
      </div>
      <div class="city_sort">
        <div v-for="item in cityList" :key="item.index">
          <h2 class="city_sort_h2" ref="city_sort">{{item.index}}</h2>
          <ul>
            <li
              v-for="city in item.list"
              :key="city.id"
              @click="handleToCity(item.nm , item.id)"
            >{{city.nm}}</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="city_index">
      <ul>
        <li
          v-for="item in cityList"
          :key="item.index"
          @click="handleToIndex(item.index)"
        >{{item.index}}</li>
      </ul>
    </div>
    <!-- <MessageBox v-if="updateCity"/> -->
  </div>
</template>

<script>

export default {
  name: "City",
  data() {
    return {
      cityList: [],
      hotList: [],
      isLoading: true,
      updateCity:false
    };
  },
  created() {
    this.axios.get("/api1/cityList").then(res => {
      var msg = res.data.msg;
      if (msg === "ok") {
        this.isLoading = false;
        var cities = res.data.data.cities;
        //[ { index : 'A' , list : [{ nm : '阿城' , id : 123 }] } ]
        var { cityList, hotList } = this.formatCityList(cities);
        this.cityList = cityList;
        this.hotList = hotList;
        console.log(this.cityList);
        window.localStorage.setItem("cityList", JSON.stringify(cityList));
        window.localStorage.setItem("hotList", JSON.stringify(hotList));
      }
    });
  },
  methods: {
    formatCityList(cities) {
      var cityList = [];
      var hotList = [];
      //热门城市
      for (var i = 0; i < cities.length; i++) {
        if (cities[i].isHot === 1) {
          hotList.push(cities[i]);
        }
      }
      for (var i = 0; i < cities.length; i++) {
        var firstLetter = cities[i].py.substring(0, 1).toUpperCase();
        if (toCom(firstLetter)) {
          //添加新城镇
          cityList.push({
            index: firstLetter,
            list: [{ id: cities[i].id, nm: cities[i].nm }]
          });
        } else {
          //放入以前的城市列表
          for (var j = 0; j < cityList.length; j++) {
            if (cityList[j].index === firstLetter) {
              cityList[j].list.push({ id: cities[i].id, nm: cities[i].nm });
            }
          }
        }
      }
      //判断是否存在城市index，不存在为真
      function toCom(firstLetter) {
        for (var i = 0; i < cityList.length; i++) {
          if (cityList[i].index === firstLetter) {
            return false;
          }
        }
        return true;
      }
      //排序
      cityList.sort((n1, n2) => {
        if (n1.index > n2.index) {
          return 1;
        } else if (n1.index < n2.index) {
          return -1;
        } else {
          return 0;
        }
      });

      return {
        cityList,
        hotList
      };
    },

    handleToIndex(index) {
      var h2 = document.getElementsByClassName("city_sort_h2");
      var city = document.getElementsByClassName("city_list");
      for (var i = 0; i < h2.length; i++) {
        if (h2[i].innerText === index) {
          city[0].scrollTop = h2[i].offsetTop;
        }
      }
    },
    handleToCity(nm, id) {
      this.updateCity=true;
      console.log(nm,id);
      this.$store.commit("city/CITY_INFO", { nm, id });
      window.localStorage.setItem("nowNm", nm);
      window.localStorage.setItem("nowId", id);
      // this.$router.push("/movie/nowPlaying");
    }
  }
};
</script>

<style scoped>
.city_body {
  margin-top: 97px;
  margin-bottom: 50px;
  display: flex;
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
}
.city_body .city_list {
  flex: 1;
  overflow: auto;
  background: #fff5f0;
}
.city_body .city_list::-webkit-scrollbar {
  background-color: transparent;
  width: 0;
}
.clearfix:after {
  content: "";
  display: block;
  clear: both;
}
.city_body .city_hot {
  margin-top: 20px;
}
.city_body .city_hot h2 {
  padding-left: 15px;
  line-height: 30px;
  font-size: 14px;
  background: #f0f0f0;
  font-weight: normal;
}
.city_body .city_hot ul li {
  float: left;
  background: #fff;
  width: 29%;
  height: 33px;
  margin-top: 15px;
  margin-left: 3%;
  padding: 0 4px;
  border: 1px solid #e6e6e6;
  border-radius: 3px;
  line-height: 33px;
  text-align: center;
  box-sizing: border-box;
}
.city_body .city_sort div {
  margin-top: 20px;
}
.city_body .city_sort h2 {
  padding-left: 15px;
  line-height: 30px;
  font-size: 14px;
  background: #f0f0f0;
  font-weight: normal;
}
.city_body .city_sort ul {
  padding-left: 10px;
  margin-top: 10px;
}
.city_body .city_sort ul li {
  line-height: 30px;
  line-height: 30px;
}
.city_body .city_index {
  width: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  border-left: 1px #e6e6e6 solid;
}
</style>
