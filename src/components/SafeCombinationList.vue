<template>
	<div>
		<h1 style="text-align: center; font-size: 3em;">
            <p>맞춤 섭취 식품 조회</p>
            <small>(오차범위 95%)</small>
        </h1>
		<hr style="margin-bottom: 40px;">

		<div class="row">
			<div class="col-xs-12" style="text-align: right; margin-bottom: 15px;">
				<form action="" class="form-inline" method="get" @submit.prevent="safeCombinationSearch()">
					<div class="form-group">
						<input v-model="searchCalory" type="number" name="searchCalory" class="form-control" placeholder="칼로리를 입력하세요." >
					</div>
					<button type="submit" class="btn btn-info">검색</button>
				</form>
			</div>
		</div>
		<el-card class="box-card list-group-wrapper" v-loading="loading">
            <template v-if="llist.length > 0">
            <h1 class="text-center">
                총 {{llist.length}} 개의 추천 조합을 찾았습니다.
            </h1>
            <hr>
            </template>
            
            <div id="infinite-list">
                <div class="list-group-item row text-center" v-for="(list, index) in items" :key="index">
                    <div class="col-xs-12 mb-15">
                        <h3>추천 No.{{index+1}}</h3>
                    </div>
                    <div class="col-xs-12">
                        <el-tag style="margin-right: 5px;" v-for="item in list" :key="item.code">
                            {{item.name}}
                        </el-tag>
                    </div>
                </div>
                <p v-if="searchCalory==0" align="center" style="color: red;">칼로리를 1 이상 입력해주세요.</p>
                <p v-else-if="llist.length==0" align="center" style="color: red;">원하는 칼로리의 조합이 없습니다.</p>
            </div>
		</el-card>
	</div>
</template>



<script>

import http from "../http-common";
export default {
    name: "safecombinationList",
    data() {
        return {
            errored: false,
            loading: false,
            id: '',
            index:'',
            searchCalory:'',
            llist: [],
            nextItem: 0,
            items: []
        }
    },
    methods:{
        safeCombinationSearch(){
            this.loading = true
            this.id=JSON.parse(sessionStorage.getItem("userInfo")).id;
            http
            .get("/food/safecombinationList/"+this.searchCalory +"/" +this.id)
            .then(response => {
                this.llist = response.data.resvalue
                window.console.log(this.llist[0][0].calory)
                // for (const iterator of llist) {
                    
                // }
                

                this.items = []
                this.nextItem = 0
                for (let index = this.nextItem; index < 10; index++) {
                    const element = this.llist[index];
                    if(element == null){
                        break;
                    }
                    this.nextItem++;
                    this.items.push(element)
                }
            })
            .catch(() => {
                this.errored = true;
            })
            .finally(() => (this.loading = false));
        },
        loadMore () {
            if(!this.loading && this.items.length < this.llist.length){
                this.loading = true;
                setTimeout(() => {
                    const tmp = this.nextItem;
                    for (var i = tmp; i < tmp+20; i++) {
                        if(this.llist[i] != null){
                            this.nextItem++
                            this.items.push(this.llist[i]);
                        }else{
                            break;
                        }
                    }
                    this.loading = false;
                }, 300);
            }
        }
    },
    mounted () {
        const listElm = document.querySelector('#infinite-list');
        listElm.addEventListener('scroll', () => {
            if(listElm.scrollTop + listElm.clientHeight >= listElm.scrollHeight) {
                this.loadMore();
            }
        });
    }
}
</script>
<style scoped>
    .mb-15{
        margin-bottom: 15px;
    }

    .list-group-wrapper {
        position: relative;
    }
    #infinite-list {
    overflow-y: auto;
    overflow-x: hidden;
    height: 40vh;
    }
    .list-group-item {
        border-left: none;
        border-right: none;
        border-top: none;
        border-bottom: 2px solid #dce4ec;
    }
</style>