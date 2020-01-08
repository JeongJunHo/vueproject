<template>
    <div>
		<h1 style="text-align: center; font-size: 3em;">
            Q&A 게시판
        </h1>
		<hr style="margin-bottom: 40px;">

        <div class="row">
			<div class="col-xs-12"
				style="text-align: right; margin-bottom: 15px;">
	
				<form action="" class="form-inline" method="get" @submit.prevent="readSearchList">
					<div class="form-group">
						<select name="searchType" class="form-control" v-model="searchType">
                            <option value="title">제목</option>
                            <option value="content">내용</option>
							<option value="id">아이디</option>
						</select>
					</div>
					<div class="form-group">
						<input type="text" name="searchText" v-model="searchText" class="form-control" placeholder="검색어를 입력하세요.">
					</div>
					<button type="submit" class="btn btn-info">검색</button>
				</form>
			</div>
		</div>

		<el-card class="box-card">
            <table class="table text-center table-bordered table-hover">
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>제목</th>
                        <th>아이디</th>
                        <th>작성일자</th>
                        <th>조회수</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in list" :key="item.qnum">
                        <td v-html="item.qnum"></td>
                        <td v-html="item.title" @click="view(item.qnum)" style="color: #4e4eca; cursor:pointer;"></td>
                        <td v-html="item.id"></td>
                        <td v-html="item.regdate"></td>
                        <td v-html="item.hit"></td>
                    </tr>
                    <tr v-if="list.length == 0">
                        <td colspan="5" align="center">질문이 없습니다.</td>
                    </tr>
                </tbody>
            </table>
            <div class="row">
                <div class="col-sm-12 text-right">
                    <template v-if="this.$store.state.isLogin">
                        <router-link to="/qnaboardinsert" class="btn btn-primary">글쓰기 </router-link>
                    </template>
                </div>
            </div>
		</el-card>
    </div>
</template>

<script>
import http from "../http-common";
export default {
    name: "list-qnaboard",
    data() {
        return {
            errored: false,
            loading: true,
            list: [],
            searchText: '',
            searchType: 'title'
        }
    },
    methods:{
        readQnaList(){
            http
            .get("/qnaboard/list")
            .then(response => {
                this.list = response.data.resvalue
            })
            .catch(() => {
                this.errored = true;
            })
            .finally(() => (this.loading = false));
        },
        view(qnum){
            this.$router.push("/qnaboardview/" + qnum);
        },
        readSearchList(){
            if(this.searchText.trim()==''){
                 this.readQnaList();
            }else{
                http
                .get("/qnaboard/list/" + this.searchType + "/" + this.searchText)
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
        this.readQnaList();
    }
}
</script>

<style scoped>

</style>