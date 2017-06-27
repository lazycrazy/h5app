<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="table_container">
            <el-table :data="tableData" highlight-current-row style="width: 100%">
                <el-table-column type="index" width="100">
                </el-table-column>
                <el-table-column property="createdAt" label="注册日期" width="220">
                </el-table-column>
                <el-table-column property="username" label="用户姓名" width="220">
                </el-table-column>
                <el-table-column property="city" label="注册地址">
                </el-table-column>
            </el-table>
            <div class="Pagination" style="text-align: right;margin-top: 10px;">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="20" layout="total, prev, pager, next" :total="count">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
import headTop from 'src/components/header-a'
import moment from 'moment'
import {
    AdminAPI
} from 'src/service'
let {
    getUserList,
    getUserCount
} = AdminAPI
export default {
    data() {
            return {
                tableData: [],
                currentRow: null,
                offset: 0,
                limit: 20,
                count: 0,
                currentPage: 1,
            }
        },
        components: {
            headTop,
        },
        created() {
            this.initData();
        },
        methods: {
            async initData() {
                try {
                    const countData = await getUserCount();
                    if (countData.status == 1) {
                        this.count = countData.count;
                    } else {
                        throw new Error('获取数据失败');
                    }
                    this.getUsers();
                } catch (err) {
                    console.log('获取数据失败', err);
                }
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.offset = (val - 1) * this.limit;
                this.getUsers()
            },
            async getUsers() {
                const res = await getUserList({
                    page: this.currentPage,
                    limit: this.limit
                });

                this.tableData = [];
                res.users.forEach(item => {
                    const tableData = {};
                    tableData.username = item.username;
                    // console.log(moment(item.createdAt).format())
                    tableData.createdAt = moment(item.createdAt).format('YYYY-MM-DD HH:mm:ss');
                    tableData.city = item.city;
                    this.tableData.push(tableData);
                })
            }
        },
}
</script>
<style>
@import 'mixin.css';
.table_container {
    padding: 20px;
}
</style>
