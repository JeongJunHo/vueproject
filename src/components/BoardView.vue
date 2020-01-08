<template>
    <div>
        <h1 style="text-align: center; font-size: 3em;">
            공지 게시판
        </h1>
        <hr style="margin-bottom: 40px;">

        <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span><strong>{{board.title}}</strong></span>
        </div>
        <div class="text item">
            <p>{{board.document}}</p>

            <div class=" text-right">
                <el-button-group>
                    <el-button @click="$router.push('/boardlist')" type="primary" size="small" icon="el-icon-arrow-left">목록</el-button>
                    <template v-if="this.$store.state.isLogin && this.$store.state.userInfo.id === board.id">
                        <el-button @click="updatefunc()" size="small" type="primary" icon="el-icon-edit"></el-button>
                        <el-button @click="deleteComment(board.num)" size="small" type="primary" icon="el-icon-delete"></el-button>
                    </template>
                </el-button-group>
            </div>
        </div>
        </el-card>
    </div>
</template>
<script>
import http from "../http-common";
export default {
    name: "boardview",
    props: ["num"],
    data() {
        return {
            errored: false,
            loading: true,
            board: {}
        }
    },
    methods:{
        view_init(){
            http
            .get("/board/boardview/"+this.num)
            .then(response => {
                this.board = response.data.resvalue
            })
            .catch(() => {
                this.errored = true;
            })
            .finally(() => (this.loading = false));
        },
        updatefunc(){
            this.$router.push("/boardupdate/"+this.num);
        },
        deleteComment(){
            http
            .delete("/board/boarddelete/" + this.num)
            .then(response => {
                alert(response.data.resmsg)
                this.$router.push("/boardlist");
            })
            .catch(() => {
            this.errored = true;
            })
            .finally(() => (this.loading = false));
        }
    },
    mounted(){
        this.view_init();
    }
}
</script>

<style scoped>

</style>