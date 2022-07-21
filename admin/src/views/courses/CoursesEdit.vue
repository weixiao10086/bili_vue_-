<template>
  <div>
    <h3>{{ isNew ? "创建" : "编辑" }}课程</h3>

    <el-form ref="form" :model="data.data" label-width="80px">
      <el-form-item label="课程名称" label-width="100px">
        <el-input v-model="data.name"></el-input>
      </el-form-item>
      <el-form-item label="课程封面图" label-width="100px">
        <el-input v-model="data.cover"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit(data)">提交</el-button>
        <el-button @click="$router.go(-1)">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: {},
      fileds: {
        name: { label: "课程名称" },
        cover: { label: "课程封面图" },
      },
    };
  },
  props: ["id"],
  mounted() {
    !this.isNew && this.fetch();
    console.log(this.id);
  },
  methods: {
    async fetch() {
      try {
        const result = await this.$http.get(`course/${this.id}`);
        this.data = result.data;
      } catch (error) {
        this.$message.success("失败");
      }
      this.data = result.data;
    },
    async onSubmit(data) {
      const url=this.isNew?`course`:`course/${this.id}`
      const method=this.isNew?'post':'put'
      try {
        await this.$http[method](url, data);
        this.$message.success(" 成功");
        //返回上一页
        this.data = {};
        this.$router.go(-1);
      } catch (error) {
        this.$message.success("失败");
      }
    },
  },
  computed: {
    isNew() {
      return !this.id;
    },
  },
};
</script>

<style scoped>
</style>