

<template>
    <div>
        <h1 style="text-align: center; font-size: 3em;">
            섭취 식품 조회
        </h1>
        <hr style="margin-bottom: 40px;">
        <el-card class="box-card">
            <table class="table text-center table-bordered table-hover">
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>아이디</th>
                        <th>제품명</th>
                        <th>섭취량</th>
                        <th>섭취일자</th>
                        <th>act</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in list" :key="item.num">
                        <td>{{item.num}}</td>
                        <td>{{item.id }}</td>
                        <td>{{item.foodName }}</td>
                        <td>{{item.cnt }}</td>
                        <td>{{item.eatdate}}</td>
                        <td>
                            <el-button @click="eatfood_delete(item.num)" type="danger" icon="el-icon-delete" circle></el-button>
                        </td>
                    </tr>
                    <tr v-if="list.length==0">
                        <td colspan="6" align="center">섭취정보가 없습니다.</td>
                    </tr>
                </tbody>
            </table>
        </el-card>
	</div>
</template>

<script>
import http from "../http-common";
export default {
    name: "eatfoodinfolist",
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
            .get("/eatfood/listById/"+this.id)
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
            .delete("/eatfood/delete/" + num)
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