<template>
  <div class="container">
    <el-form
      ref="formRef"
      :rules="state.formRules"
      :model="state.form"
      label-width="80px"
    >
      <el-form-item label="文章标题" prop="title">
        <el-input v-model="state.form.title"></el-input>
      </el-form-item>
      <el-form-item label="文章内容">
        <v-md-editor v-model="state.text" height="500px"></v-md-editor>
      </el-form-item>
    </el-form>

    <div class="bottom">
      <el-button type="primary" @click="saveAction">保存</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { ElMessage } from "element-plus";
import { type } from "os";
import { defineComponent, reactive, ref } from "vue";
import router from "../router";
import bus from "../utils/bus";
import axios from "../utils/service";

export default defineComponent({
  setup() {
    const formRef = ref();
    const state = reactive({
      text: "",
      form: {
        title: "",
      },
      formRules: {
        title: [{ required: true, message: "请输入文章标题", trigger: "blur" }],
      },
    });
    const saveAction = () => {
      formRef.value.validate(async (valid) => {
        if (!valid) return;
        const query = router.currentRoute.value.query;
        const res: any = await axios.post("/article/add", {
          menu_id: query.id,
          title: state.form.title,
          content: state.text,
        });
        if (res._id) {
          ElMessage({
            message: "添加成功",
            type: "success",
          });
          setTimeout(() => {
            // 刷新页面
            bus.$emit("REFRESH_ARTICLE", query.id);
            // 关闭当前页面
            window.close();
          }, 1000);
        }
      });
    };
    return {
      state,
      formRef,
      saveAction,
    };
  },
});
</script>

<style scoped>
.container {
  margin-left: 5%;
  margin-top: 20px;
  width: 90%;
  height: 100%;
  overflow-y: auto;
}
.bottom {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
}
</style>
