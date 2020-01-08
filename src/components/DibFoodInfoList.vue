
<template>
	<div>
        <h1 style="text-align: center; font-size: 3em;">
            찜목록 조회
        </h1>
        <hr style="margin-bottom: 40px;">
        <el-card class="box-card">
            <table class="table text-center table-bordered table-hover">
                <thead>
                    <tr>
                        <th>아이디</th>
                        <th>제품이름</th>
                        <th>제품갯수</th>
                        <th>제품사진</th>
                        <th>삭제</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in list" :key="item.num">
                        <td>{{item.id}}</td>
                        <td>{{item.name }}</td>
                        <td>{{item.cnt }}</td>
                        <td>
                            <img :src="require('../'+item.img)" alt="item.name" style="max-width: 13%;">    
                        </td>
                        <td>
                            <el-button @click="eatfood_delete(item.code)" type="danger" icon="el-icon-delete" circle></el-button>
                        </td>
                    </tr>
                    <!-- <c:if test="${list.size() == 0}">
                        <tr>
                            <td colspan="5" align="center">찜목록이 없습니다.</td>
                        </tr>
                    </c:if> -->
                </tbody>
            </table>
		</el-card>
	</div>
</template>

<script>
import http from "../http-common";
export default {
    name: "dibfoodinfolist",
    data() {
        return {
            errored: false,
            loading: true,
            id:'',
            list: []
        }
    },
    methods:{
        eatfood_init(){
            this.id=JSON.parse(sessionStorage.getItem("userInfo")).id;
            http
            .get("/dibfood/list/"+this.id)
            .then(response => {
                this.list = response.data.resvalue
            })
            .catch(() => {
                this.errored = true;
            })
            .finally(() => (this.loading = false));
        },
        eatfood_delete(num){
            http
            .delete("/dibfood/delete/"+this.id+"/"+ num)
            .then(response => {
                alert(response.data.resmsg)
                this.eatfood_init();
            })
            .catch(() => {
                this.errored = true;
            })
            .finally(() => (this.loading = false));
        }
    },
    mounted(){
        this.eatfood_init();
    }
}
</script>

<style scoped>

</style>