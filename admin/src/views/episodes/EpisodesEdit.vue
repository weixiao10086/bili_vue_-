<template>
  <div>
    <h3>{{ isNew ? "创建" : "编辑" }}课程</h3>
    <el-form ref="form" :model="data.data" label-width="80px">
      <el-form-item :label="fileds.name.label" label-width="100px">
        <el-input v-model="data.name"></el-input>
      </el-form-item>
      <!-- <el-form-item :label="fileds.cover.label" label-width="100px">
        <el-input v-model="data.cover"></el-input>
      </el-form-item> -->
      <div class="box">
        <span>{{ fileds.cover.label }}</span>
        <el-select v-model="course_data" placeholder="">
          <el-option
            v-for="item in course"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          >
          </el-option>
        </el-select>
      </div>
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
      course: {},
      course_data:{},
      fileds: {
        name: { label: "课时名称" },
        cover: { label: "所属课程" },
      },
    };
  },
  props: ["id"],
  mounted() {
    !this.isNew && this.fetch();
    this.fetchcourse()
  },
  methods: {
    async fetch() {
      try {
        const result = await this.$http.get(`episodes/${this.id}`);
        this.data = result.data;
      } catch (error) {
        this.$message.success("失败");
      }
      this.data = result.data;
    },
    async fetchcourse(){
       const course = await this.$http.get("course");
        this.course = course.data.data;
    },
    async onSubmit(data) {
      // data = {
      //   ...data,
      //   course: {
      //     _id: this.course_data,
      //   },
      // };
      // const url = this.isNew ? `episodes` : `episodes/${this.id}`;
      // const method = this.isNew ? "post" : "put";
      // try {
      //   await this.$http[method](url, data);
      //   this.$message.success(" 成功");
      //   //返回上一页
      //   this.data = {};
      //   this.$router.go(-1);
      // } catch (error) {
      //   this.$message.success("失败");
      // }
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
.box {
  display: flex;
  margin-bottom: 20px;
}
.box span {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  width: 100px;
  justify-content: end;
  padding-right: 12px;
}
</style>