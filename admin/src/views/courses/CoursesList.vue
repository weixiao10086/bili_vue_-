<template>
  <div>
    <h3>课程列表</h3>

    <el-button
      type="success"
      size="mini"
      @click="$router.push(`/courses/create`)"
      >创建课程</el-button
    >

    <el-table :data="data.data" style="width: 100%" border>
      <el-table-column
        :prop="name"
        :label="filed.label"
        width="width"
        v-for="(filed, name) in fileds"
        :key="name"
      >
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: {},
      fileds: {
        _id: { label: "ID" },
        name: { label: "课程名称" },
        cover: { label: "课程封面图" },
      },
    };
  },
  mounted() {
    this.fetch();
  },
  methods: {
    async fetch() {
      try {
        const result = await this.$http.get("course", {});
        this.data = result.data;
      } catch (error) {
        this.$message.success("获取失败");
      }
      this.data = result.data;
      // this.$http.get("http://localhost:3000/course").then((response) => {
      //   console.log(response.data);
      // });
    },
    handleEdit(index, row) {
      this.$router.push(`/course/edit/${row._id}`);
    },
    async handleDelete(index, row) {
      try {
        //弹出确认框
        await this.$confirm("是否确认删除");
        await this.$http.delete(`/course/${row._id}`);
        this.fetch();
      } catch (error) {
        return;
      }
    },
  },
};
</script>

<style scoped>
</style>