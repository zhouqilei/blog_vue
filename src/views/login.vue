<template>
  <div class="container">
    <el-card>
      <div class="title">POWER</div>
      <el-form
        ref="loginFormRef"
        :model="data.loginForm"
        :rules="data.loginRules"
      >
        <el-form-item prop="account">
          <el-input
            placeholder="请输入账号"
            v-model="data.loginForm.account"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            show-password
            placeholder="请输入密码"
            v-model="data.loginForm.password"
          ></el-input>
        </el-form-item>
      </el-form>
      <div>
        <el-button style="width: 100%" @click="loginAction" type="primary"
          >登录</el-button
        >
        <div style="width: 100%; text-align: right; margin-top: 20px">
          <a @click="registerAction" class="register">没有账号，前往注册>></a>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import { ElMessage } from "element-plus";
import { defineComponent, reactive, ref } from "vue";
import service from "../utils/service";

import Cookies from "js-cookie";
import router from "../router";

export default defineComponent({
  setup(props, context) {
    const loginFormRef = ref();
    const data = reactive({
      loginForm: {
        account: "",
        password: "",
      },
      loginRules: {
        account: [
          { required: true, message: "请输入账号", trigger: "blur" },
          {
            min: 3,
            max: 12,
            message: "长度在 3 到 12 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 16,
            message: "长度在 6 到 16 个字符",
            trigger: "blur",
          },
        ],
      },
    });

    const loginAction = () => {
      loginFormRef.value.validate(async (valid: Boolean) => {
        if (!valid) return;

        const res: any = await service.post("/user/login", data.loginForm);
        if (res.user) {
          ElMessage({
            message: "登录成功",
            type: "success",
          });
          // 存储用户信息
          Cookies.set("userInfo", JSON.stringify(res.user), { expires: 7 });
          // 跳转到新页面
          router.replace("/home");
        }
      });
    };
    const registerAction = () => {
      router.replace("/register");
    };

    return {
      loginFormRef,
      data,
      loginAction,
      registerAction,
    };
  },
});
</script>

<style scoped>
.container {
  width: 100vw;
  height: 100vh;
  background-image: url("@/assets/bg.jpeg");
  background-size: 100vw 100vh;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
}
.title {
  font-size: 40px;
  color: #409eff;
  font-weight: bold;
  text-align: center;
  width: 100%;
  margin-bottom: 20px;
}
.el-card {
  width: 480px;
}
.register {
  font-size: 15px;
  color: #409eff;
}
a:hover {
  cursor: pointer;
}
</style>
