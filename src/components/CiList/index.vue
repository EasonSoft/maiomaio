<template>
  <div class="cinema_body">
    <Loading v-if="isLoading" />
    <ul v-else>
      <li v-for="(item,index) in cinemaList" :key="index">
        <div>
          <span>{{item.nm}}</span>
          <span class="q">
            <span class="price">{{ item.id }}</span> 元起
          </span>
        </div>
        <div class="address">
          <span>{{item.addr}}</span>
          <span>{{item.distance}}</span>
        </div>
        <div class="card">
          <div
            v-for="(num,key ) in item.tag"
           
            :key="key"
            :class=" key | classCard "
          >{{key| formatCard}}</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "CiList",
  data() {
    return {
      cinemaList: [],
      isLoading: true,
      prevCityId: -1,
      tags: []
    };
  },
  activated() {
    var cityID = this.$store.state.city.id;
    console.log(cityID);
    this.axios.get("/api1/cinemaList?cityId=" + cityID).then(res => {
      var msg = res.data.msg;
      if (msg === "ok") {
        this.cinemaList = res.data.data.cinemas;
        // for (let index = 0; index < this.cinemaList.length; index++) {
        // this.tags.push(this.cinemaList[index].tag);
        //  }
        console.log(this.cinemaList);
        console.log(this.tags);
        this.isLoading = false;
        this.prevCityId = cityID;
      }
    });
  },
  computed: {
    activeUsers: function(index) {
      var that = this;
      console.log(that.tags[index]);
      return this.tags[index].tagfilter(itemaa);
    }
  },
  filters: {
    tagfilter(item) {
      if (item.num === 1) {
        return item.num;
      }
    },
    formatCard(key,num) {
      var card = [
        { key: "allowRefund", value: "改签" },
        { key: "endorse", value: "退" },
        { key: "sell", value: "折扣卡" },
        { key: "snack", value: "小吃" }
      ];
      for (var i = 0; i < card.length; i++) {
        if (card[i].key === key  ) {
          return card[i].value;
        }
      }
      return "";
    },
    classCard(key,num) {
      var card = [
        { key: "allowRefund", value: "bl" },
        { key: "endorse", value: "bl" },
        { key: "sell", value: "or" },
        { key: "snack", value: "or" }
      ];
      for (var i = 0; i < card.length; i++) {
        if (card[i].key === key ) {
          return card[i].value;
        }
      }
      return "";
    }
  }
};
</script>

<style scoped>
#content .cinema_body {
  flex: 1;
  overflow: auto;
}
.cinema_body ul {
  padding: 20px;
}
.cinema_body li {
  border-bottom: 1px solid #e6e6e6;
  margin-bottom: 20px;
}
.cinema_body div {
  margin-bottom: 10px;
}
.cinema_body .q {
  font-size: 11px;
  color: #f03d37;
}
.cinema_body .price {
  font-size: 18px;
}
.cinema_body .address {
  font-size: 13px;
  color: #666;
}
.cinema_body .address span:nth-of-type(2) {
  float: right;
}
.cinema_body .card {
  display: flex;
}
.cinema_body .card div {
  padding: 0 3px;
  height: 15px;
  line-height: 15px;
  border-radius: 2px;
  color: #f90;
  border: 1px solid #f90;
  font-size: 13px;
  margin-right: 5px;
}
.cinema_body .card div.or {
  color: #f90;
  border: 1px solid #f90;
}
.cinema_body .card div.bl {
  color: #589daf;
  border: 1px solid #589daf;
}
</style>
