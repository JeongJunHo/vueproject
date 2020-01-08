<template>
    <div id="app">
        <div class="container">
            <header>
                <nav class="navbar navbar-inverse navbar-fixed-top">
                    <div class="container-fluid">
                        <!-- Brand and toggle get grouped for better mobile display -->
                        <div class="navbar-header">
                            <button type="button" class="navbar-toggle collapsed"
                                data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                                <span class="sr-only">Toggle navigation</span> <span
                                    class="icon-bar"></span> <span class="icon-bar"></span> <span
                                    class="icon-bar"></span>
                            </button>
                            <router-link class="navbar-brand" to="/" style="padding: 5px;"> <img
                                alt="Brand" src="./assets/ssafy_logo.png" style="max-height: 40px;">
                            </router-link>
                        </div>

                        <!-- Collect the nav links, forms, and other content for toggling -->
                        <div class="collapse navbar-collapse"
                            id="bs-example-navbar-collapse-1">
                            <ul class="nav navbar-nav">
                                <li><router-link to="/boardlist">공지 사항 </router-link></li>
                                <template v-if="isLogin">
                                    <li><router-link to="/qnaboardlist">Q&N 게시판 </router-link></li>
                                </template>
                                <li><router-link to="/foodinfolist">상품 정보</router-link></li>
                                <li><router-link to="/bestfoodinfolist">베스트 섭취 정보</router-link></li>
                                <li><router-link to="/whatisthis">WhatIsThis?</router-link></li>
                                <template v-if="isLogin">
                                    <li><router-link to="/allergycautionlist">알러지 주의 리스트 </router-link></li>
                                    <li><router-link to="/safecombinationList">맞춤 섭취 조회 </router-link></li>
                                    <li><router-link to="/eatfoodinfolist">섭취 식품 조회 </router-link></li>
                                    <li><router-link to="/dibfoodinfolist">찜목록 조회 </router-link></li>
                                    <li><router-link to="/chattinglist">채팅 </router-link></li>
                                </template>
                                <li class="dropdown">
                                <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">통계 <span class="caret"></span></a>
                                <ul class="dropdown-menu">
                                    <li><router-link to="/materialusechart">성분첨가빈도</router-link></li>
                                    <li><router-link to="/alluserallergychart">전체사용자 알러지정보</router-link></li>
                                    <template v-if="isLogin">
                                        <li role="separator" class="divider"></li>
                                        <li class="dropdown-header">회원 통계</li>
                                        <li><router-link to="/eatfoodchart">섭취 식품 통계</router-link></li>
                                        <li><router-link to="/dibfoodchart">찜 식품 성분 통계</router-link></li>
                                    </template>
                                </ul>
                                </li>
                            </ul>
                            <ul class="nav navbar-nav navbar-right">
                                <li>
                                    <template v-if="isLogin">
                                        <p id="loginUser"><router-link to="/noticelist" style="font-size: large; color: #4BA5A5"><el-button size="mini" type="primary" icon="el-icon-bell" ></el-button>  {{noticeCount}}  </router-link>{{userInfo.name}}님 환영합니다.</p>
                                    </template>
                                    <template v-else>
                                        <router-link class="btn btn-sm dropdown-toggle" to="/membersignup" ><span class="glyphicon glyphicon-user" aria-hidden="true"></span> <span>&nbsp;Sign Up</span> </router-link>
                                    </template>
                                </li>
                                
                                <template v-if="!isLogin">
                                    <li>
                                        <ul class="nav navbar-nav pull-right">
                                            <li class="dropdown" v-bind:class="{ 'open': loginPopup }">
                                                <a class="btn btn-sm dropdown-toggle" href="#">
                                                <span class="glyphicon glyphicon-lock" aria-hidden="true"></span>
                                                <span>&nbsp;Login</span>
                                                </a>


                                                <div class="dropdown-menu" style="padding: 17px;">
                    
                                                    <form @submit.prevent="loginfunc()">
                                                        <div class="form-group">
                                                            <label for="id">아이디</label>
                                                            <input type="text" v-model="id" class="form-control" id="id" name="id" placeholder="ID" autocomplete="off">
                                                        </div>
                                                        <div class="form-group">
                                                            <label for="pw">패스워드</label>
                                                            <input type="password" v-model="pw" class="form-control" id="pw" name="pw" placeholder="Password">
                                                        </div>
                                                        <div class="form-group">
                                                            <button type="submit" class="btn btn-block btn-primary">로그인</button>
                                                        </div>
                                                    </form>
                                                    <router-link to="/memberfindid" class="btn btn-block btn-warning">아이디 찾기 </router-link>
                                                    <router-link to="/memberfindpw" class="btn btn-block btn-warning">비밀번호 찾기 </router-link>
                                                    <router-link to="/memberdelete" class="btn btn-block btn-danger">회원정보 삭제 </router-link>
                                                </div>
                                            </li>
                                        </ul>
                                    </li>
                                </template>
                                
                                <template v-if="isLogin">
                                    <li @click="$store.dispatch('logout')">
                                        <a class="btn btn-sm">
                                            <span class="glyphicon glyphicon-lock" aria-hidden="true"></span> 
                                            <span>&nbsp;Logout</span>
                                        </a>
                                    </li>
                                    
                                    <li>
                                        <ul class="nav navbar-nav pull-right">
                                            <li class="dropdown">
                                                <a class="btn btn-sm dropdown-toggle" href="#" data-toggle="dropdown">
                                                <span class="glyphicon glyphicon-lock" aria-hidden="true"></span> 
                                                <span>&nbsp;menu</span>
                                                </a>
                    
                                                <div class="dropdown-menu" style="padding: 17px;">
                                                    <router-link to="/memberinfo" class="btn btn-block btn-info">회원정보 수정 </router-link> 
                                                    <router-link to="/noticesend" class="btn btn-block btn-info">쪽지 보내기 </router-link> 
                                                </div>
                                            </li>
                                        </ul>
                                    </li>
                                </template>
                            </ul>

                        </div>
                        <!-- /.navbar-collapse -->
                    </div>
                    <!-- /.container-fluid -->
                </nav>

                <el-carousel :interval="2000" type="card" height="250px">
                    <a href="https://polinlove.tistory.com/9443" target="_blank">
                        <el-carousel-item class="safeImg"></el-carousel-item>
                    </a>
                    <a href="https://www.ssafy.com/ksp/jsp/swp/swpMain.jsp" target="_blank">
                        <el-carousel-item class="ssafy3Img"></el-carousel-item>
                    </a>
                    <a href="https://www.foodsafetykorea.go.kr/main.do" target="_blank">
                        <el-carousel-item class="foodsafecontryImg"></el-carousel-item>
                    </a>
                </el-carousel>
            </header>
            <router-view />
        </div>

        <footer style="background: #ececec; padding: 30px; position: relative; bottom: 0; width: 100%; height: 30%; white-space: nowrap;">
            <h1>Find Us</h1>
            <hr>
            <p>
                <i class="glyphicon glyphicon-envelope"></i> (SSAFY) 서울시 강남구 테헤란로
                멀티스퀘어
            </p>
            <p>
                <i class="glyphicon glyphicon-envelope"></i> 1544-9001
            </p>
            <p>
                <i class="glyphicon glyphicon-envelope"></i> admin@ssafy.com
            </p>
        </footer>
    </div>
</template>

<script>

import { mapState, mapActions } from "vuex"
import http from "./http-common"
global.jQuery = require('jquery')
global.tf = require('@tensorflow/tfjs');
global.tmImage = require('@teachablemachine/image');
export default {
    name: "app",
    data(){
        return {
            id: null,
            pw: null,
            noticeList:[],
            noticeCount:'',
            loginPopup: false
        }
    },
    computed:{
        ...mapState(['isLogin', 'isLoginError', 'userInfo'])
    },
    methods:{
        ...mapActions(['login']),
        loginfunc(){
            if(this.id==''){ alert('아이디를 입력하세요.'); return;}
            if(this.pw==''){ alert('비밀번호를 입력하세요.'); return;}
            this.login({id:this.id, pw:this.pw})
            http
            .get("/notice/selectList/"+this.id)
            .then(response => {
                this.noticeList = response.data.resvalue;
                this.noticeCount=0;
                this.noticeList.forEach(element => {
                    if(element.read==0){
                        this.noticeCount++;
                    }
                });
            })
            .catch(() => {
                this.errored = true;
            })
            .finally(() => (this.loading = false));
            this.id = ''
            this.pw = null            
        },
        noticeCountfunc(){
            if(JSON.parse(sessionStorage.getItem("userInfo"))!=null){
                http
                .get("/notice/selectList/"+JSON.parse(sessionStorage.getItem("userInfo")).id)
                .then(response => {
                    this.noticeList = response.data.resvalue;
                    this.noticeCount=0;
                    this.noticeList.forEach(element => {
                        if(element.read==0){
                            this.noticeCount++;
                        }
                    });
                })
                .catch(() => {
                    this.errored = true;
                })
                .finally(() => (this.loading = false));
            }

        },
        loginPopupfunc(){
            this.loginPopup = (this.loginPopup ? false : true)
        },
        init(){
            http
            .get("/main/init")
            .then(response => {
                window.console.log(response.data.resmsg)
            })
            .catch(() => {
                this.errored = true;
            })
            .finally(() => (this.loading = false));
        }
    },
    mounted(){
        setInterval(this.noticeCountfunc,1000)
        this.init()
    }
}
</script>

<style>
    @font-face {
        font-family: 'BMHANNAAir';
        src:
            url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_four@1.0/BMHANNAAir.woff')
            format('woff');
        font-weight: normal;
        font-style: normal;
    }

    html * {
        font-family: 'BMHANNAAir';
    }

    body {
        padding-top: 120px;
        position: relative;
    }

    .material {
        overflow: hidden;
        text-overflow: ellipsis;
        height: 120px;
    }

    .jumbotron {
        background-color: #eef8ff !important;
        text-align: center;
        padding: 20px !important;
        box-shadow: 0 10px 6px -6px #999;
    }

    div.ex {
        background-color: #ccc;
        width: 600px; 
        padding: 50px;
        border-style: outset;
        margin: 70px auto;
    }

    .form-group .control-label:after {
        content: "*";
        color: red;
    }

    th, td {
        vertical-align: middle !important;
    }

    th {
        white-space: nowrap;
        text-align: center;
    }

    input[type=password]{
		font-family: auto;
	}
	
	#loginUser{
		color: white;
		padding: 15px;
		margin: 0px;
	}
	
	.dropdown-menu{
		width:350px;
    }

    html, body{
        height: 100%;
    }
    
    .container{
        min-height: 70%;
    }

    .el-carousel__item h3 {
        color: #475669;
        font-size: 14px;
        opacity: 0.75;
        line-height: 200px;
        margin: 0;
        padding: 20px;
    }

    .el-carousel__item{
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        box-shadow: 0 10px 6px -6px #999;
        border-radius: 10px;
    }

    .safeImg{
        background-image: url("./assets/safe.png");
    }

    .ssafy3Img{
        background-image: url("./assets/ssafy3.jpg");
    }

    .foodsafecontryImg{
        background-image: url("./assets/foodsafecontry.jpg");
    }

    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }

    @media only screen and (min-width: 768px) {
        .dropdown:hover .dropdown-menu {
            display: block;
        }
    }

    .el-card{
        margin-bottom: 20px;
    }

    th{
        text-align: center !important;
    }

    .navbar-fixed-top{
        z-index: 9999 !important;
    }
</style>
