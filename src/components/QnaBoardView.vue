<template>
    <div>
		<h1 style="text-align: center; font-size: 3em;">
            Q&A 게시판
        </h1>
		<hr style="margin-bottom: 40px;">

		<el-card class="box-card">
            <div slot="header" class="clearfix">
                <span><strong>{{board.title}}</strong></span>
            </div>
            <p>작성자 : {{board.id }}</p>
            <p>작성일 : {{board.regdate }}</p>
            <hr>
            <p>내용 : {{board.content }}</p>
            <hr>
			<div class="text-right">
                <template v-if="$store.state.isLogin && $store.state.userInfo.id === board.id">
                    <button @click="updatefunc(board.qnum)" class="btn btn-info btn-flat">수정</button>
                    <button @click="deletefunc(board.qnum)" class="btn btn-danger btn-flat">삭제</button>
                </template>
                <router-link to="/qnaboardlist" class="btn btn-primary btn-flat">목록</router-link>
			</div>
		</el-card>

        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span><strong>답변</strong></span>
            </div>
            <form @submit.prevent="insertComment">
                <input id="id" name="id" v-model="id" type="hidden">
                <textarea name="content" v-model="comment_content" class="form-control" rows="5" placeholder="내용을 입력해주세요."></textarea>
                <hr>
                <button type="submit" class="btn btn-primary btn-flat btn-block">등록</button>
                <hr>
            </form>

            <template v-if="isupdate">
                <form @submit.prevent="updateComment">
                    <input id="id" name="id" v-model="update_comment.id" type="hidden">
                    <textarea name="content" v-model="update_comment.content" class="form-control" rows="5" placeholder="내용을 입력해주세요."></textarea>
                    <hr>
                    <button type="submit" class="btn btn-success btn-flat btn-block">수정</button>
                    <hr>
                </form>
            </template>

            <table class="table text-center table-bordered table-hover">
                <colgroup>
                    <col width="20%">
                    <col width="60%">
                    <col width="20%">
                </colgroup>
                <thead>
                    <tr>
                        <th>아이디</th>
                        <th>내용</th>
                        <th>작성일자</th>
                        <th>act</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in comments" :key="item.anum">
                        <td v-html="item.id"></td>
                        <td>
                            <pre v-html="item.content"></pre>
                        </td>
                        <td v-html="item.regdate"></td>
                        <td>
                            <template v-if="$store.state.isLogin && $store.state.userInfo.id === item.id">
                                <button class="btn btn-info btn-xs" @click="updateToggle(item.anum, item.content)">수정</button>
                                <button class="btn btn-xs btn-danger" @click="deleteComment(item.anum)">삭제</button>
                            </template>
                        </td>
                    </tr>
                    <tr v-if="comments.length == 0">
                        <td colspan="3" align="center">답변이 없습니다.</td>
                    </tr>
                </tbody>
            </table>
        </el-card>
    </div>
</template>

<script>
import http from "../http-common";
export default {
    name: "view-qnaboard",
    props: ["qnum"],
    data() {
        return {
            errored: false,
            loading: true,
            isupdate: false,
            board: {},
            comments: [],
            id: this.$store.state.userInfo.id,
            comment_content:'',
            update_comment:{
                anum: '',
                content: ''
            }
        }
    },
    methods:{
        view_init(){
            http
            .get("/qnaboard/view/" + this.qnum)
            .then(response => {
                window.console.log(response)
                this.board = response.data.resvalue
            })
            .catch(() => {
                this.errored = true;
            })
            .finally(() => (this.loading = false));
        },
        updatefunc(qnum){
            this.$router.push("/qnaboardupdate/" + qnum);
        },
        deletefunc(qnum) {
            http
            .delete("/qnaboard/delete/" + qnum)
            .then(response => {
                alert(response.data.resmsg)
                this.$router.push("/qnaboardlist");
            })
            .catch(() => {
            this.errored = true;
            })
            .finally(() => (this.loading = false));
        },
        comment_init(){
            http
            .get("/qnacomment/view/" + this.qnum)
            .then(response => {
                window.console.log(response)
                this.comments = response.data.resvalue
            })
            .catch(() => {
                this.errored = true;
            })
            .finally(() => (this.loading = false));
        },
        insertComment(){
            if(this.comment_content==''){ alert('답변내용을 입력하세요.'); return ;}
            
            http.post('/qnacomment/insert', {
                qnum: this.qnum,
                content: this.comment_content,
                id: this.id
            }).then(response => {
                alert(response.data.resmsg);
                window.console.log(response.resmsg);
                this.comment_init();
                this.comment_content = '';
            })
            .catch(() => {
                this.errored = true;
            })
            .finally(() => (this.loading = false));
        },
        updateToggle(anum, content){
            if(this.update_comment.anum == anum){
                this.isupdate = false;
                this.update_comment.anum = '';
                this.update_comment.content = '';
            }else{
                this.isupdate = true;
                this.update_comment.anum = anum;
                this.update_comment.content = content;
            }
            window.console.log(this.isupdate);
        },
        updateComment(){
            http.put('/qnacomment/update',{
                anum: this.update_comment.anum,
                content: this.update_comment.content,
                id: this.id
            }).then(response => {
                alert(response.data.resmsg);
                this.comment_init();
                this.isupdate = false;
                this.update_comment.anum = '';
                this.update_comment.content = '';
            })
            .catch(() => {
                this.errored = true;
            })
            .finally(() => (this.loading = false));
        },
        deleteComment(anum){
            http.delete('/qnacomment/delete/' + anum)
            .then(response => {
                alert(response.data.resmsg);
                window.console.log(response.resmsg);
                this.comment_init();
            })
            .catch(() => {
                this.errored = true;
            })
            .finally(() => (this.loading = false));
        }
    },
    mounted(){
        this.view_init();
        this.comment_init();
    }
}
</script>

<style scoped>
    th{
        text-align: center;
    }
    pre{
        text-align: left;
    }
</style>