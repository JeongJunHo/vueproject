<template>
    <div v-loading="loading">
		<h1 style="text-align: center; font-size: 3em;">
            What Is This?
        </h1>
		<hr style="margin-bottom: 40px;">
        <div id="label-container"></div>
        <div id="label-detail"></div>
        <div id="webcam-container"></div>
        <div class="text-center" style="margin-bottom: 15px;">
            <el-button @click="run()" type="success" icon="el-icon-camera">상품 검색</el-button>
        </div>

        <template v-if="find">
            <el-table
            :data="shoppingInfo"
            stripe
            style="width: 100%">
                <el-table-column
                label="미리보기"
                width="300">
                    <template slot-scope="scope">
                        <el-image
                        :src="scope.row.ProductImage300"
                        fit="scale-down"></el-image>
                    </template>
                </el-table-column>
                <el-table-column
                label="상품정보">
                    <template slot-scope="scope">
                        <h2 style="margin-bottom:20px;"><a :href="scope.row.DetailPageUrl" target="_blank">{{scope.row.ProductName}}</a></h2>
                        <template v-if="scope.row.Discount > 0">
                            <p style="font-size:4rem; text-align:right;">
                                <span style="font-size:0.8em; text-decoration: line-through; margin-right:10px;">{{scope.row.ProductPrice}}원</span>
                                <span style="font-weight: bold; margin-right:20px;">{{scope.row.SalePrice}}원</span>
                            </p>
                        </template>
                        <template v-else>
                            <p style="font-size:4rem; text-align:right;">
                                <span style="font-weight: bold; margin-right:20px;">{{scope.row.SalePrice}}원</span>
                            </p>
                        </template>
                        
                        판매자평점
                        <el-rate
                        v-model="scope.row.SellerGrd"
                        disabled
                        show-score
                        text-color="#ff9900"
                        score-template="{value} points">
                        </el-rate>

                        구매만족도
                        <el-rate
                        v-model="scope.row.BuyRate"
                        disabled
                        show-score
                        text-color="#ff9900"
                        score-template="{value} points">
                        </el-rate>

                        <p style="margin-top: 20px;"><strong>리뷰 {{scope.row.ReviewCount}} 건</strong></p>
                    </template>
                </el-table-column>
            </el-table>
        </template>
    </div>
</template>

<script>
import * as myscript from '../assets/js/myscript.js'
import http from "../http-common";
export default {
    name: "whatisthis",
    myscript,
    data() {
        return {
            errored: false,
            loading: true,
            shoppingInfo: null,
            find: false
        }
    },
    methods:{
        run(){
            myscript.predict().then(function(){
                if(myscript.findProduct != ""){
                    this.find = true
                    this.shoppingInfo_init(myscript.findProduct)
                }else{
                    this.find = false
                }
            }.bind(this));
        },
        shoppingInfo_init(product){
            const keyword = product
            this.loading = true
            http
            .get("/11stopenapi/search/" + keyword)
            .then(response => {
				this.shoppingInfo = response.data.resvalue
				for (const i of this.shoppingInfo) {
					i.BuyRate = i.BuySatisfy / 20
					i.SellerGrd = Number(i.SellerGrd)
				}
				window.console.log(this.shoppingInfo)
            })
            .catch(() => {
                this.errored = true;
            })
			.finally(() => (this.loading = false));
		}
    },
    mounted() {
        // const plugin = document.createElement("script");
        // plugin.setAttribute(
        // "src",
        // "https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@1.3.1/dist/tf.min.js"
        // );
        // plugin.async = false;
        // document.head.appendChild(plugin);
        // const plugin2 = document.createElement("script");
        // plugin2.setAttribute(
        // "src",
        // "https://cdn.jsdelivr.net/npm/@teachablemachine/image@0.8/dist/teachablemachine-image.min.js"
        // );
        // plugin2.async = false;
        // document.head.appendChild(plugin2);
        window.console.log(myscript.findProduct);
        myscript.init();
        setTimeout(() => {
            this.loading = false;
        }, 3000);
    }    
}
</script>

<style scoped>
    #webcam-container{
        text-align: center;
    }
    #label-container{
        text-align: center;
        font-size: 3rem;
        margin-bottom: 15px;
    }
    #label-detail{
        text-align: center;
        font-size: 2rem;
        margin-bottom: 15px;
        color: red;
    }
</style>