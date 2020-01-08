<template>
    <div>
        <h1 style="text-align: center; font-size: 3em;">
            Q&A 게시판
        </h1>
        <hr style="margin-bottom: 40px;">

        <el-card class="box-card">
            <form action="" method="post" @submit.prevent="insertQna">
                <div class="form-group">
                    <label for="title">제목</label>
                    <input id="title" name ="title" v-model="title" type="text" class="form-control" placeholder="제목을 입력해주세요.">
                </div>
                <div class="form-group">
                    <label for="content">내용</label>
                    <textarea id="content" name="content" v-model="content" class="form-control" rows="15" placeholder="내용을 입력해주세요."></textarea>
                </div>
                
                <div class="row">
                    <div class="col-sm-12 text-right">
                        <router-link to="/qnaboardlist" class="btn btn-primary">목록</router-link>
                        <button type="submit" class="btn btn-primary">글쓰기</button>
                    </div>
                </div>
            </form>
        </el-card>
    </div>
</template>

<script>
import http from "../http-common";
export default {
    name: "insert-qnaboard",
    data() {
        return {
            errored: false,
            loading: true,
            title:'',
            content:''
        }
    },
    methods:{
        insertQna(){
            if(this.title==''){ alert('제목를 입력하세요.'); return ;}
            if(this.content==''){ alert('질문내용을 입력하세요.'); return ;}
            
            http.post('/qnaboard/insert', {
                title: this.title,
                content: this.content,
                id: this.$store.state.userInfo.id
            }).then(response => {
                alert(response.resmsg);
                window.console.log(response.resmsg);
                this.$router.push("/qnaboardlist");
            })
        }
    }
}
</script>

<style scoped>

</style>