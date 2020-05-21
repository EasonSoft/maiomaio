<template>
  <div id="main">
    <Header title="我的喵喵" />
    <div id="content">
       <keep-alive>
      <router-view />
    </keep-alive>
    </div>
    <TabBar :index="index"/>
  </div>
</template>

<script>
import Header from "@/components/Header";
import TabBar from "@/components/TabBar";
import Login from "@/components/Login";


export default {
  name: "Mine",
  data() {
    return {
      index: [0, 0, 1]
    };
  },
  components: {
    Header,
    TabBar,Login
  }
};
</script>

<style>
</style>
