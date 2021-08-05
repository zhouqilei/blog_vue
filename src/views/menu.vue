<template>
  <div class="container">
    <div class="tool">
      <el-button @click="addMenu" type="primary">添加菜单</el-button>
    </div>
    <!-- 表格 -->
    <div class="content">
      <el-table :data="state.menus" stripe style="width: 860px" border>
        <el-table-column width="60" type="index" label="序号"></el-table-column>
        <el-table-column
          width="200"
          property="name"
          label="菜单名称"
        ></el-table-column>
        <el-table-column
          width="200"
          property="priority"
          label="优先级"
        ></el-table-column>
        <el-table-column
          width="200"
          property="createdTime"
          label="创建日期"
        ></el-table-column>
        <el-table-column label="操作" width="200">
          <template #default="scope">
            <el-button @click="editAction(scope.row)" type="text" size="small"
              >编辑</el-button
            >
            <el-button @click="deleteAction(scope.row)" type="text" size="small"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 添加菜单弹窗 -->
    <el-dialog
      destroy-on-close
      :title="state.dialogTitle"
      v-model="state.dialogFormVisible"
    >
      <el-form
        ref="menuFormRef"
        label-width="100px"
        label-position="right"
        :model="state.menuForm"
        :rules="state.menuFormRules"
      >
        <el-form-item label="菜单名称" prop="name">
          <el-input
            v-model="state.menuForm.name"
            placeholder="请输入菜单名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="优先级" prop="priority">
          <el-input
            v-model.number="state.menuForm.priority"
            placeholder="请输入优先级"
          ></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="state.dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleAddAction">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { ElMessage, ElMessageBox } from "element-plus";
import { defineComponent, onMounted, reactive, ref } from "vue";
import { MenusData } from "../type/index";
import Bus from "../utils/bus";
import axios from "../utils/service";

export default defineComponent({
  setup(props, context) {
    const menuFormRef = ref();
    let editId = "";
    const state = reactive({
      menus: <any[]>[],
      dialogFormVisible: false,
      dialogTitle: "",
      menuForm: {
        name: "",
        priority: 0,
      },
      menuFormRules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "长度在 2 到 10 个字符",
            trigger: "blur",
          },
        ],
        priority: [{ type: "number", message: "优先级必须为数字值" }],
      },
    });
    const addMenu = () => {
      state.dialogTitle = "新增菜单";
      state.menuForm = {
        name: "",
        priority: 0,
      };
      state.dialogFormVisible = true;
    };
    const deleteAction = (item) => {
      ElMessageBox.confirm("此操作将删除菜单下的文章,是否继续", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        await axios.post("/menu/delete", { _id: item._id });
        // 删除成功
        getMenus();
      });
    };
    const editAction = (item) => {
      console.info(item)
      state.menuForm.name = item.name;
      state.menuForm.priority = item.priority;
      editId = item._id;
      state.dialogTitle = "编辑菜单";
      state.dialogFormVisible = true;
    };

    const handleAddAction = () => {
      menuFormRef.value.validate(async (valid) => {
        if (!valid) return;
        if (editId) {
          // 编辑
          await axios.post("/menu/update", {
            _id: editId,
            ...state.menuForm,
          });
          editId = "";
          getMenus();
        } else {
          // 新增
          const res: any = await axios.post("/menu/add", state.menuForm);
          if (res._id) {
            // 添加成功，刷新列表
            getMenus();
          }
        }

        state.dialogFormVisible = false;
      });
    };
    const getMenus = async () => {
      const menusData: MenusData = await axios.post("/menu/findMany");
      state.menus = menusData.menus;
      console.log(menusData)
      Bus.$emit("MENU_CHANGE", menusData.menus);
    };

    onMounted(() => {
      getMenus();
    });
    return {
      addMenu,
      deleteAction,
      editAction,
      state,
      menuFormRef,
      handleAddAction,
      editId,
    };
  },
});
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
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
  width: 100%;
  padding: 20px 20px;
}
</style>
