<template>
    <div>
        <h1 style="text-align: center; font-size: 3em;">
            섭취 식품 통계
        </h1>
        <hr style="margin-bottom: 40px;">
        <el-card class="box-card">
            <div class="mb-5">
                <span class="demonstration">조회기간 </span>
                <el-date-picker
                v-model="sdate"
                type="date"
                format="yyyyMMdd"
                placeholder="Pick a day"
                @change=view_init()>
                </el-date-picker>
                <span class="demonstration"> ~ </span>
                <el-date-picker
                v-model="edate"
                type="date"
                format="yyyyMMdd"
                placeholder="Pick a day"
                :picker-options="pickerOptions"
                @change=view_init()>
                </el-date-picker>
            </div>

            <template v-if="searchError">
                <el-alert
                    title="날짜 설정 오류"
                    type="error"
                    description="시작일자를 종료일자 이후로 설정해주세요."
                    show-icon>
                </el-alert>
            </template>
            
            <hr style="margin-bottom: 40px;">
            <div class="row">
                <div id="myChart" class="col-sm-8">
                    
                </div>
    
                <div class="col-sm-4">
                    <table class="table">
                        <tbody>
                            <tr>
                                <td>칼로리</td>
                                <td id="calory">{{totalEatMap.calory}}</td>
                            </tr>
        
                            <tr>
                                <td>탄수화물(g)</td>
                                <td id="carbo">{{totalEatMap.carbo}}</td>
                            </tr>
        
                            <tr>
                                <td>단백질(g)</td>
                                <td id="protein">{{totalEatMap.protein}}</td>
                            </tr>
        
                            <tr>
                                <td>지방(g)</td>
                                <td id="fat">{{totalEatMap.fat}}</td>
                            </tr>
        
                            <tr>
                                <td>당류(g)</td>
                                <td id="sugar">{{totalEatMap.sugar}}</td>
                            </tr>
        
                            <tr>
                                <td>나트륨(mg)</td>
                                <td id="natrium">{{totalEatMap.natrium}}</td>
                            </tr>
        
                            <tr>
                                <td>콜레스테롤(mg)</td>
                                <td id="chole">{{totalEatMap.chole}}</td>
                            </tr>
        
                            <tr>
                                <td>포화 지방산(g)</td>
                                <td id="fattyacid">{{totalEatMap.fattyacid}}</td>
                            </tr>
        
                            <tr>
                                <td>트렌스지방(g)</td>
                                <td id="transfat">{{totalEatMap.transfat}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            
            <hr style="margin-bottom: 40px;">
            <div class="row">
                <div id="caloryChart" class="col-md-6">
                    
                </div>
                <div id="carboChart" class="col-md-6">
                    
                </div>
                <div id="proteinChart" class="col-md-6">
                    
                </div>
                <div id="fatChart" class="col-sm-6">
                    
                </div>
                <div id="sugarChart" class="col-sm-6">
                    
                </div>
                <div id="natriumChart" class="col-sm-6">
                    
                </div>
                <div id="choleChart" class="col-sm-6">
                    
                </div>
                <div id="fattyacidChart" class="col-sm-6">
                    
                </div>
                <div id="transfatChart" class="col-sm-6">
                    
                </div>
            </div>
        </el-card>
    </div>
</template>

<script>
import http from "../http-common";
import Chart from 'chart.js';

export default {
    name: "eatfoodchart",
    data() {
        return {
            errored: false,
            loading: true,
            id: JSON.parse(sessionStorage.getItem("userInfo")).id,
            sdate: this.$moment(new Date()).subtract(21, 'days').format("YYYY/MM/DD"),
            edate: this.$moment(new Date()).format("YYYY/MM/DD"),
            totalEatMap: {},
            dayTotalEatMapList: [],
            eatdateList: [],
            caloryList: [],
            carboList: [],
            proteinList: [],
            fatList: [],
            sugarList: [],
            natriumList: [],
            choleList: [],
            fattyacidList: [],
            transfatList: [],
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() > Date.now();
                }
            },
            searchError: false
        }
    },
    methods:{
        view_init(){
            if(this.sdate > this.edate){
                this.searchError = true
                return;
            }else{
                this.searchError = false
            }
            
            http
            .get("/eatfood/totalEatMap/"+this.id + "/" + this.$moment(this.sdate).format("YYYYMMDD") + "/" + this.$moment(this.edate).format("YYYYMMDD"))
            .then(response => {
                this.totalEatMap = response.data.resvalue;

				let data = {
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
								this.totalEatMap.carbo,
								this.totalEatMap.protein,
								this.totalEatMap.fat,
								this.totalEatMap.sugar,
								this.totalEatMap.natrium / 1000,
								this.totalEatMap.chole / 1000,
								this.totalEatMap.fattyacid,
								this.totalEatMap.transfat
						]
					} ],

					labels : [ '탄수화믈', '단백질', '지방', '당류',
							'나트륨', '콜레스테롤', '포화 지방산', '트렌스지방' ]
                };
                
                let myCanvas = document.createElement("canvas")
                document.getElementById("myChart").innerHTML = ''
                document.getElementById("myChart").appendChild(myCanvas)
				new Chart(myCanvas, {
					type : 'doughnut',
					data : data
				});
            })
            .catch(() => {
                this.errored = true;
            })
            .finally(() => (this.loading = false));

            http
            .get("/eatfood/dayTotalEatMapList/"+this.id + "/" + this.$moment(this.sdate).format("YYYYMMDD") + "/" + this.$moment(this.edate).format("YYYYMMDD"))
            .then(response => {
                this.dayTotalEatMapList = response.data.resvalue
                this.caloryList = []
                this.carboList = []
                this.choleList = []
                this.eatdateList = []
                this.fatList = []
                this.fattyacidList = []
                this.natriumList = []
                this.proteinList = []
                this.sugarList = []
                this.transfatList = []
                for (const obj of response.data.resvalue) {                    
                    this.caloryList.push(obj['calory'])
                    this.carboList.push(obj['carbo'])
                    this.choleList.push(obj['chole'])
                    this.eatdateList.push(obj['eatdate'])
                    this.fatList.push(obj['fat'])
                    this.fattyacidList.push(obj['fattyacid'])
                    this.natriumList.push(obj['natrium'])
                    this.proteinList.push(obj['protein'])
                    this.sugarList.push(obj['sugar'])
                    this.transfatList.push(obj['transfat'])
                }

                let caloryCanvas = document.createElement("canvas")
                document.getElementById("caloryChart").innerHTML = ''
                document.getElementById("caloryChart").appendChild(caloryCanvas)
                new Chart(caloryCanvas, {
                    type: 'line',
                    data: {
                        labels:this.eatdateList,
                        datasets: [{
                            label: '칼로리',
                            data: this.caloryList,
                            borderColor: "rgba(255, 201, 14, 1)",
                            backgroundColor: "rgba(255, 201, 14, 0.5)",
                            fill: true,
                            lineTension: 0
                        }]
                    },
                    options: {
                        responsive: true,
                        title: {
                            display: true,
                            text: '칼로리 섭취 통계'
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
                                scaleLabel: {
                                    display: true,
                                    labelString: '섭취일'
                                }
                            }],
                            yAxes: [
                                {
                                    display: true,
                                    ticks: {
                                        suggestedMin: 0,
                                    },
                                    scaleLabel: {
                                        display: true,
                                        labelString: '칼로리 섭취량'
                                    }
                                }]
                        }
                    }
                });

                let carboCanvas = document.createElement("Canvas")
                document.getElementById("carboChart").innerHTML = ''
                document.getElementById("carboChart").appendChild(carboCanvas)
                new Chart(carboCanvas, {
                    type: 'line',
                    data: {
                        labels:this.eatdateList,
                        datasets: [{
                            label: '탄수화물',
                            data: this.carboList,
                            borderColor: "rgba(200, 201, 14, 1)",
                            backgroundColor: "rgba(200, 201, 14, 0.5)",
                            fill: true,
                            lineTension: 0
                        }]
                    },
                    options: {
                        responsive: true,
                        title: {
                            display: true,
                            text: '탄수화물 섭취 통계'
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
                                scaleLabel: {
                                    display: true,
                                    labelString: '섭취일'
                                }
                            }],
                            yAxes: [
                                {
                                    display: true,
                                    ticks: {
                                        suggestedMin: 0,
                                    },
                                    scaleLabel: {
                                        display: true,
                                        labelString: '탄수화물 섭취량'
                                    }
                                }]
                        }
                    }
                });

                let proteinCanvas = document.createElement("canvas")
                document.getElementById("proteinChart").innerHTML = ''
                document.getElementById("proteinChart").appendChild(proteinCanvas)
                new Chart(proteinCanvas, {
                    type: 'line',
                    data: {
                        labels:this.eatdateList,
                        datasets: [{
                            label: '단백질',
                            data: this.proteinList,
                            borderColor: "rgba(100, 201, 14, 1)",
                            backgroundColor: "rgba(100, 201, 14, 0.5)",
                            fill: true,
                            lineTension: 0
                        }]
                    },
                    options: {
                        responsive: true,
                        title: {
                            display: true,
                            text: '단백질 섭취 통계'
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
                                scaleLabel: {
                                    display: true,
                                    labelString: '섭취일'
                                }
                            }],
                            yAxes: [
                                {
                                    display: true,
                                    ticks: {
                                        suggestedMin: 0,
                                    },
                                    scaleLabel: {
                                        display: true,
                                        labelString: '단백질 섭취량'
                                    }
                                }]
                        }
                    }
                });

                let fatCanvas = document.createElement("canvas")
                document.getElementById("fatChart").innerHTML = ''
                document.getElementById("fatChart").appendChild(fatCanvas)
                new Chart(fatCanvas, {
                    type: 'line',
                    data: {
                        labels:this.eatdateList,
                        datasets: [{
                            label: '지방',
                            data: this.fatList,
                            borderColor: "rgba(0, 150, 14, 1)",
                            backgroundColor: "rgba(0, 150, 14, 0.5)",
                            fill: true,
                            lineTension: 0
                        }]
                    },
                    options: {
                        responsive: true,
                        title: {
                            display: true,
                            text: '지방 섭취 통계'
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
                                scaleLabel: {
                                    display: true,
                                    labelString: '섭취일'
                                }
                            }],
                            yAxes: [
                                {
                                    display: true,
                                    ticks: {
                                        suggestedMin: 0,
                                    },
                                    scaleLabel: {
                                        display: true,
                                        labelString: '지방 섭취량'
                                    }
                                }]
                        }
                    }
                });

                let sugarCanvas = document.createElement("canvas")
                document.getElementById("sugarChart").innerHTML = ''
                document.getElementById("sugarChart").appendChild(sugarCanvas)
                new Chart(sugarCanvas, {
                    type: 'line',
                    data: {
                        labels:this.eatdateList,
                        datasets: [{
                            label: '당류',
                            data: this.sugarList,
                            borderColor: "rgba(255, 201, 100, 1)",
                            backgroundColor: "rgba(255, 201, 100, 0.5)",
                            fill: true,
                            lineTension: 0
                        }]
                    },
                    options: {
                        responsive: true,
                        title: {
                            display: true,
                            text: '당류 섭취 통계'
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
                                scaleLabel: {
                                    display: true,
                                    labelString: '섭취일'
                                }
                            }],
                            yAxes: [
                                {
                                    display: true,
                                    ticks: {
                                        suggestedMin: 0,
                                    },
                                    scaleLabel: {
                                        display: true,
                                        labelString: '당류 섭취량'
                                    }
                                }]
                        }
                    }
                });

                let natriumCanvas = document.createElement("canvas")
                document.getElementById("natriumChart").innerHTML = ''
                document.getElementById("natriumChart").appendChild(natriumCanvas)
                new Chart(natriumCanvas, {
                    type: 'line',
                    data: {
                        labels:this.eatdateList,
                        datasets: [{
                            label: '칼로리',
                            data: this.natriumList,
                            borderColor: "rgba(255, 201, 200, 1)",
                            backgroundColor: "rgba(255, 201, 200, 0.5)",
                            fill: true,
                            lineTension: 0
                        }]
                    },
                    options: {
                        responsive: true,
                        title: {
                            display: true,
                            text: '나트륨 섭취 통계'
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
                                scaleLabel: {
                                    display: true,
                                    labelString: '섭취일'
                                }
                            }],
                            yAxes: [
                                {
                                    display: true,
                                    ticks: {
                                        suggestedMin: 0,
                                    },
                                    scaleLabel: {
                                        display: true,
                                        labelString: '나트륨 섭취량'
                                    }
                                }]
                        }
                    }
                });

                let choleCanvas = document.createElement("canvas")
                document.getElementById("choleChart").innerHTML = ''
                document.getElementById("choleChart").appendChild(choleCanvas)
                new Chart(choleCanvas, {
                    type: 'line',
                    data: {
                        labels:this.eatdateList,
                        datasets: [{
                            label: '콜레스테롤',
                            data: this.choleList,
                            borderColor: "rgba(100, 100, 200, 1)",
                            backgroundColor: "rgba(100, 100, 200, 0.5)",
                            fill: true,
                            lineTension: 0
                        }]
                    },
                    options: {
                        responsive: true,
                        title: {
                            display: true,
                            text: '콜레스테롤 섭취 통계'
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
                                scaleLabel: {
                                    display: true,
                                    labelString: '섭취일'
                                }
                            }],
                            yAxes: [
                                {
                                    display: true,
                                    ticks: {
                                        suggestedMin: 0,
                                    },
                                    scaleLabel: {
                                        display: true,
                                        labelString: '콜레스테롤 섭취량'
                                    }
                                }]
                        }
                    }
                });

                let fattyacidCanvas = document.createElement("canvas")
                document.getElementById("fattyacidChart").innerHTML = ''
                document.getElementById("fattyacidChart").appendChild(fattyacidCanvas)
                new Chart(fattyacidCanvas, {
                    type: 'line',
                    data: {
                        labels:this.eatdateList,
                        datasets: [{
                            label: '포화 지방산',
                            data: this.fattyacidList,
                            borderColor: "rgba(255, 201, 14, 1)",
                            backgroundColor: "rgba(255, 201, 14, 0.5)",
                            fill: true,
                            lineTension: 0
                        }]
                    },
                    options: {
                        responsive: true,
                        title: {
                            display: true,
                            text: '포화 지방산 섭취 통계'
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
                                scaleLabel: {
                                    display: true,
                                    labelString: '섭취일'
                                }
                            }],
                            yAxes: [
                                {
                                    display: true,
                                    ticks: {
                                        suggestedMin: 0,
                                    },
                                    scaleLabel: {
                                        display: true,
                                        labelString: '포화 지방산 섭취량'
                                    }
                                }]
                        }
                    }
                });

                let transfatCanvas = document.createElement("canvas")
                document.getElementById("transfatChart").innerHTML = ''
                document.getElementById("transfatChart").appendChild(transfatCanvas)
                new Chart(transfatCanvas, {
                    type: 'line',
                    data: {
                        labels:this.eatdateList,
                        datasets: [{
                            label: '트렌스지방',
                            data: this.transfatList,
                            borderColor: "rgba(255, 201, 14, 1)",
                            backgroundColor: "rgba(255, 201, 14, 0.5)",
                            fill: true,
                            lineTension: 0
                        }]
                    },
                    options: {
                        responsive: true,
                        title: {
                            display: true,
                            text: '트렌스지방 섭취 통계'
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
                                scaleLabel: {
                                    display: true,
                                    labelString: '섭취일'
                                }
                            }],
                            yAxes: [{
                                display: true,
                                ticks: {
                                    suggestedMin: 0,
                                },
                                scaleLabel: {
                                    display: true,
                                    labelString: '트렌스지방 섭취량'
                                }
                            }]
                        }
                    }
                });
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