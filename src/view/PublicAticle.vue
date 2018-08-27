<template>
  <div class="page">
    <div class="header">
      <ul>
        <li class="i1">累计发布<span>{{total}}</span>篇</li>
        <li>本年发布<span>{{year}}</span>篇</li>
        <li class="i3">本月发布<span>{{month}}</span>篇</li>
        <li>本周发布<span>{{week}}</span>篇</li>
      </ul>
    </div>
    <h2>详细列表</h2>
    <div class="middle-content">

      <ul class="content">
        <li v-for="(val,i) in articleList" @click="clk(val.article_id)">
          <div class="left">
            <img :src="val.icon" alt="">
          </div>
          <div class="right">
            <h1>{{val.title}}</h1>
            <p>
              <span>{{val.look_count||0}} <br><i>浏览量</i></span>
              <span>{{val.share_count||0}} <br><i>转发量</i></span>
              <span>{{val.trial_count||0}} <br><i>试算量</i></span>
              <span>{{val.insure_count||0}} <br><i>尝试投保量</i></span>
            </p>
            
          </div>
        </li>
      </ul>



    </div>
  </div>
</template>
<script>
export default {
    name: 'index',
    data(){
      return {
        articleList:[],
        month:0,
        total:0,
        week:0,
        year:0,
      }
    },
    created(){

    },
    mounted(){
      common.noShare();
      this.ax('releasedArticle.do',{"userid":this.$route.params.userid},true).then(res => {
          this.articleList = {...res.body.releasedArticleList};
          this.month = res.body.month;
          this.year = res.body.year;
          this.total = res.body.total;
          this.week = res.body.week;
        })
    },
    computed:{
      
    },
    methods:{
      clk(id){
        this.$router.push(`/details/${id}/${this.$route.params.userid}`);
        
      }
    }
}
</script>

<style lang='less' scoped>
@import url(../assets/css/main.less);
@import url(../assets/css/common.less);
@deepBlue:#388cc8;
@lightBlue:#37a2ba;
div.page{
  div.header{
    background: -webkit-radial-gradient(0px 0px, @deepBlue, @lightBlue); 
    ul{
      display:flex;
      flex-wrap: wrap;
      justify-content: space-around;
      padding:.5rem 0;
      li{
        width:49%;
        display:inline-block;
        // padding-left: .5rem;
        padding:.2rem 0 .2rem .5rem;
        // text-align: left;
        
        font-size: .3rem;
        color:#fff;
        span{
          border-bottom:1px solid #fff;
          // padding:0 .3rem;
          text-align:center;
          display:inline-block;
          width:1.1rem;
          color:#ffc324;
        }
      }
    }
  }
  div.middle-content{
    margin-top: .2rem;margin-bottom:0;
  }
  h2{
    margin:0 5%;border-bottom:1px solid #c6c7c7;color:#727374;font-size:.3rem;padding-bottom: .15rem;margin-top:.3rem;
  }
}
</style>