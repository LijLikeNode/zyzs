<template>
  <div class="page1">
    <h1>{{article.title}}</h1>
    <h2>
      <div class="t_lf">
        <span><img :src="agentinfo.avatar" alt=""></span>{{agentinfo.name}}
      </div>
      <div class="t_middle">{{date}}</div>
      <!-- <div class="t_middle">{{article.create_date.split(' ')[0]}}</div> -->
      <a class="t_rt" :href="phone"></a>
    </h2>
    <!-- 后台获取的代码片段 -->
    <div class="contents" v-html="article.content"></div>
    <div class="btns">
      <a  class="btn1" @click="forecast">保费试算</a>
      <a  class="btn2" @click="pro">立即投保</a>
    </div>


    <!-- 名片展示 -->

    <card :agentinfo="agentinfo"></card>





    <!-- <div class="footer" @click="toPuc">已发文章</div> -->
  </div>
</template>
<script>
import Card from '@/components/Card'
export default {
    name: 'index',
    data(){
      return {
        name:'',
        agentinfo:null,
        article:null,
      }
    },
    components:{Card},
    computed:{
      date(){
        // console.log(this.article)
        return this.article?this.article.create_date.split(' ')[0]:'';
      },
      phone(){
        console.log(this.agentinfo)
        return this.agentinfo?'tel:'+this.agentinfo.mobile:'';
      },
    },
    created(){

    },
    mounted(){
      
      
      let param = {"userid":this.$route.params.userid,"article_id":this.$route.params.id};
      this.ax('articleDetailByUserid.do',{data:JSON.stringify(param)},true).then(res => {
        this.agentinfo = {...res.agentinfo};
        this.article = {...res.article};
        let that = this;
        // console.log(that.share_title)
        window.doShare("",that.article.share_title,that.article.share_content,"http://zmt.ihxlife.com/zj_wmp/zyzs/#/details/"+that.$route.params.id+'/'+that.$route.params.userid,that.article.share_icon, that.$route.params.userid,that.$route.params.id);
      })
      this.ax('addLook.do',{data:JSON.stringify(param)}).then(res=>{
        // console.log(res)
      })
    },
    methods:{
      changeTab(i,id){
        this.tab = i;
        
      },
      forecast(){
      let para = {
        "userid":this.$route.params.userid, 
        "article_id":this.$route.params.id
        }
        this.ax('addTrial.do',{data:JSON.stringify(para)}).then(res=>{
          res.result=='succ'?window.location.href = this.article.plan_url:'';
        })

        // 
      },
      pro(){
         let para = {
          "userid":this.$route.params.userid, 
          "article_id":this.$route.params.id
          }
        this.ax('addInsure.do',{data:JSON.stringify(para)}).then(res=>{
          res.result=='succ'?window.location.href = this.article.product_url:'';
        })
        
      }
    }
}
</script>

<style lang='less'>
@import url(../assets/css/main.less);
@import url(../assets/css/common.less);
@deepBlue:#388cc8;
@lightBlue:#37a2ba;
div.page1{
  background: #fff;padding:0 5%;min-height:100vh;padding-bottom: 2em;
  audio{
        width: 100%;
  }
  video{
    width:100%;
  }
  h1{
    color:#2497ca;
    text-align: center;
    font-size: .35rem;
    padding:.2rem 0;
    font-weight: bold;
  }
  h2{
    display:flex;
    color:#8f9092;
    padding:.15rem .25rem;
    .t_lf{
      width: 40%;
      position:relative;
      padding-left:2.35em;
      span{
        // display:inline-block;
        border-radius: 50%;
        overflow: hidden;
        position:absolute;left:0;top:-.08rem;
        width:2em;
        height:2em;
        vertical-align: middle;
        img{
          display:block;
          width:100%;
          height:100%;
        }

      }
    }
    .t_middle{
      // text-align:center;
      flex-grow:1;
    }
    .t_rt{
      width:1.5em;height:1.5em;
      background:url('../assets/img/phone.png') no-repeat center center;background-size: 100%;
    }
  }
  div.contents{
    min-height: 10em;
    border-top:1px solid #dddddd;
    border-bottom:1px solid #dddddd;
    padding:.3rem 0;
    p{
      // color:red;
      text-indent: 2em; 
      img{
        width:90%;
        display:block;
        margin:.3rem auto;
      }
    }
    
  }
  div.btns{
    display:flex;
    justify-content:space-around;
    margin:2em 0;
    a{
      display:inline-block;
      border-radius:4px;
      border:1px solid #d75027;
      color:#d75027;
      padding:.14rem .65rem;
      font-size:.25rem;
    }
  }
}
</style>