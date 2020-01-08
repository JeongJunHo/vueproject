<template>
    <div>
        <h1 style="text-align: center; font-size: 3em;">
            찜 식품 섭취 전&후 변화량 통계
        </h1>
        <hr style="margin-bottom: 40px;">
        <el-card class="box-card">
            <canvas id="eatDibChart"></canvas>
        </el-card>
    </div>
</template>

<script>
import http from "../http-common"
import Chart from 'chart.js'
import $ from 'jquery'

export default {
    name: "dibfoodchart",
    data() {
        return {
            errored: false,
            loading: true,
            id: JSON.parse(sessionStorage.getItem("userInfo")).id,
            todayEatMap: {},
            eatPlusDibMap: {}
        }
    },
    methods:{
        view_init(){
            http
            .get("/eatfood/todaySumList/"+this.id)
            .then(response => {
                this.todayEatMap = response.data.resvalue;

                http
                .get("/dibfood/TodayDibPlusEatSumList/"+this.id)
                .then(response2 => {
                    this.eatPlusDibMap = response2.data.resvalue;
                    
                    new Chart($("#eatDibChart"), {
                        type: 'horizontalBar',
                        data: {
                            labels : [ '탄수화믈', '단백질', '지방', '당류',
                                '나트륨', '콜레스테롤', '포화 지방산', '트렌스지방' ],
                            datasets: [{
                                label: '찜 식품 섭취 전',
                                data: [
                                    this.todayEatMap.carbo,
                                    this.todayEatMap.protein,
                                    this.todayEatMap.fat,
                                    this.todayEatMap.sugar,
                                    this.todayEatMap.natrium / 1000,
                                    this.todayEatMap.chole / 1000,
                                    this.todayEatMap.fattyacid,
                                    this.todayEatMap.transfat
                                ],
                                borderColor: "rgba(255, 201, 14, 1)",
                                backgroundColor: "rgba(255, 201, 14, 0.5)",
                                fill: false,
                            },
                            {
                                label: '찜 식품 섭취 후',
                                data: [
                                    this.eatPlusDibMap.carbo,
                                    this.eatPlusDibMap.protein,
                                    this.eatPlusDibMap.fat,
                                    this.eatPlusDibMap.sugar,
                                    this.eatPlusDibMap.natrium / 1000,
                                    this.eatPlusDibMap.chole / 1000,
                                    this.eatPlusDibMap.fattyacid,
                                    this.eatPlusDibMap.transfat
                                ],
                                borderColor: "rgba(255, 201, 255, 1)",
                                backgroundColor: "rgba(255, 201, 255, 0.5)",
                                fill: false,
                            }
                        ]
                        },
                        options: {
                            responsive: true,
                            title: {
                                display: true,
                                text: '당일 섭취량'
                            },
                            tooltips: {
                                mode: 'index',
                                intersect: false,
                            },
                            hover: {
                                mode: 'nearest',
                                intersect: true
                            },
                            scales: {
                                xAxes: [{
                                    display: true,
                                    ticks: {
                                        autoSkip: false,
                                        suggestedMin: 0
                                    },
                                    scaleLabel: {
                                        display: true,
                                        labelString: '섭취량(g)'
                                    },
                                }],
                                yAxes: [{
                                    display: true,
                                    ticks: {
                                        autoSkip: false
                                    },
                                    scaleLabel: {
                                        display: true,
                                        labelString: '영양소'
                                    }
                                }]
                            }
                        }
                    });
                })
                .catch(() => {
                    this.errored = true;
                })
            })
            .catch(() => {
                this.errored = true;
            })
            .finally(() => (this.loading = false));
		}
    },
    mounted(){
        this.view_init()
    }
}
</script>

<style scoped>
    .mb-5{
        margin-bottom: 5px;
    }
</style>