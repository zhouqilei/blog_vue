<template>
  <div class="container">
    <div class="tool">
      <el-button @click="addArticle" type="primary">写文章</el-button>
    </div>
    <div class="content">
      <ul class="list">
        <li class="article_item" v-for="item in state.articles" :key="item.id">
          <span class="article_item_title">{{ item.title }}</span>
          <div class="article_item_bottom">
            <span class="article_item_bottom_text"
              >创建时间：{{ item.createdTime }}</span
            >
            <span style="margin-left: 10px" class="article_item_bottom_text"
              >更新时间：{{ item.updatedTime }}</span
            >
          </div>
        </li>
      </ul>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="state.num"
        :page-sizes="[1, 10, 20, 40]"
        :page-size="state.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="state.total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from "vue";
import router from "../router";
import bus from "../utils/bus";
import axios from "../utils/service";

export default defineComponent({
  beforeRouteUpdate(to, from, next) {
    const query = to.query;
    bus.$emit("REFRESH_ARTICLE", query.id);
    next();
  },
  setup(props, context) {
    const state = reactive({
      articles: [],
      num: 1,
      size: 10,
      total: 0,
    });
    // 添加文章
    const addArticle = () => {
      const query = router.currentRoute.value.query;
      let editorUrl = router.resolve({
        path: "/editor",
        query: query,
      });
      window.open(editorUrl.href, "_blank");
    };
    // 获取文章列表
    const getArticles = async () => {
      const query = router.currentRoute.value.query;
      const res: any = await axios.post("/article/findMany", {
        menu_id: query.id,
        num: state.num,
        size: state.size,
      });
      if (res.articles) {
        state.articles = res.articles;
        state.total = res.total;
      }
    };

    const handleSizeChange = (size) => {
      state.size = size;
      getArticles();
    };

    const handleCurrentChange = (num) => {
      state.num = num;
      getArticles();
    };

    onMounted(() => {
      getArticles();
      bus.$on("REFRESH_ARTICLE", (id) => {
        const query = router.currentRoute.value.query;
        if (query.id === id) {
          getArticles();
        }
      });
    });

    return {
      addArticle,
      getArticles,
      state,
      handleSizeChange,
      handleCurrentChange,
    };
  },
});
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.tool {
  width: 100%;
  height: 60px;
  padding: 0 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-bottom: 1px solid #ececec;
}
.content {
  flex: 1;
  padding: 20px 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}
.list {
  flex: 1;
}
.article_item {
  width: 100%;
  box-sizing: border-box;
  border-bottom: 1px solid #ececec;
  padding: 20px;
}
.article_item_title {
  font-size: 20px;
  color: #333333;
  font-weight: bold;
}
.article_item_bottom {
  display: flex;
  flex-direction: row;
  margin-top: 10px;
}
.article_item_bottom_text {
  font-size: 10px;
  color: #999999;
}
</style>
