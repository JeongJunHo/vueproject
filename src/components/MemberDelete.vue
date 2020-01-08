<template>
	<div class="container">		
		<div class="ex">
			<h2>회원정보 삭제</h2>
			<form class="form-horizontal" role="form" method="post" action="" @submit.prevent="deleteMember">
	
				<div class="form-group">
					<label for="pid">아이디</label> <input v-model="id" type="text" class="form-control"
						id="pid" name ="pid" placeholder="삭제하실 아이디를 입력해주세요">
				</div>
				<div class="form-group">
					<label for="ppw">패스워드</label> <input v-model="pw" type="password"
						class="form-control" id="ppw" name="ppw" placeholder="비밀번호를 입력해주세요">
				</div>
	
				<div class="form-group">
					<div class="col-lg-offset-2 col-lg-10">
						<button type="submit" class="btn btn-danger">삭제</button>
					</div>
				</div>
			</form>
		</div>
	</div>
    
</template>
<script>
import http from "../http-common";
export default {
    name: "memberdelete",
    data() {
        return {
            errored: false,
            loading: true,
            id: '',
            pw:''
        }
    },
    methods:{
        deleteMember(){
            http
            .delete("/member/delete/" + this.id+"/"+this.pw)
            .then(response => {
                alert(response.data.resvalue);
                this.$router.push("/");
            })
            .catch(() => {
            this.errored = true;
            })
            .finally(() => (this.loading = false));
        }
    }
}
</script>

<style scoped>

</style>