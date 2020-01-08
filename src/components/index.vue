<template>
    <div v-loading="loading">
        <h1 style="text-align: center; font-size: 3em;">
            TOP VIEW
        </h1>
        <hr style="margin-bottom: 40px;">
        <el-card class="box-card">
            <div class="row productRow">
                <div v-for="(item, index) in list" :key="item.code">

                    <div class="col-sm-6 col-md-4">
                        <div class="thumbnail" style="border:none;">
                            <div class="overlay">
                                <p class="text">RANK {{index+1}}</p>
                                <p class="text">{{item.name}}</p>
                            </div>
                            <div>
                                <img :src="require('../'+item.img)" alt="item.name" style="max-width: 100%;">
                            </div>
                            <div class="caption text-center">
                                <a @click="view(item.code)" class="btn btn-lg btn-block">
                                <font color="white">상품 정보로 이동 <i class="glyphicon glyphicon-arrow-right"></i></font>
                                </a>
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
    name: "index",
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
            .get("/food/searchbestindex")
            .then(response => {
                this.list = response.data.resvalue
            })
            .catch(() => {
                this.errored = true;
            })
            .finally(() => (this.loading = false));
        },
        view(code){
            this.$router.push("/FoodInfoDetail/" + code);
        }
    },
    mounted(){
        this.update_init();
    }
}
</script>

<style scoped>
    a:hover {
        background-color: #5BC0DE;
        color: white;
        font-style: normal;
    }

    a.productName:hover:after {
        color: white;
        background-color: black;
    }

    .image {
        display: block;
        width: 200%;
        height: auto;
    }

    .overlay {
        opacity: 0;
        transition: .5s ease;
    }

    .thumbnail:hover .overlay {
        opacity: 0.3;
    }

    .text {
        font-size: 25px;
        text-align: center;
    }
</style>