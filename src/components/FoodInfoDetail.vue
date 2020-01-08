<template>
	<div class="container">
		<h1 style="text-align: center; font-size: 3em;">제품 정보</h1>
		<hr style="margin-bottom: 40px;">
		<div class="row productRow">
			<div class="col-xs-12 col-sm-5 col-md-4 col-lg-3">
				<img id="product_img" class="media-object" :src="img"  width="250" style="margin: 0 auto; background: black;"/>
				<div v-if="food.allergyWarning" class="custom_tooltip" style="background: rgba(105, 105, 105, 0.66); bottom: 0px; color: white; padding: 10px; vertical-align: middle; text-align: center; display:${food.allergyWarning eq true ? 'block;' : 'none;'}">
					<p>주의</p>
					<p style="margin-bottom: 0;"><strong>알러지 제품입니다!</strong></p>
				</div>
			</div>

			<div class="col-xs-12 col-sm-7 col-md-8 col-lg-9">
				<table class="table table-hover">
					<tbody>
						<tr>
							<th>제품명</th>
							<td id="product_name">
								{{food.name}}
							</td>
						</tr>
						<tr>
							<th>제조사</th>
							<td id="product_maker">{{food.maker}}</td>
						</tr>
						<tr>
							<th>원재료</th>
							<td>
								<p id="product_material">{{food.material}}</p>
							</td>
						</tr>
						<tr>
							<th>검색빈도</th>
							<td>
								{{food.hit}}
							</td>
						</tr>
						<tr>
							<th>알러지 리스트</th>
							<td>
								{{allergy}}
							</td>
						</tr>
					</tbody>
				</table>


				<template v-if="this.$store.state.isLogin">
					<div class="input-group">
						<span class="input-group-addon" id="basic-addon1">수량</span>
						<input v-model="cnt" type="number" id="cnt" name="cnt" class="form-control" placeholder="수량을 입력하세요." value="1" min="1">
						<span class="input-group-btn">
							<button type="button"  @click="add_eat()" class="btn btn-flat btn-info eatFoodBtn">
								<i class="glyphicon glyphicon-tag" ></i> 추가
							</button>
							<a  class="btn btn-flat btn-info" @click="add_dib()" role="button">
								<i class="glyphicon glyphicon-tag" ></i> 찜
							</a>
						</span>
					</div>				
				</template>				
			</div>
		</div>

		<h1 style="text-align: center; font-size: 3em;">영양 정보</h1>
		<hr style="margin-bottom: 40px;">
		<div class="row">
			<div class="col-sm-8">
				<canvas id="myChart" style="max-height: 600px; max-width: 600px;"></canvas>
			</div>

			<div class="col-sm-4">
				<table class="table">
					<tbody>
						<tr>
							<td>일일 제공량</td>
							<td id="SERVING_WT">{{food.supportpereat}}</td>
						</tr>

						<tr>
							<td>칼로리</td>
							<td id="NUTR_CONT1">{{food.calory}}</td>
						</tr>

						<tr>
							<td>탄수화물(g)</td>
							<td id="NUTR_CONT2">{{food.carbo}}</td>
						</tr>

						<tr>
							<td>단백질(g)</td>
							<td id="NUTR_CONT3">{{food.protein}}</td>
						</tr>

						<tr>
							<td>지방(g)</td>
							<td id="NUTR_CONT4">{{food.fat}}</td>
						</tr>

						<tr>
							<td>당류(g)</td>
							<td id="NUTR_CONT5">{{food.sugar}}</td>
						</tr>

						<tr>
							<td>나트륨(mg)</td>
							<td id="NUTR_CONT6">{{food.natrium}}</td>
						</tr>

						<tr>
							<td>콜레스테롤(mg)</td>
							<td id="NUTR_CONT7">{{food.chole}}</td>
						</tr>

						<tr>
							<td>포화 지방산(g)</td>
							<td id="NUTR_CONT8">{{food.fattyacid}}</td>
						</tr>

						<tr>
							<td>트렌스지방(g)</td>
							<td id="NUTR_CONT9">{{food.transfat}}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>

		<h1 style="text-align: center; font-size: 3em;">쇼핑 정보</h1>
		<hr style="margin-bottom: 40px;">
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
	</div>

</template>

<script>
import http from "../http-common";
import Chart from 'chart.js';

export default {
    name: "foodinfodetail",
    props: ["code"],
    data() {
        return {
            errored: false,
            loading: true,
			img:'',
			id:'',
			cnt:'',
			restUrl:'',
			food: {},
			total_allergy:[],
			allergy:'',
			shoppingInfo: null
        }
    },
    methods:{
		
        view_init(){
			if(JSON.parse(sessionStorage.getItem("userInfo"))==null){
				this.restUrl="/food/view/"+this.code;
			}else{
				this.restUrl="/food/view_id/"+this.code+"/"+JSON.parse(sessionStorage.getItem("userInfo")).id;
			}
            http
            .get(this.restUrl)
            .then(response => {
				this.food = response.data.resvalue;
				this.shoppingInfo_init()
				http
				.get("/allergy/list")
				.then(response => {
					this.total_allergy = response.data.resvalue
					this.total_allergy.forEach(element => {
						if(this.food.material.includes(element.name)){
							this.allergy=this.allergy+" "+element.name;
							window.console.log(element.name);
						}
					});
				})
				.catch(() => {
					this.errored = true;
				})
				.finally(() => (this.loading = false));

				this.img = require('../'+response.data.resvalue.img);

				var data = {
					datasets : [ {
						backgroundColor : [ 'rgba(0, 100, 0, 0.25)',
								'rgba(0, 0, 100, 0.25)',
								'rgba(100, 100, 0, 0.25)',
								'rgba(0, 100, 100, 0.25)',
								'rgba(100, 0, 100, 0.25)',
								'rgba(100, 100, 100, 0.25)',
								'rgba(0, 0, 0, 0.25)',
								'rgba(200, 100, 250, 0.25)' ],
						data : [ 
								this.food.carbo,
								this.food.protein,
								this.food.fat,
								this.food.sugar,
								this.food.natrium / 1000,
								this.food.chole / 1000,
								this.food.fattyacid,
								this.food.transfat
						]
					} ],

					labels : [ '탄수화믈', '단백질', '지방', '당류',
							'나트륨', '콜레스테롤', '포화 지방산', '트렌스지방' ]
				};
				const ctx = document.getElementById('myChart');
				new Chart(ctx, {
					type : 'doughnut',
					data : data
				});
            })
            .catch(() => {
                this.errored = true;
            })
			.finally(() => (this.loading = false));
		},

		add_eat(){
			if(this.cnt>0){
				http.post('/eatfood/insert', {
					id: JSON.parse(sessionStorage.getItem("userInfo")).id,
					code: this.food.code,
					cnt: this.cnt
				}).then(() => {
					alert("섭취목록에 추가되었습니다");
					if(this.food.allergyWarning){
						http.post('/notice/insert', {
							id: JSON.parse(sessionStorage.getItem("userInfo")).id,
							from_id: 'ssafy',
							title: "알러지 식품 섭취 주의",
							content: "알러지 식품 "+this.food.name+"을 섭취하셨습니다",
							img: this.food.img
						}).then(() => {
						})						
					}
				})
			}
			else{
				alert("양수를 입력하세요")
			}
		},
		add_dib(){
			if(this.cnt>0){
				http.post('/dibfood/addlist', {
					id: this.id=JSON.parse(sessionStorage.getItem("userInfo")).id,
					code: this.food.code,
					cnt: this.cnt
				}).then(() => {
					alert("찜목록에 추가되었습니다");
					if(this.food.allergyWarning){
						http.post('/notice/insert', {
							id: JSON.parse(sessionStorage.getItem("userInfo")).id,
							from_id: 'ssafy',
							title: "알러지 식품 찜 주의",
							content: "알러지 식품 "+this.food.name+"을 찜하셨습니다",
							img: this.food.img
						}).then(() => {
						})						
					}
				})				
			}
			else{
				alert("양수를 입력하세요")
			}
		},
		shoppingInfo_init(){
			const keyword = this.food.name
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
    mounted(){
		this.view_init();
    }
}
</script>

<style scoped>
	a.productName:link {
		color: black;
		text-decoration: none;
	}

	a.productName:visited {
		color: black;
		text-decoration: none;
	}

	a.productName:hover {
		color: #337ab7;
		text-decoration: underline;
	}
</style>