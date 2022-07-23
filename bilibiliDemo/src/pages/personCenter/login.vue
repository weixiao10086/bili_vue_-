<template>
  <div>
    <!-- <div>个人中心</div> -->
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="50px"
      class="demo-ruleForm"
    >
      <el-form-item label="账号" prop="username">
        <el-input
          type="input"
          v-model="ruleForm.username"
          autocomplete="off"
          class="inp"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          v-model="ruleForm.password"
          autocomplete="off"
          class="inp"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login('ruleForm')">登录</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
        <el-button @click="register('ruleForm')">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("账号不能为空"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        username: "",
        password: "",
      },
      rules: {
        username: [{ validator: checkAge, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }],
      },
    };
  },
  mounted() {
    // this.$message({message:"请登录",duration:'1000'});
  },
  methods: {
    login(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const { username, password } = this.ruleForm;
          this.axios.post("auth/login", { username, password }).then((res) => {
            localStorage.token = res.token;
            this.$cookies.set("token", res.token);
             this.$message({message:"登录成功",type:'success',duration:'1000'});
            this.$router.push("/personinit");
          });
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    register(formName) {
      this.$refs[formName].validate((valid) => {
        console.log(valid);
        if (valid) {
          const { username, password } = this.ruleForm;
          this.axios
            .post("auth/register", { username, password })
            .then((res) => {
              console.log(res);
              this.$message({message:"注册成功",type:'success',duration:'1000'});
            });
        } else {
          return false;
        }
      });
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
</style>