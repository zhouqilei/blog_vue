<template>
  <div class="menu_container">
    <ul class="menus">
      <li
        @click="onClickMenu(menu, index)"
        class="menu_item"
        :class="{ menu_item_active: menu.actived }"
        v-for="(menu, index) in state.menus"
        :key="menu._id"
      >
        <span class="menu_item_text">{{ menu.name }}</span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from "vue";
import axios from "../utils/service";
import { MenusData } from "../type/index";
import router from "../router";
import Bus from "../utils/bus";
export default defineComponent({
  setup(props, context) {
    const state = reactive({
      menus: <any[]>[],
    });
    const getMenusData = async () => {
      const menusData: MenusData = await axios.post("/menu/findMany");
      state.menus = [
        ...menusData.menus,
        {
          _id: "0",
          name: "配置菜单",
        },
      ];

      if (router.currentRoute.value.path === "/home/menu") {
        for (let menu of state.menus) {
          menu.actived = false;
        }
        state.menus[state.menus.length - 1].actived = true;
      } else {
        const query = router.currentRoute.value.query;
        for (let menu of state.menus) {
          if (menu._id === query.id) {
            menu.actived = true;
          } else {
            menu.actived = false;
          }
        }
      }
    };
    const onClickMenu = (item, index) => {
      for (let menu of state.menus) {
        menu.actived = false;
      }
      state.menus[index].actived = true;
      if (item.name === "配置菜单") {
        router.push("/home/menu");
      } else {
        router.push(`/home/article?id=${item._id}&name=${item.name}`);
      }
    };

    onMounted(() => {
      getMenusData();
      Bus.$on("MENU_CHANGE", (menus) => {
        state.menus = [
          ...menus,
          {
            _id: "0",
            name: "配置菜单",
          },
        ];

        if (router.currentRoute.value.path === "/home/menu") {
          for (let menu of state.menus) {
            menu.actived = false;
          }
          state.menus[state.menus.length - 1].actived = true;
        } else {
          const query = router.currentRoute.value.query;
          for (let menu of state.menus) {
            if (menu._id === query.id) {
              menu.actived = true;
            } else {
              menu.actived = false;
            }
          }
        }
      });
    });
    return {
      state,
      onClickMenu,
    };
  },
});
</script>

<style scoped>
.menu_container {
  width: 200px;
  height: 100%;
  border-right: 1px solid #ececec;
}
.menus {
  padding: 20px 0;
  overflow-y: auto;
}
.menu_item {
  width: 100%;
  height: 50px;
  border-bottom: 1px solid #ececec;
  display: flex;
  align-items: center;
  font-size: 15px;
  color: #666666;
}
.menu_item_active {
  color: #409eff;
}
.menu_item:hover {
  cursor: pointer;
  background-color: #eeeeee;
}
.menu_item_text {
  margin-left: 20px;
}
</style>
