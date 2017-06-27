<template>
    <div class="manage_page fillcontain">
        <el-row style="height: 100%;">
            <el-col :span="4" style="min-height: 100%; background-color: #324057;">
                <el-menu :default-active="defaultActive" style="min-height: 100%;" theme="dark" router>
                    <el-menu-item index="/manage"><i class="el-icon-menu"></i>首页</el-menu-item>
                    <el-submenu index="2">
                        <template slot="title"><i class="el-icon-document"></i>数据管理</template>
                        <el-menu-item index="/manage/userlist">管理员列表</el-menu-item>
                        <el-menu-item index="/manage/shoplist">商家列表</el-menu-item>
                    </el-submenu>
                    <el-submenu index="3">
                        <template slot="title"><i class="el-icon-plus"></i>添加数据</template>
                        <el-menu-item index="/manage/addshop">添加商铺</el-menu-item>
                        <el-menu-item index="/manage/addgoods">添加商品</el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-col>
            <el-col :span="20" style="height: 100%;overflow: auto;">
                <router-view></router-view>
            </el-col>
        </el-row>
    </div>
</template>
<script>
export default {
    computed: {
        defaultActive: function() {
            return this.$route.path.replace('/', '');
        }
    },
}
</script>
<style scoped>
@import 'mixin.css';
.manage_page {}
</style>
