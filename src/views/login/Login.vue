<template>
  <div class="login_container">
    <!-- 登录区域 -->
    <div class="login_box">
      <!-- logo区域 -->
      <div class="login_logo">
        <img src="~assets/img/common/logo.png" alt />
      </div>
      <!-- 表单区域 -->
      <a-form-model
        ref="loginFormRef"
        :model="loginForm"
        :rules="loginFormRules"
        layout="horizontal"
        class="login_form"
      >
        <a-form-model-item prop="username">
          <a-input placeholder="请输入用户名" v-model="loginForm.username">
            <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)" />
          </a-input>
        </a-form-model-item>
        <a-form-model-item prop="password">
          <a-input
            type="password"
            placeholder="请输入密码"
            v-model="loginForm.password"
          >
            <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)" />
          </a-input>
        </a-form-model-item>
        <a-form-model-item class="form_btn">
          <a-button type="primary" class="login_btn" @click="onSubmit">
            登录
          </a-button>
          <a-button type="info">
            注册
          </a-button>
        </a-form-model-item>
      </a-form-model>
    </div>
  </div>
</template>
<script>
import { getlogindata } from "network/login.js";
export default {
  name: "Login",
  data() {
    return {
      // 表单数据
      loginForm: {
        username: "",
        password: "",
      },
      // 表单验证规则
      loginFormRules: {
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur",
          },
          {
            min: 3,
            max: 5,
            message: "长度为 3 到 5位",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur",
          },
          {
            min: 3,
            max: 10,
            message: "长度为 3 到 10位",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    getlogindata() {
      getlogindata(this.loginForm.username, this.loginForm.password).then(
        (res) => {
          // 登录失败
          if (res.meta.status != 200) return this.$message.error("登录失败");
          //  登录成功
          this.$message.success("登录成功");
          // 将登录成功之后的token,保存到客户端的sessionStorage中
          // token只在当前网站打开期间生效,所以将token保存在sessionStroage中
          window.sessionStorage.setItem("token", res.data.token);
          // 跳转首页
          //   this.$router.push(
          //  '/home/'+ res.data.username
          //   );
          this.$router.push({
            path: "/home",
            query: {
              username: res.data.username,
            },
          });
        }
      );
    },
    onSubmit() {
      this.$refs.loginFormRef.validate((valid) => {
        if (!valid) return;
        this.getlogindata();
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.login_container {
  background-color: #2b4b6b;
  height: 100vh;
}
.login_box {
  width: 450px;
  height: 300px;
  background-color: white;
  border-radius: 3px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  .login_logo {
    width: 30%;
    background-color: white;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
    left: 50%;

    img {
      width: 100%;
      padding: 10px;
      border-radius: 50%;
    }
  }

  .login_form {
    width: 100%;
    padding: 0px 20px;
    position: absolute;
    bottom: 0px;

    .form_btn {
      display: flex;
      justify-content: flex-end;

      .login_btn {
        margin-right: 10px;
      }
    }
  }
}
</style>
