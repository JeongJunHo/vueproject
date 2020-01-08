<template>
    <div>
        <h1 style="text-align: center; font-size: 3em;">
            쪽지 게시판
        </h1>
        <hr style="margin-bottom: 40px;">

        <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span><strong>{{notice.title}}</strong></span>
        </div>
        <div class="text item">
            <img id="product_img" class="media-object" :src="img"  width="250" style="margin: 0 auto; background: black;"/>
            <p style="font-size: x-large;">{{notice.content}}</p>
            <div class=" text-right">
                <el-button-group>
                    <el-button @click="$router.push('/noticelist')" type="primary" size="small" icon="el-icon-arrow-left">목록</el-button>
                    <el-button @click="deleteComment(notice.num)" size="small" type="primary" icon="el-icon-delete"></el-button>
                </el-button-group>
            </div>
        </div>
        </el-card>
    </div>
</template>
<script>
import http from "../http-common";
export default {
    name: "noticeview",
    props: ["num"],
    data() {
        return {
            errored: false,
            loading: true,
            img:'',
            notice: {}
        }
    },
    methods:{
        view_init(){
            http.put('/notice/updateRead', {
                num: this.num
            }).then(() => {
            })

            http
            .get("/notice/selectOne/"+this.num)
            .then(response => {
                this.notice = response.data.resvalue
				this.img = require('../'+this.notice.img);
            })
            .catch(() => {
                this.errored = true;
            })
            .finally(() => (this.loading = false));
            
        },

        deleteComment(){
            http
            .delete("/notice/delete/" + this.num)
            .then(() => {
                this.$router.push("/noticelist");
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