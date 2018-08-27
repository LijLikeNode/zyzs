<template>
  <div class="page">
  	<ul class="header">
  		<li v-for="(val,i) in tabList" @click="changeTab(i+1,val.type_id)" :class="[{'active':tab==i+1}]">{{val.type_name}}</li>
  	</ul>
    <div class="middle-content">
      <!-- 
          文章条目展示  分为三种类型
          1.通用类型的
          2.图片类型
          3.视频类型
       -->
      <!-- 1.通用类型 -->
      <ul class="content" v-if="tab!=7">
        <li v-for="(val,i) in articleList" @click="clk(val.article_id)" :key="i">
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
      <!-- 2.图片类型 -->
      <ul class="pic" v-if="tab==7">
        <li v-for="(val,i) in articleList" @click="clkimg(val.pic_id,val.imgurl)"><img :src="val.imgurl" alt=""></li>
        <!-- <li></li> -->
      </ul>

    </div>
    <div class="footer" @click="toPuc">{{tab==7?'已发图片':'已发文章'}}</div>
  </div>
</template>
<script>
export default {
    name: 'index',
    data(){
      return {
        name:'',
        tab:1,
        tabList:[],
        articleList:[],
        userid:'',
      }
    },
    created(){
      this.ax('articleType.do',{}).then(res => {
        // console.log(res)
        this.tabList = res.typeList;
      });
      this.changeTab(2,2);
    },
    mounted(){
      common.noShare();
      this.userid = this.urlString().userid;
    },
    computed:{
      
    },
    methods:{
      changeTab(i,id){
        this.tab = i;
        this.ax('zyzsData.do',{"userid":this.userid,"type_id":id},true).then(res => {
          this.articleList = res.articleList;
        })
      },
      toPuc(){
        if(this.tab==7){
          this.$router.push(`/publicimg/${this.userid}`);
        }else{
          this.$router.push(`/article/${this.userid}`);
        }
        
      },
      clk(id){
        this.$router.push(`/detail/${id}/${this.userid}`);
      },
      clkimg(id,url){
        this.$store.state.imgUrl = url;
        this.$router.push(`/editimg/${id}/${this.userid}`);
      }
    }
}
</script>

<style lang='less' scoped>
@import url(../assets/css/main.less);
@import url(../assets/css/common.less);
@deepBlue:#388cc8;
@lightBlue:#37a2ba;
@yellow:#ffc423;
div.page{
 height:100vh;
 h1{
  padding:0;font-weight:normal;
 }
	ul.header{
    position: fixed;
    top:0;
    left:0;
    width:100%;
		display:flex;
		background-image: -webkit-radial-gradient(0px 0px, @deepBlue, @lightBlue); 
    height: 1rem;
    // margin-bottom:.3rem;
		li{
			flex-grow:1;
			text-align: center;
			color: #fff;
			font-size: .3rem;
			line-height: 1rem;
			&.active{
				background: @yellow;
			}
		}
	}
  ul.pic{
    display:flex;
    justify-content:space-around;
    flex-wrap: wrap;
    padding: 0 5%;
    li{
      width:13em;
      height:13em;
      margin-bottom: 1em;
      img{width:100%;height:100%;}
    }
  }
  div.footer{
    width:100%;
    line-height:1rem;
    position: fixed;
    bottom:0;
    left:0;
    background-image: -webkit-radial-gradient(top, @deepBlue, @lightBlue); 
    text-align:center;
    color:#fff;
  }
}
</style>