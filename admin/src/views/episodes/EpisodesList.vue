

<template>
  <div>
    <h3>课时列表</h3>
    <el-button type="success" size="mini" @click="dialogFormVisible = true"
      >创建课时</el-button
    >
    <!-- @click="$router.push(`/episodes/create`)" -->

    <el-table :data="data.data" style="width: 100%" border>
      <el-table-column prop="_id" label="id" width="240" sortable>
      </el-table-column>
      <el-table-column prop="name" label="课时名称">
        <template slot-scope="{ row, $index }">
          {{ row.name }}
        </template>
      </el-table-column>
      <el-table-column prop="file" label="所属课程">
        <template slot-scope="{ row, $index }">
          {{ row.course.name }}
          <!-- {{course_name }} -->
        </template>
      </el-table-column>
      <el-table-column prop="file" label="视频">
        <template slot-scope="{ row, $index }">
          <!-- <video :src="row.file" type="video/mp4" controls="controls"></video> -->
          <img :src="row.file" />
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

    <el-dialog title="编辑" :visible.sync="dialogFormVisible">
      <el-form :model="fileds">
        <el-form-item :label="fileds.name.label">
          <el-input v-model="row.name" autocomplete="off"></el-input>
        </el-form-item>
        <div class="box">
          <span>{{ fileds.course.label }}</span>
          <!-- !!!!!!!!!!! -->
          <el-select  v-model="row" placeholder="">
             <!-- !!!!!!!!!!! -->
            <el-option
              v-for="item in course"
              :key="item._id"
              :label="item.name"
              :value="item.label"
            >
            </el-option>
          </el-select>
        </div>
        <el-form-item label="文件">
          <el-upload
            action="http://81.68.198.249:3000/upload"
            list-type="picture-card"
            ref="upload"
            :on-success="uploadsSuccess"
          >
            <img v-if="row.file" :src="row.file" class="avatar" />
            <i class="el-icon-plus" v-else></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="episodesfalse">取 消</el-button>
        <el-button type="primary" @click="episodestrue">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      row: {},
      data: {},
      fileds: {
        _id: { label: "ID" },
        name: { label: "课时名称" },
        course: { label: "所属课程" },
      },
      dialogFormVisible: false,
      course: {},
      course_data: {
        _id: "",
        name: "",
      },
    };
  },
  mounted() {
    this.fetch();
  },
  methods: {
    async fetch() {
      this.option_course();
      try {
        const result = await this.$http.get("episodes", {
              params: {
            //关联查询
            query: {populate:'course'}
          }
        });
        this.data = result.data;
      } catch (error) {
        this.$message.success("获取失败");
      }
    },
    handleEdit(index, row) {
      console.log(row)
      this.row = row;
      this.dialogFormVisible = true;
      // this.$router.push(`/episodes/edit/${row._id}`);
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
    episodesfalse() {
      this.dialogFormVisible = false;
    },
    uploadsSuccess(file) {
      console.log(file);
      this.row.file = file.url;
      console.log(thi.row);
    },
    async episodestrue() {
      this.$refs.upload.clearFiles();
      const data = {
        name: this.row.name,
        course: {
          _id: this.row._id || this.course_data.value,
          // name: this.course_data.label,
        },
        file: this.row.file,
      };
      const url = !this.row._id ? `episodes` : `episodes/${this.row._id}`;
      const method = !this.row._id ? "post" : "put";
      try {
        await this.$http[method](url, data);
        this.$message.success(" 成功");
        this.row = {};
      } catch (error) {
        this.$message.success("失败");
      }
      this.fetch();
      this.dialogFormVisible = false;
    },
    async option_course() {
      const result = await this.$http.get(`/episodes/option`);
      this.course = result.data;
    },
  },
  computed:{
    // course_name(){
    //   this.data.data.map((v)=>{
    //     this.course.map((k) => {
    //           if (v.course == k.value) {
    //             v.course2=k.label
    //           }
    //         });
    //   })
    //   return this.data.data+'1'
    // }
  }
};
</script>
<style scoped >
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
.el-upload img{
    max-width: 100%;
    max-height: 100%;
    width: 100%;
    height: 100%;

}
img{
     max-width: 100%;
    max-height: 100%;
    width: 100%;
    height: 100%;
}


</style>