<template>
    <div>
        <h1 style="text-align: center; font-size: 3em;">
            Q&A 게시판
        </h1>
        <hr style="margin-bottom: 40px;">

        <el-card class="box-card">
            <form action="" method="put" @submit.prevent="updateQna">
                <input id="id" name="id" v-model="board.id" type="hidden">
                <div class="form-group">
                    <label for="title">제목</label>
                    <input id="title" name ="title" v-model="board.title" type="text" class="form-control" placeholder="제목을 입력해주세요.">
                </div>
                <div class="form-group">
                    <label for="content">내용</label>
                    <textarea id="content" name="content" v-model="board.content" class="form-control" rows="15" placeholder="내용을 입력해주세요."></textarea>
                </div>
                
                <div class="row">
                    <div class="col-sm-12 text-right">
                        <router-link to="/qnaboardlist" class="btn btn-primary">목록</router-link>
                        <button type="submit" class="btn btn-primary">수정</button>
                    </div>
                </div>
            </form>
        </el-card>
    </div>
</template>

<script>
import http from "../http-common";
export default {
    name: "update-qnaboard",
    props: ["qnum"],
    data() {
        return {
            errored: false,
            loading: true,
            board:{
                title:'',
                content:'',
                id:''
            }
        }
    },
    methods:{
        updateQna(){
            if(this.board.title==''){ alert('제목를 입력하세요.'); return ;}
            if(this.board.content==''){ alert('질문내용을 입력하세요.'); return ;}
            
            http.put('/qnaboard/update', {
                qnum: this.qnum,
                title: this.board.title,
                content: this.board.content,
                id: this.$store.state.userInfo.id
            }).then(response => {
                alert(response.data.resmsg)
                this.$router.push("/qnaboardlist");
            })
        },
        update_init(){
            http
            .get("/qnaboard/view/" + this.qnum)
            .then(response => {
                this.board = response.data.resvalue
            })
            .catch(() => {
                this.errored = true;
            })
            .finally(() => (this.loading = false));
        }
    },
    mounted(){
        this.update_init();
    }
}
</script>

<style scoped>

</style>