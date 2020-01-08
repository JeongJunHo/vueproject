<template>
	<div>
		<h1 style="text-align: center; font-size: 3em;">쪽지
			보내기</h1>
		<hr style="margin-bottom: 40px;">

		<el-card class="box-card">
            <form action="" method="post">
                <div class="form-group">
                    <label for="title">쪽지보내기</label>
					<div class="form-group">
						<select v-model="to_id" name="to_id" class="form-control">
                            <option v-for="item in memList" :key="item.id">
                                {{item.id}}
                            </option>
						</select>
					</div>
                </div>
                <div class="form-group">
                    <label for="title">식품 사진</label>
					<div class="form-group">
						<select v-model="food_img" name="food_name" class="form-control">
                            <option v-for="item in foodList" :key="item.code">
                                {{item.img}}
                            </option>
						</select>
					</div>
                </div>
                <div class="form-group">
                    <label for="title">제목</label>
                    <input v-model="title" id="title" name ="title" type="text" class="form-control" placeholder="제목을 입력해주세요.">
                </div>
                <div class="form-group">
                    <label for="content">내용</label>
                    <textarea v-model="content" id="content" name="content" class="form-control" rows="15" placeholder="내용을 입력해주세요."></textarea>
                </div>
                
                <div class="row">
                    <div class="col-sm-12 text-right">
                        <el-button-group>
                            <el-button @click="$router.push('/')" type="primary" size="small" icon="el-icon-arrow-left">처음화면</el-button>
                            <el-button @click="insert()" size="small" type="primary button" icon="el-icon-edit"></el-button>
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
    name: "noticeinsert",
    data() {
        return {
            errored: false,
            loading: true,
            to_id:'',
            title:'',
            memList:[],
            foodList:[],
            food_img:'img/ssafy_logo.png',
            content:''
        }
    },
    methods:{
        insert(){
            window.console.log(this.food_img);
            if(this.title==''){ alert('제목를 입력하세요.'); return ;}
            if(this.content==''){ alert('질문내용을 입력하세요.'); return ;}
            http.post('/notice/insert', {
                title: this.title,
                content: this.content,
                id: this.to_id,
                from_id: JSON.parse(sessionStorage.getItem("userInfo")).id,
                img: this.food_img
            }).then(response => {
                alert(response.data.resmsg);
                this.$router.push("/");
            });
        },
        memlist_init(){
            http
            .get("/member/list")
            .then(response => {
                this.memList = response.data.resvalue
                this.to_id=this.memList[0].id;
            })
            .catch(() => {
                this.errored = true;
            })
            .finally(() => (this.loading = false));
        },
        food_init(){
            http
            .get("/food/list")
            .then(response => {
                this.foodList = response.data.resvalue
            })
            .catch(() => {
                this.errored = true;
            })
            .finally(() => (this.loading = false));
        }
    },
    mounted(){
        this.memlist_init();
        this.food_init();
    }
}
</script>

<style scoped>

</style>