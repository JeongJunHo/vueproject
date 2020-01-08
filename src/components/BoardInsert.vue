<template>
	<div>
		<h1 style="text-align: center; font-size: 3em;">공지
			게시판</h1>
		<hr style="margin-bottom: 40px;">

		<el-card class="box-card">
            <form action="" method="post">
                <div class="form-group">
                    <label for="title">제목</label>
                    <input v-model="title" id="title" name ="title" type="text" class="form-control" placeholder="제목을 입력해주세요.">
                </div>
                <div class="form-group">
                    <label for="document">내용</label>
                    <textarea v-model="document" id="document" name="document" class="form-control" rows="15" placeholder="내용을 입력해주세요."></textarea>
                </div>
                
                <div class="row">
                    <div class="col-sm-12 text-right">
                        <el-button-group>
                            <el-button @click="$router.push('/boardlist')" type="primary" size="small" icon="el-icon-arrow-left">목록</el-button>
                            <el-button @click="insertBoard()" size="small" type="primary button" icon="el-icon-edit"></el-button>
                        </el-button-group>
                    </div>
                </div>
            </form>
		</el-card>
	</div>
</template>

<script>
import http from "../http-common";
export default {
    name: "boardinsert",
    data() {
        return {
            errored: false,
            loading: true,
            title:'',
            document:''
        }
    },
    methods:{
        insertBoard(){
            if(this.title==''){ alert('제목를 입력하세요.'); return ;}
            if(this.content==''){ alert('질문내용을 입력하세요.'); return ;}
            http.post('/board/boardreg', {
                title: this.title,
                document: this.document,
                id: this.$store.state.userInfo.id
            }).then(response => {
                alert(response.data.resmsg);
                this.$router.push("/boardlist");
            })
        }
    }
}
</script>

<style scoped>

</style>