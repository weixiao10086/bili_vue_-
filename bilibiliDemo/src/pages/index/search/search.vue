<template>
  <div class="search-box">
    <SearchBox @query="onQueryChange" :queryx="query"></SearchBox>
    <div class="index_recomme" v-show="!query">
      <p class="index_subtitle">大家都在搜</p>
      <div class="index_items">
        <div
          class="index_hotword"
          @click="onClick(item)"
          v-for="(item, index) in allSearch"
        >
          <p>{{ item.keyword }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import SearchBox from "@/pages/index/search/search-box/search-box.vue";
import { AllSearch } from "@/api/AllSearch";
export default {
  data() {
    return {
      allSearch: AllSearch.list,
      query: "",
    };
  },
  methods: {
    onQueryChange(newQuery) {
      this.query = newQuery;
    },
    onClick(item) {
      this.query = item.keyword;
    },
  },
  components: {
    SearchBox,
  },
};
</script>
<style lang="less" scoped>
.search-box {
  position: absolute;
  left: 0;
  right: 0;
  top: 0px;
  bottom: 0;
  background: #fff;
  z-index: 20;
}

.index_recomme {
  position: relative;
  margin-top: 1.89867rem;
  z-index: 0;
  margin-left: 0.53333rem;
  margin-right: 0.14933rem;
}

.index_subtitle {
  position: relative;
  padding-top: 0.68267rem;
  color: #999;
  line-height: 0.59733rem;
  font-size: 0.59733rem;
  text-align: left;
}

.index_items {
  position: relative;
  width: 100%;
  margin-top: 0.17067rem;
  margin-bottom: 0.68267rem;
  height: 3.92533rem;
  overflow: hidden;
}

.index_hotword {
  position: relative;
  float: left;
  padding: 0.40533rem 0.512rem;
  margin-top: 0.512rem;
  margin-right: 0.36267rem;
  border: 0.04267rem solid #ccc;
  border-radius: 0.68267rem;
}

p {
  font-size: 0.55467rem;
  line-height: 0.55467rem;
  color: #505050;
  text-align: center;
}
</style>