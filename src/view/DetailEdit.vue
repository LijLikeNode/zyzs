<template>
  <div class="page2">
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
      <a @click="addUrl('plan')" class="btn1"><img src="../assets/images/add.png" alt="">添加计划书</a>
      <a @click="addUrl('buy')" class="btn2"><img src="../assets/images/add.png" alt="">添加投保链接</a>
    </div>


    <!-- 名片展示 -->

    <card :agentinfo="agentinfo"></card>
    <plan v-if="planShow" :list="planList" :plan='plan' @close="planShow=false" @addPlan="addPlan"></plan>
    <product v-if="productShow" :list="productList" :plan='product' @close="productShow=false" @addPlan="addProduct"></product>





    <div class="footer" @click="publicAticle">保存</div>
  </div>
</template>
<script>
import Card from '@/components/Card'
import Plan from '@/components/Plan'
import Product from '@/components/Product'
export default {
    name: 'index',
    data(){
      return {
        name:'',
        agentinfo:{
          "name": "",
          "mobile": "",
          "manage_com_name": "",
          "describe": "",
          "look_count": 0,
          "voice": ""
        },
        article:{
          "plan_url": null,
          "product_url": null,
          "title": "",
          "content": "",
          "create_date": ""
        },
        planList:[],
        planShow:false,
        plan:{
          plan_url:'',
          plan_id:'',
        },
        productList:[],
        productShow:false,
        product:{
          product_url:'',
          product_code:'',
        },
      }
    },
    components:{Card,Plan,Product},
    computed:{
      date(){
        // console.log(this.article)
        return this.article?this.article.create_date.split(' ')[0]:'';
      },
      phone(){
        // console.log(this.agentinfo)
        return this.agentinfo?'tel:'+this.agentinfo.mobile:'';
      },
    },
    created(){

    },
    mounted(){
      common.noShare();
      let param = {"userid":this.$route.params.userid,"article_id":this.$route.params.id};
      this.ax('articleDetail.do',{data:JSON.stringify(param)},true).then(res => {
        // this.articleList = {...res.body.releasedArticleList};
        // console.log(res)
        this.agentinfo = {...res.agentinfo};
        this.article = {...res.article};
        // console.log(JSON.stringify(this.agentinfo))
        // console.log(JSON.stringify(this.article))
        // console.log(this.article)
        // console.log($('video'))
      })
    },
    methods:{
      publicAticle(){
        if(this.plan.plan_url=='') {
          popalert.fade('请您添加计划书');
          return;
        }
        if(this.product.product_url=='') {
          popalert.fade('请您添加投保连接');
          return;
        }

        let pram ={
                "userid":this.$route.params.userid,
                "article_id":this.$route.params.id,
                "plan_url":this.plan.plan_url,
                "product_url":this.product.product_url+'&sales_agent='+this.$route.params.userid
                }


        this.ax('publishArticle.do',{data:JSON.stringify(pram)},true).then(res=>{
          // console.log(res)
          if(res.result=='succ') this.$router.push(`/details/${this.$route.params.id}/${this.$route.params.userid}`)
        })




      },
      addPlan(id,url){
        this.plan.plan_url = url;
        this.plan.plan_id = id;
        // console.log(this.plan_url,this.plan_id);
        this.planShow = false;
      },
      addProduct(id,url){
        this.product.product_url = url;
        this.product.product_code = id;
        // console.log(this.product.product_url,this.product.product_code);
        this.productShow = false;
      },
      changeTab(i,id){
        this.tab = i;
        
      },
      addUrl(v){
        v=="plan"?this.requestPlan():this.requestProduct();
      },
      requestPlan(){
        this.ax('queryPlan.do',{}).then(res=>{
          // console.log(res)
          this.planList = {...res.planList};
          this.planShow = true;
        })
      },
      requestProduct(){
        this.ax('queryProduct.do',{'userid':this.$route.params.userid}).then(res=>{
          // console.log(res)
          this.productList = {...res.proList};
          this.productShow = true;
        })
      },
    }
}
</script>

<style lang='less'>
@import url(../assets/css/main.less);
@import url(../assets/css/common.less);
@deepBlue:#388cc8;
@lightBlue:#37a2ba;
div.page2{
  background: #fff;padding:0 5%;min-height:100vh;padding-bottom:6em;position:relative;
  video{
    width:100%;
  }
  audio{
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
      padding:.14rem .35rem;
      font-size:.25rem;
      img{
        width:1.1em;height:1.1em;vertical-align:middle;margin:-.2em .3em 0 0;
      }
    }
  }
  div.footer{
    width:110%;
    line-height:1rem;
    // margin-top:2em;
    margin-left:-5%;
    position: absolute;
    bottom:0;
    left:0;
    background-image: -webkit-radial-gradient(top, @deepBlue, @lightBlue); 
    text-align:center;
    color:#fff;
  }
}
</style>