<template>
    <div>
        <h1 style="text-align: center; font-size: 3em;">
            베스트 섭취 정보
        </h1>
        <hr style="margin-bottom: 40px;">

		<el-card class="box-card">
            <div class="row productRow">
                <div class="col-sm-6 col-md-6" v-for="item in list" :key="item.code">
                    <div class="thumbnail">
                        <img :src="require('../'+item.img)" alt="item.name" style="max-width: 50%;">
                        <div class="caption">
                            <h3>
                                {{item.name}}
                                <span style="float: right;">총 판매량  : {{item.sum}}</span>
                            </h3>
                            <p class="small material">{{item.material}}</p>
                        </div>
                    </div>
                </div>
            </div>
		</el-card>
	</div>
</template>

<script>
import http from "../http-common";
export default {
    name: "bestfoodinfolist",
    data() {
        return {
            errored: false,
            loading: true,
            list: []
        }
    },
    methods:{
        FoodListInfo_init(){
            http
            .get("/food/bestfoodlist")
            .then(response => {
                this.list = response.data.resvalue
            })
            .catch(() => {
                this.errored = true;
            })
            .finally(() => (this.loading = false));
        }
    }, 

    mounted(){
        this.FoodListInfo_init();
    }
}
</script>

<style scoped>

</style>