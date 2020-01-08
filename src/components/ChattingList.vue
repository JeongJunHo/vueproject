<template>
    <div >
        <h1>채팅방</h1>
        <legend>채팅내역</legend>
        <div id='chat_div' style="width:800px;
        overflow:scroll;
        position = 'absolute';
		height:500px;
		margin:0 auto;
		border-left:1px solid #bebebe;
		border-right:1px solid #bebebe;
		background:#f5f5f5;" >
            <ul>
                <li v-for="item in list" :key="item.num">
                    <span style="font-size: large; color: #4e4eca;">{{item.id}}님 </span> : <span style="font-size: x-large">{{item.content}}</span> 시간:{{item.regdate}}
                    <el-button v-if="id==item.id" @click="deletemsg(item.num)" size="small" type="primary" icon="el-icon-delete"></el-button>
                </li>
            </ul>
        </div>
        <div style="margin:0 auto; width:800px;">
            <input style="margin:0 auto; width:720px;"  v-on:keyup.enter="insert" v-model="content" type="text"><el-button size="mini"  @click="insert()" icon="el-icon-edit"></el-button>
        </div>
    </div>

</template>

<script>
import http from "../http-common";
export default {
  name: 'MessageList',
    data() {
        return {
            errored: false,
            loading: true,
            flag:true,
            content: '',
            id:'',
            play:'',
            list: []
        }
    },
    methods:{
        update_init(){
            var obj=document.getElementById('chat_div');
            if(obj.scrollTop*1.2>=obj.scrollHeight){
                this.flag=true;
            }else{
                this.flag=false;
            }
            this.id=JSON.parse(sessionStorage.getItem("userInfo")).id;
            http
            .get("/chatting/selectList")
            .then(response => {
                this.list = response.data.resvalue
                if(this.flag){
                    setTimeout(this.scrollfunc,100)                
                }
            })
            .catch(() => {
                this.errored = true;
            })
            .finally(() => (this.loading = false));
        },
        insert(){
            if(this.content.length>0){
                http.post('/chatting/insert', {
                    content: this.content,
                    id: this.$store.state.userInfo.id
                }).then(() => {
                    this.update_init();
                    this.content='';
                    setTimeout(this.scrollfunc,100)                
                })

            }

        },
        deletemsg(num){
            http
            .delete("/chatting/delete/" + num)
            .then(() => {
                this.update_init();
            })
            .catch(() => {
            this.errored = true;
            })
            .finally(() => (this.loading = false));

        },
        scrollfunc(){
            var obj=document.getElementById('chat_div');
            obj.scrollTop=obj.scrollHeight;
        },
        interval(){
            this.play = setInterval(this.update_init,1000)
        }
    },
    mounted(){
        this.update_init();
        this.interval();
        setTimeout(this.scrollfunc,100)                
    },
    beforeDestroy(){
        clearInterval(this.play);
    }
};
</script>

<style>
.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active, .list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateX(30px);
}
</style>