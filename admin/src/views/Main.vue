<template>
  <div>
    <el-container direction="vertical">
      <el-header height=""> </el-header>
      <el-container direction="horizontal">
        <el-aside width="200px">
          <!-- 菜单 -->
          <el-menu mode="vertical" :default-active="$router.path" router>
            <el-submenu
              v-for="(item, index) in menu.items"
              :index="`menu_item-${index}`"
              :key="`menu_item-${index}`"
            >
              <template slot="title">{{ item.title }}</template>
              <el-menu-item
                v-for="(subItem, subIndex) in item.items"
                :index="subItem.path"
                :key="`subItem-${index}-${subIndex}`"
              >
                {{ subItem.title }}

              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-container direction="vertical">
          <el-main height="">
            <!-- bili后台 -->
            <router-view :key="$router.path"></router-view>
          </el-main>
          <el-footer height="">
          </el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menu: {
        items: [
          {
            title: "内容管理",
            items: [
                { title: "首页", path: "/" },
                { title: "课程管理", path: "/course/list" },
                { title: "课时管理", path: "/episodes/list" },
                ]
          },
          {
            title: "用户",
            items: [
                { title: "用户管理", path: "/users/list" },
                ]
          },
        ],
      },
    };
  },
};
</script>

<style scoped>
</style>