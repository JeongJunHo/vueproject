
<template>
    <div>
        <h1 style="text-align: center; font-size: 3em;">
            섭취 주의 제품
        </h1>
        <hr style="margin-bottom: 40px;">

        <el-card class="box-card">
            <div>
                <div class="row text-center" v-for="item in map" :key="item.name">
                    <div v-if="item.name.length==0 &&map.length==1 ">
                        <h4> 알러지가 없으시군요!</h4>
                    </div>
                    <div v-else>
                        <div v-if="item.val.length>0">
                            <div class="col-xs-12 mb-15">
                                <h3>
                                    <span style="color: red; font-size: 1.5em;">{{item.name}}</span>(이)가 첨가된 제품 리스트
                                </h3>
                            </div>
                            <div class="col-xs-12">
                                <el-tag style="margin-right: 5px;" v-for="item2 in item.val" :key="item2.name">
                                    {{item2.name}}
                                </el-tag>
                            </div>
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
    name: "allergycautionlist",
    data() {
        return {
            errored: false,
            loading: true,
            id: '',
            count: '',
            map: []
        }
    },
    methods:{
        FoodListInfo_init(){
            this.id=JSON.parse(sessionStorage.getItem("userInfo")).id;
            http
            .get("/food/allergyfood/"+this.id)
            .then(response => {
                const obj_to_map = ( obj => {
                    const mp = new Map;
                    Object.keys ( obj ). forEach (k => { mp.set(k, obj[k]) });
                    return mp;
                });
                this.count=0;
                let map = obj_to_map ( response.data.resvalue );
                for (let [key, value] of map) {
                    this.map.push({"name" : key, "val" : value});
                    this.count++;
                }
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