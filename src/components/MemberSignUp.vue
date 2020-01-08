<template>
	<div class="container">

		<div class="ex">
			<h2>회원가입</h2>
			<form action="" method="post" id="rform" @submit.prevent="insertMember"
				class="form-horizontal" role="form">
				<div class="form-group" id="divId">
					<label for="inputId" class="col-lg-2 control-label">아이디</label>
					<div class="col-lg-10">
						<input v-model="id" type="text" class="form-control onlyAlphabetAndNumber"
							name="pid" id="pid" data-rule-required="true" placeholder=""
							maxlength="30" required="required">
					</div>
				</div>

				<div class="form-group" id="divPassword">
					<label for="inputPassword" class="col-lg-2 control-label">패스워드</label>
					<div class="col-lg-10">
						<input v-model="pw" type="password" class="form-control" id="ppw" name="ppw"
							data-rule-required="true" placeholder="영문 숫자포함  6자리 이상"
							maxlength="30" required="required">
					</div>
				</div>
				<div class="form-group" id="divName">
					<label for="inputName" class="col-lg-2 control-label">이름</label>
					<div class="col-lg-10">
						<input v-model="name" type="text" class="form-control onlyHangul" id="pname"
							name="pname" data-rule-required="true" placeholder="이름"
							maxlength="15" required="required">
					</div>
				</div>
				<div class="form-group" id="divAddress">
					<label for="inputAddress" class="col-lg-2 control-label">주소</label>
					<div class="col-lg-10">
						<input v-model="addr" type="text" class="form-control" id="paddr" name="paddr"
							data-rule-required="true" placeholder="주소" maxlength="50" required="required">
					</div>
				</div>
				<div class="form-group" id="divPhoneNumber">
					<label for="inputPhoneNumber" class="col-lg-2 control-label">전화번호</label>
					<div class="col-lg-10">
						<input v-model="tel" type="tel" class="form-control onlyNumber" id="ptel"
							name="ptel" data-rule-required="true" placeholder="010xxxxxxxx"
							maxlength="11" required="required">
					</div>
				</div>
				<div class="form-group" id="divAllergy">
					<label for="inputAllergy" class="col-lg-2 control-label">알레르기</label>
					<div class="col-lg-10">
						<fieldset>
							<legend>check</legend>
							<span v-for="(item, index) in list" :key="item.num">
                                <br v-if="index%4==0">
								<label class="checkbox-inline"> <input v-model="allergy" type="checkbox" name="pallergy" :value="item.name" >{{item.name }}</label>
							</span>
						</fieldset>

					</div>
				</div>
				<div class="form-group">
					<div class="col-lg-offset-2 col-lg-10">
						<button type="submit" class="btn btn-primary">등록</button>
						<!-- <input type="button" value="등록" onclick="check()"> -->
					</div>
				</div>
			</form>
		</div>
	</div>    
</template>

<script>
import http from "../http-common";
export default {
    name: "insert-member",
    data() {
        return {
            errored: false,
            loading: true,
            id:'',
            pw:'',
            name:'',
            addr:'',
            tel:'',
            allergy:[],
            index:'',
            list:[]
        }
    },
    methods:{
        allergy_init(){
            http
            .get("/allergy/list")
            .then(response => {
                this.list = response.data.resvalue
            })
            .catch(() => {
                this.errored = true;
            })
            .finally(() => (this.loading = false));
        },
        insertMember(){
            alert(this.allergy+this.id+this.pw+this.name+this.addr+this.tel);
            http.post('/member/insert', {
                id: this.id,
                pw: this.pw,
                name: this.name,
                addr: this.addr,
                tel: this.tel,
                allergy: String(this.allergy)
            }).then(response => {
                window.console.log(response);
                alert(response);
                this.$router.push("/");
            })
        }
    },
    mounted(){
        this.allergy_init();
    }
}
</script>

<style scoped>

</style>