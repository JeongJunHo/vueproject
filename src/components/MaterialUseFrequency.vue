
<template>
	<div>
        <h1 style="text-align: center; font-size: 3em;">
            성분 분석
        </h1>
        <hr style="margin-bottom: 40px;">

		<el-card class="box-card">
			<canvas id="materialChart" height="1200"></canvas>
		</el-card>
	</div>
    
</template>
<script>
import http from "../http-common"
import Chart from 'chart.js'
export default {
    name: "materialusefrequency",
    data() {
        return {
            errored: false,
            loading: true,
            map: [],
            keyset: [], 
			valueset: []
        }
    },
    methods:{
        map_init(){
            http
            .get("/food/materialusechart")
            .then(response => {
                // for (const i of Object.keys(response.data.resvalue)) {
                //     if(response.data.resvalue[i] > 1){
                //         this.map.push({name: i, cnt: response.data.resvalue[i]})
                //     }
                // }
                // for (const i of this.map) {
                //     this.keyset.push(i.name)
                //     this.valueset.push(i.cnt)
                // }
                for (const i of Object.keys(response.data.resvalue)) {
                    this.map.push({name: i, cnt: response.data.resvalue[i]})
                }
                this.keyset = Object.keys(response.data.resvalue)
                this.valueset = Object.values(response.data.resvalue)

                const ctx = document.getElementById('materialChart');
                new Chart(ctx, {
                    type: 'horizontalBar',
                    data: {
                        labels: this.keyset,
                        datasets: [
                            {
                                label: '원재료 사용 횟수',
                                data: this.valueset,
                                borderColor: "rgba(14, 201, 255, 1)",
                                backgroundColor: "rgba(14, 201, 255, 0.5)",
                                fill: false
                            }
                        ]
                    },
                    options: {
                        responsive: true,
                        title: {
                            display: true,
                            text: '성분 분석 차트'
                        },
                        tooltips: {
                            mode: 'index',
                            intersect: false
                        },
                        hover: {
                            mode: 'nearest',
                            intersect: true
                        },
                        scales: {
                            xAxes: [
                                {
                                    display: true,
                                    ticks: {
                                        autoSkip: false,
                                        stepSize: 1,
                                        suggestedMin: 0
                                    },
                                    scaleLabel: {
                                        display: true,
                                        labelString: '원재료 사용 횟수'
                                    }
                                }
                            ],
                            yAxes: [
                                {
                                    display: true,
                                    ticks: {
                                        autoSkip: false
                                    },
                                    scaleLabel: {
                                        display: true,
                                        labelString: '원재료명'
                                    }
                                }
                            ]
                        }
                    }
                });
            })
            .catch(() => {
                this.errored = true;
            })
            . finally(() => (this.loading = false));
        }
    }, 

    mounted(){
        this.map_init();
    }
}
</script>

<style scoped>

</style>