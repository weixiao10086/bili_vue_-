<template>
  <div>
    <div>个人中心</div>
    <el-button type="info" class="info" @click="exit()">退出登录</el-button>
  </div>
</template>

<script>
export default {
  methods: {
    exit() {
      localStorage.removeItem("token");
      this.$cookies.remove("token");
      this.$router.push("/login");
    },
  },
};
</script>

<style  scoped>
.demo-ruleForm {
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.inp {
  width: 200px;
}
.info {
  margin: 20px;
}
</style>