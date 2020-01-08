<template>
	<div>
		<h1 style="text-align: center; font-size: 3em;">
            상품 정보
        </h1>
        <hr style="margin-bottom: 40px;">
		<div class="row">
			<div class="col-xs-12"
				style="text-align: right; margin-bottom: 15px;">
	
				<form action="" class="form-inline" method="get" @submit.prevent="readSearchList">
					<div class="form-group">
						<select v-model="searchType" name="searchType" class="form-control">
							<option value="name" >상품명</option>
							<option value="maker" >제조사</option>
							<option value="material" >재료명</option>
						</select>
					</div>
					<div class="form-group">
						<input v-model="searchText" type="text" name="searchText" class="form-control" placeholder="검색어를 입력하세요." >
					</div>
					<button type="submit" class="btn btn-info">검색</button>
				</form>
			</div>
		</div>

		<el-card class="box-card">
			<div class="productPanel">
                <div class="row productRow" v-for="item in list" :key="item.code">
                    <div class="col-xs-12 col-sm-4 col-md-4 col-lg-3 text-center" style="max-height: 250px;">
                        <img :src="require('../'+item.img)" alt="item.name" width=230>
                        <div class="custom_tooltip" style="position: absolute; width: 230px; margin-left: -115px; background: #696969a8; bottom: 0; left: 50%; color: white; padding: 10px; vertical-align: middle; text-align: center; display: none;">
                            <p>{{item.name}}</p>
                            <p style="margin-bottom: 0;"><strong>{{item.maker}}</strong></p>
                        </div>
                    </div>
                    <div class="col-xs-12 col-sm-8 col-md-8 col-lg-9">
                        <h3>
                            <span class="productName" @click="view(item.code)" >{{item.name}}</span>
                            <span style="float: right;">view : {{item.hit}}</span>
                        </h3>
                        <hr>
                        <p>
                            {{item.material}}
                        </p>

                    </div>
                </div>
			</div>
		</el-card>
	</div>
</template>
<script>
import http from "../http-common"
import $ from 'jquery'
export default {
    name: "foodinfolist",
    data() {
        return {
            errored: false,
			loading: true,
			searchType:'name',
			searchText:'',
            list: []
        }
    },
    methods:{
        FoodListInfo_init(){
            http
            .get("/food/list")
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
		},
		readSearchList(){
            if(this.searchText.trim()==''){
                 this.FoodListInfo_init();
            }else{
                http
                .get("/food/list_search/" + this.searchType + "/" + this.searchText)
                .then(response => {
                    this.list = response.data.resvalue
                })
                .catch(() => {
                    this.errored = true;
                })
                .finally(() => (this.loading = false));
            }
		}
    }, 

    mounted(){
		this.FoodListInfo_init();
		$(".productPanel").on('mouseenter', '.productRow', function() {
			$(this).find(".custom_tooltip").stop(true, true).fadeIn({
				queue : false
			}).css('display', 'none').slideDown({
				duration : 'fast',
				queue : false
			});
		}).on('mouseleave', '.productRow', function() {
			$(this).find(".custom_tooltip").stop(true, true).slideUp({
				duration : 'fast',
				queue : false
			}).fadeOut({
				duration : 'fast',
				queue : false
			});
		});
    }
}
</script>

<style scoped>
	.productName:hover {
		color: #337ab7;
		text-decoration: underline;
		cursor: pointer;
	}
</style>