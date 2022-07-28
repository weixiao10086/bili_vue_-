<template>
  <div class="search-b">
    <div class="index_search">
      <i class="index_search_icon"></i>
      <input
        type="search"
        @keyup.enter="enter(query)"
        autocomplete="off"
        v-model="query"
        class="search-input"
        :placeholder="placeholder"
        maxlength="33"
      />
      <i class="index_close" v-show="query" @click="close"></i>
    </div>
    <div class="index__cancelBtn" @click="back">
      <p @click="cancel">取消</p>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    placeholder: {
      type: String,
      default: "搜索视频、番剧、UP主或AV号",
    },
    queryx: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      query: "",
      historyList: {
        list: [],
      },
    };
  },
  created() {

  },
  methods: {
    back() {
  
    },
    enter(query) {
      alert("111");
    },
    close() {
      this.query = "";
    },
    cancel(){
      this.$router.go(-1)
    }
  },
  watch: {
 
  },
};
</script>
<style lang="less" scoped>
.search-b {
  position: fixed;
  width: 93.33%;
  top: 0;
  left: 0;
  height: 43.9999;
  padding: 0 3.33%;
  background-color: #fff;
  z-index: 1;
  &::before {
    content: "";
    display: block;
    height: 0;
    clear: both;
  }
}

.index_search {
  position: relative;
  width: 88.29%;
  height: 1.28rem;
  margin-top: 0.29867rem;
  float: left;
}
.index_search_icon {
  position: absolute;
  width: 0.93867rem;
  height: 0.93867rem;
  top: 0.17067rem;
  left: 0.512rem;
  background: url(search-pro.png) no-repeat;
  background-size: 100% 100%;
}
.search-input {
  display: block;
  width: 100%;
  height: 100%;
  padding-left: 1.70667rem;
  padding-right: 0.4rem;
  box-sizing: border-box;
  font-size: 0.55467rem;
  border: 0.02133rem solid #e7e7e7;
  border-radius: 0.17067rem;
  background-color: #f4f4f4;
  color: #505050;
  cursor: auto;
}
.index_close {
  position: absolute;
  width: 1.28rem;
  height: 1.28rem;
  top: 0;
  right: 0;
  background: url(./search-close.png) no-repeat;
  background-size: 0.59733rem 0.59733rem;
  background-position: 46.7% 46.7%;
  z-index: 10;
}
.index__cancelBtn {
  position: relative;
  float: right;
  width: 1.28rem;
  margin-top: 0.64rem;
}
p {
  text-align: right;
  color: #fb7299;
  font-size: 0.59733rem;
  line-height: 0.59733rem
}
</style>