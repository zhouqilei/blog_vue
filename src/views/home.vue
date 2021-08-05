<template>
  <div class="home_container">
    <Nav></Nav>
    <div class="home_content">
      <Menu></Menu>
      <router-view></router-view>
    </div>
    <Footer></Footer>
  </div>
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent } from "vue";
import Menu from "../components/menu.vue";

export default defineComponent({
  components: {
    Nav: defineAsyncComponent(() => import("@/components/nav.vue")),
    Footer: defineAsyncComponent(() => import("@/components/footer.vue")),
    Menu: defineAsyncComponent(() => import("@/components/menu.vue")),
  },
  setup() {
    return {};
  },
});
</script>

<style scoped>
.home_container {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
}
.home_content {
  width: 100%;
  display: flex;
  flex: 1;
  flex-direction: row;
}
</style>
