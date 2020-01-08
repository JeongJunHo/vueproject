<template>
    <div>

        <h1 style="text-align: center; font-size: 3em; margin-bottom:">공지
            게시판</h1>
        <hr style="margin-bottom: 40px;">

        <el-card class="box-card">
                <form action="" method="put">
                    <input name="num" type="hidden" value="${board.num }">
                    <div class="form-group">
                        <label for="title">제목</label>
                        <input v-model="board.title" id="title" name="title" type="text" class="form-control"	placeholder="">
                    </div>
                    <div class="form-group">
                        <label for="document">내용</label>
                        <textarea v-model="board.document" id="document" name="document" class="form-control" rows="15" placeholder=""></textarea>
                    </div>

                    <div class="row">
                        <div class="col-sm-12 text-right">
                            <el-button-group>
                                <el-button @click="$router.push('/boardlist')" type="primary" size="small" icon="el-icon-arrow-left">목록</el-button>
                                <el-button @click="updateBoard()" size="small" type="primary button" icon="el-icon-edit"></el-button>
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
    name: "boardupdate",
    props: ["num"],
    data() {
        return {
            errored: false,
            loading: true,
            board:{}
        }
    },
    methods:{
        update_init(){
            http
            .get("/board/boardview/" + this.num)
            .then(response => {
                this.board = response.data.resvalue
            })
            .catch(() => {
                this.errored = true;
            })
            .finally(() => (this.loading = false));
        },
        updateBoard(){
            if(this.board.title==''){ alert('제목를 입력하세요.'); return ;}
            if(this.board.document==''){ alert('내용을 입력하세요.'); return ;}
            http.put('/board/boardupdate', {
                num: this.num,
                title: this.board.title,
                document: this.board.document,
                hit:this.board.hit-1,
                id: this.$store.state.userInfo.id
            }).then(response => {
                alert(response.data.resmsg)
                this.$router.push("/boardlist");
            })
        }
    },
    mounted(){
        this.update_init();
    }
}
</script>

<style scoped>

</style>