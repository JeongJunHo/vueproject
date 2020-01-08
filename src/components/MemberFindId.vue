
<template>
	<div class="container">		
		<div class="ex">
			<h2>아이디 찾기</h2>
			<form id="rform" class="form-horizontal" role="form" @submit.prevent="MemberFindId">
				<div class="form-group" id="divName">
					<label for="inputName" class="col-lg-2 control-label">이름</label>
					<div class="col-lg-10">
						<input v-model="name" type="text" class="form-control onlyHangul" id="name"
							data-rule-required="true" placeholder="이름" maxlength="15" name="name" required="required">
					</div>
				</div>
				
				<div class="form-group" id="divPhoneNumber">
					<label for="inputPhoneNumber" class="col-lg-2 control-label">이메일</label>
					<div class="col-lg-10">
						<input v-model="addr" type="tel" class="form-control onlyNumber" id="phoneNumber"
							data-rule-required="true" placeholder="abc@abc.com"
							name="tel" required="required">
					</div>
				</div>
				
				<div class="form-group">
					<div class="col-lg-offset-2 col-lg-10">
						<button type="submit" id="findid" class="btn btn-warning">아이디 찾기</button>
					</div>
				</div>
			</form>
		</div>
	</div>    
</template>


<script>
import http from "../http-common";
export default {
    name: "memberfind_id",
    data() {
        return {
            errored: false,
            loading: true,
            name: '',
            addr:''
        }
    },
    methods:{
        MemberFindId(){
            http
            .get("/member/find_id/" + this.name+"/"+this.addr)
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