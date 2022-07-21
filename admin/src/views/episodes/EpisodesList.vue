<template>
  <div>
    <h3>课时列表</h3>
    <el-button type="success" size="mini" @click="handleCreate"
      >创建课时</el-button
    >
    <!-- 搜素 -->

    <div style="margin: 20px 0">
      <span>课程名称:</span>
      <el-input
        v-model="search"
        placeholder="请输入搜素内容"
        size="mini"
        style="width: 150px; margin: 0 10px"
      ></el-input>
      <el-button
        type="primary"
        icon="el-icon-search"
        size="mini"
        @click="searchwhere"
        >搜索</el-button
      >
      <el-button type="info" size="mini" @click="empty">清空</el-button>
    </div>
    <!-- 表单 -->
    <el-table
      :data="data.data"
      style="width: 100%"
      border
      :default-sort="{ prop: 'date', order: 'descending' }"
      @sort-change="changeSort"
    >
      <!-- <el-table-column
        :prop="data.name"
        :label="filed.label"
        width="width"
        v-for="(filed, name) in fileds"
        :key="name"
        :sortable="name == '_id'"
      >
      </el-table-column> -->

      <el-table-column prop="_id" label="id" width="240" sortable> </el-table-column>
      <el-table-column prop="name" label="课时"> </el-table-column>
      <el-table-column prop="file" label="课时封面图">
        <template slot-scope="{row,$index}">
          <img :src="row.file" alt="" style="width:200px;height:100px">
        </template>
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

    <!-- @size-change="handleSizeChange"
    @current-change="handleCurrentChange" -->
    <el-pagination
      style="margin-top: 20px; text-align: center"
      :current-page="page"
      :page-sizes="[3, 5, 10]"
      :page-size="query.limit"
      :page-count="lastPage"
      :total="total"
      layout=" prev, pager, next, jumper,->,sizes,total"
      @current-change="getPageList"
      @size-change="handleSizeChange"
    >
    </el-pagination>

    <el-dialog title="编辑" :visible.sync="dialogFormVisible">
      <el-form :model="fileds">
        <el-form-item label="课时名称">
          <el-input v-model="row.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="文件">
          <el-upload
            action="http://localhost:3000/upload"
            list-type="picture-card"
            :on-success="uploadsSuccess"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="episodestrue">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: {},
      page: 1,
      lastPage: 1,
      total: 20,
      fileds: {
        _id: { label: "ID" },
        name: { label: "课时名称" },
        file: { label: "课时封面图" },
      },
      dialogFormVisible: false,
      row: {},
      query: {
        limit: 3,
        page: 1,
        //-1时为倒序
        sort: { _id: 1 },
      },
      search: "",
      regex: true,
    };
  },
  mounted() {
    this.fetch();
  },
  methods: {
    async fetch() {
      this.row = {};
      try {
        const result = await this.$http.get("episodes", {
          params: {
            query: this.query,
          },
        });
        this.lastPage = result.data.lastPage;
        this.page = result.data.page;
        this.total = result.data.total;
        this.data = result.data;
      } catch (error) {
        this.$message.success("获取失败");
      }
      this.data = result.data;
    },
    handleSizeChange(limit) {
      this.query.limit = limit;
      this.fetch();
    },
    getPageList(page) {
      this.query.page = page;
      this.fetch();
    },

    changeSort({ order, prop }) {
      if (!order) {
        this.query.sort = null;
      } else {
        this.query.sort = {
          [prop]: order === "ascending" ? 1 : -1,
        };
      }
      this.fetch();
    },

    handleEdit(index, row) {
      this.dialogFormVisible = true;
      this.row = row;
    },
    async handleDelete(index, row) {
      try {
        //弹出确认框
        await this.$confirm("是否确认删除");
        await this.$http.delete(`/episodes/${row._id}`);
        this.fetch();
      } catch (error) {
        return;
      }
    },

    uploadsSuccess(res, file) {
      this.row.file = res.url;
    },

    async episodestrue() {
      console.log(this.row);
      const data = {
        name: this.row.name,
        file: this.row.file,
        course: {
      "_id": "62d7ee072645d3bbeea99cbf",
    }
      };
      if (this.row._id) {
        await this.$http.put(`/episodes/${this.row._id}`, data);
      } else {
        await this.$http.post(`/episodes`, data);
      }
      this.dialogFormVisible = false;
      this.fetch();
    },
    handleCreate() {
      this.dialogFormVisible = true;
      this.row = {};
    },

    //搜索
    searchwhere() {
      if (this.regex) {
        //模糊搜索
        this.query.where = {
          name: { $regex: this.search },
        };
      } else {
        //精确搜索
        this.query.where = {
          name: this.search,
        };
      }

      if (this.search.trim() == "") {
        this.query.where = null;
      }
      this.fetch();
    },
    //清空
    empty() {
      this.search = "";
      this.query.where = null;
      this.fetch();
    },
  },
};
</script>

<style scoped>
</style>