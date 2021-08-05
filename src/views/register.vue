<template>
  <div class="container">
    <el-card>
      <div class="title">注册账号</div>
      <el-form
        ref="registerFormRef"
        :model="data.registerForm"
        :rules="data.registerRules"
      >
        <el-form-item prop="account">
          <el-input
            placeholder="请输入账号"
            v-model="data.registerForm.account"
          ></el-input>
        </el-form-item>
        <el-form-item prop="account">
          <el-input
            placeholder="请输入昵称"
            v-model="data.registerForm.name"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            show-password
            placeholder="请输入密码"
            v-model="data.registerForm.password"
          ></el-input>
        </el-form-item>
        <el-form-item prop="repassword">
          <el-input
            show-password
            placeholder="请再次输入密码"
            v-model="data.registerForm.repassword"
          ></el-input>
        </el-form-item>
      </el-form>
      <div>
        <el-button style="width: 100%" @click="registerAction" type="primary"
          >注册</el-button
        >
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import { ElMessage } from "element-plus";
import { defineComponent, reactive, ref } from "vue";
import router from "../router";
import service from "../utils/service";

export default defineComponent({
  setup(props, context) {
    const registerFormRef = ref();

    const data = reactive({
      registerForm: {
        account: "",
        name: "",
        password: "",
        repassword: "",
      },
      registerRules: {
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
        repassword: [
          { required: true, message: "请再次输入密码", trigger: "blur" },
          {
            validator: (rule, value, callback) => {
              if (value !== data.registerForm.password) {
                callback(new Error("两次密码输入不一致"));
              } else {
                callback();
              }
            },
            trigger: "blur",
          },
        ],
      },
    });

    const registerAction = () => {
      registerFormRef.value.validate(async (valid: Boolean) => {
        console.info(valid);
        if (!valid) return;
        const res: any = await service.post(
          "/user/register",
          data.registerForm
        );
        if (res.user) {
          ElMessage({
            message: "注册成功",
            type: "success",
          });
          // 跳转到登录页面
          router.replace("/login");
        }
      });
    };

    return {
      registerFormRef,
      data,
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
</style>
