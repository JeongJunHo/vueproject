
<template>
    <div v-loading="loading">
        <h1 style="text-align: center; font-size: 3em;">
            공지 게시판
        </h1>
        <hr style="margin-bottom: 40px;">

        <!-- <div class="panel panel-default"> -->
        <el-card class="box-card">
            <table class="table text-center table-bordered table-hover">
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>아이디</th>
                        <th>제목</th>
                        <th>조회수</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in list" :key="item.num">
                        <td>{{item.num}}</td>
                        <td>{{item.id}}</td>
                        <td v-html="item.title" @click="view(item.num)" style="color: #4e4eca; cursor:pointer;"></td>
                        <td>{{item.hit}}</td>
                    </tr>
                    <tr v-if="list.length==0">
                        <td colspan="4" align="center">공지가 없습니다.</td>
                    </tr>
                </tbody>
            </table>
            <div class="row">
                <div class="col-sm-12 text-right">
                    <template v-if="this.$store.state.isLogin">
                        <el-button @click="$router.push('/boardinsert')" size="small" type="primary" icon="el-icon-edit"></el-button>
                    </template>
                </div>
            </div>
        </el-card>
        <!-- </div> -->
    </div>
</template>

<script>
import http from "../http-common";
export default {
    name: "boardlist",
    data() {
        return {
            errored: false,
            loading: true,
            list: []
        }
    },
    methods:{
        update_init(){
            http
            .get("/board/boardlist")
            .then(response => {
                this.list = response.data.resvalue
            })
            .catch(() => {
                this.errored = true;
            })
            .finally(() => (this.loading = false));
        },
        view(num){
            this.$router.push("boardview/"+num);
        }
    },
    mounted(){
        this.update_init();
    }
}
</script>

<style scoped>

</style>