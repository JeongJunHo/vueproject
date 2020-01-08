<template>
    <div>
		<h1 style="text-align: center; font-size: 3em;">
            알러지 보유자 통계
        </h1>
        <hr style="margin-bottom: 40px;">

		<el-card class="box-card">
			<canvas id="alleryChart"></canvas>
		</el-card>
    </div>
</template>

<script>
    import http from "../http-common";
	import Chart from 'chart.js';
	
    export default {
        name: "alluserallergychart",
        data() {
            return {
				errored: false, 
				loading: true, 
				map: [], 
				keyset: [], 
				valueset: []
			}
        },
        methods: {
            map_init() {
                http
                    .get("/member/allUserAllergy")
                    .then(response => {
                        for (const i of Object.keys(response.data.resvalue)) {
                            this.map.push({name: i, cnt: response.data.resvalue[i]})
                        }
						this.keyset = Object.keys(response.data.resvalue)
						this.valueset = Object.values(response.data.resvalue)

						const ctx = document.getElementById('alleryChart');
						new Chart(ctx, {
							type: 'horizontalBar',
							data: {
								labels: this.keyset,
								datasets: [
									{
										label: '알러지 보유 수',
										data: this.valueset,
										borderColor: "rgba(255, 201, 14, 1)",
										backgroundColor: "rgba(255, 201, 14, 0.5)",
										fill: false
									}
								]
							},
							options: {
								responsive: true,
								title: {
									display: true,
									text: '알러지 보유자 통계'
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
												labelString: '알러지 보유자 수'
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
												labelString: '알러지 종류'
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
        mounted() {
            this.map_init();
        }
    }
</script>

<style scoped="scoped"></style>