<template>
  <div class="nav_header">
    <span class="nav_title">POWER</span>
    <el-dropdown trigger="click">
      <span class="user_name">{{ userInfo.name }}</span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>编辑资料</el-dropdown-item>
          <el-dropdown-item>退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Cookies from "js-cookie";

export default defineComponent({
  setup() {
    const userInfo: any = JSON.parse(Cookies.get("userInfo") ?? "{}");
    return {
      userInfo,
    };
  },
});
</script>

<style scoped>
.nav_header {
  width: 100%;
  height: 80px;
  background-color: #409eff;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.nav_title {
  font-size: 40px;
  font-weight: bold;
  color: #ffffff;
  padding-left: 20px;
}
.user_name {
  font-size: 15px;
  color: #ffffff;
  padding-right: 20px;
}
</style>
