import Vue from "vue";
import Router from "vue-router";
import MemberSignUp from "./components/MemberSignUp.vue";
import MemberInfo from "./components/MemberInfo.vue";
import MemberDelete from "./components/MemberDelete.vue";
import MemberFindId from "./components/MemberFindId.vue";
import MemberFindPw from "./components/MemberFindPw.vue";
import BoardList from "./components/BoardList.vue";
import BoardInsert from "./components/BoardInsert.vue";
import BoardView from "./components/BoardView.vue";
import BoardUpdate from "./components/BoardUpdate.vue";
import QnaBoardList from "./components/QnaBoardList.vue";
import QnaBoardInsert from "./components/QnaBoardInsert.vue";
import QnaBoardView from "./components/QnaBoardView.vue";
import QnaBoardUpdate from "./components/QnaBoardUpdate.vue";
import ChattingList from "./components/ChattingList.vue";
import NoticeList from "./components/NoticeList.vue";
import NoticeView from "./components/NoticeView.vue";
import NoticeSend from "./components/NoticeSend.vue";
import FoodInfoList from "./components/FoodInfoList.vue";
import FoodInfoDetail from "./components/FoodInfoDetail.vue";
import BestFoodInfoList from "./components/BestFoodInfoList.vue";
import MaterialUseFrequency from "./components/MaterialUseFrequency.vue";
import AllergyCautionList from "./components/AllergyCautionList.vue";
import AllUserAllergyChart from "./components/AllUserAllergyChart.vue";
import SafeCombinationList from "./components/SafeCombinationList.vue";
import EatFoodInfoList from "./components/EatFoodInfoList.vue";
import DibFoodInfoList from "./components/DibFoodInfoList.vue";
import EatFoodChart from "./components/EatFoodChart.vue";
import DibFoodChart from "./components/DibFoodChart.vue";
import WhatIsThis from "./components/WhatIsThis.vue";
import Index from "./components/index.vue";
// import Store from "./store"

Vue.use(Router);

// const rejectAuthUser = (to, from, next) => {
//   if(Store.state.isLogin == true){
//     alert('이미 로그인 했습니다.')
//     next("/")
//   }else{
//     next()
//   }
// }

// const onlyAuthUser = (to, from, next) => {
//   if(Store.state.isLogin == false){
//     alert('로그인이 필요한 기능입니다.')
//     next("/")
//   }else{
//     next()
//   }
// }
export default new Router({
  mode: "history",
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/membersignup',
      name: 'membersignup',
      component: MemberSignUp
    },
    {
      path: '/memberinfo',
      name: 'memberinfo',
      component: MemberInfo
    },
    {
      path: '/memberdelete',
      name: 'memberdelete',
      component: MemberDelete
    },
    {
      path: '/memberfindid',
      name: 'memberfindid',
      component: MemberFindId
    },
    {
      path: '/memberfindpw',
      name: 'memberfindpw',
      component: MemberFindPw
    },
    
    {
      path: '/boardlist',
      name: 'boardlist',
      component: BoardList
    },
    {
      path: '/boardinsert',
      name: 'boardinsert',
      component: BoardInsert
    },
    {
      path: '/boardview/:num',
      name: 'boardview',
      component: BoardView,
      props: true
    },
    {
      path: '/boardupdate/:num',
      name: 'boardupdate',
      component: BoardUpdate,
      props: true
    },
    {
      path: '/qnaboardlist',
      name: 'qnaboardlist',
      // beforeEnter: onlyAuthUser,
      component: QnaBoardList
    },
    {
      path: '/qnaboardinsert',
      name: 'qnaboardinsert',
      component: QnaBoardInsert
    },
    {
      path: '/qnaboardview/:qnum',
      name: 'qnaboardview',
      component: QnaBoardView,
      props: true
    },
    {
      path: '/qnaboardupdate/:qnum',
      name: 'qnaboardupdate',
      component: QnaBoardUpdate,
      props: true
    },
    {
      path: '/chattinglist',
      name: 'chattinglist',
      component: ChattingList,
    },
    {
      path: '/noticelist',
      name: 'noticelist',
      component: NoticeList,
    },
    {
      path: '/noticeview/:num',
      name: 'noticeview',
      component: NoticeView,
      props: true
    },
    {
      path: '/noticesend',
      name: 'noticesend',
      component: NoticeSend,
    },
    {
      path: '/foodinfolist',
      name: 'foodinfolist',
      component: FoodInfoList
    },
    {
      path: '/foodinfodetail/:code',
      name: 'foodinfodetail',
      component: FoodInfoDetail,
      props: true
    },
    {
      path: '/bestfoodinfolist',
      name: 'bestfoodinfolist',
      component: BestFoodInfoList
    },
    {
      path: '/materialusechart',
      name: 'materialusechart',
      component: MaterialUseFrequency
    },
    {
      path: '/allergycautionlist',
      name: 'allergycautionlist',
      component: AllergyCautionList
    },
    {
      path: '/alluserallergychart',
      name: 'alluserallergychart',
      component: AllUserAllergyChart
    },
    {
      path: '/safecombinationList',
      name: 'safecombinationList',
      component: SafeCombinationList
    },
    {
      path: '/eatfoodinfolist',
      name: 'eatfoodinfolist',
      component: EatFoodInfoList
    },
    {
      path: '/dibfoodinfolist',
      name: 'dibfoodinfolist',
      component: DibFoodInfoList
    },
    {
      path: '/eatfoodchart',
      name: 'eatfoodchart',
      component: EatFoodChart
    },
    {
      path: '/dibfoodchart',
      name: 'dibfoodchart',
      component: DibFoodChart
    },
    {
      path: '/whatisthis',
      name: 'whatisthis',
      component: WhatIsThis
    }
  ]
});