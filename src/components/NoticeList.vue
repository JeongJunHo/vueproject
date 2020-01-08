
<template>
    <div>
        <h1 style="text-align: center; font-size: 3em;">
            쪽지 게시판
        </h1>
        <hr style="margin-bottom: 40px;">

        <div class="panel panel-default">
            <div class="panel-body">
                <table class="table text-center table-bordered table-hover">
                    <thead>
                        <tr>
                            <th>보낸 사람</th>
                            <th>내용</th>
                            <th>보낸 시간</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in list" :key="item.num">
                            <td>{{item.id}}</td>
                            <td v-if="item.read==0" v-html="item.content" @click="view(item.num)"  style="color: #4e4eca; "></td>
                            <td v-else v-html="item.content" @click="view(item.num)" ></td>
                            <td>{{item.regdate}}</td>
                        </tr>
                        <tr v-if="list.length==0">
                            <td colspan="4" align="center">쪽지가가 없습니다.</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import http from "../http-common";
export default {
    name: "noticelist",
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
            .get("/notice/selectList/"+JSON.parse(sessionStorage.getItem("userInfo")).id)
            .then(response => {
                this.list = response.data.resvalue
                window.console.log(this.list);
            })
            .catch(() => {
                this.errored = true;
            })
            .finally(() => (this.loading = false));
        },
        view(num){
            this.$router.push("noticeview/"+num);
        }
    },
    mounted(){
        this.update_init();
    }
}
</script>

<style scoped>

</style>