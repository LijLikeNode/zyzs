<template>
  <div class="pag">
    <h2>已发图片列表</h2>
      <ul class="list">
        <!-- <li><img src="" alt=""></li> -->
        <li v-for="(val,i) in picList" @click="saveUrl(val.imgurl)"><img :src="val.imgurl" alt=""></li>
      </ul>
      <div class="footer" @click="returnIndex">返回首页</div>
      <transition name="fade">
        <div class="imgShow" v-if="imgShow" @click.stop="imgShow=false">
          <img :src="imgShowUrl" alt="">
        </div>
      </transition>
  </div>
</template>
<script>
export default {
    name: 'plan',
    data(){
      return {
        picList:[{imgurl:""}],
        imgShow:false,
        imgShowUrl:''
      }
    },
    created(){
      
    },
    watch:{
      
    },
    mounted(){
      common.noShare();
      this.ax('releasedPicture.do',{userid:this.$route.params.userid}).then(res=>{
        console.log(res)
        this.picList = [...res.pictureList]
        // console.log(this.picList)
      })
    },
    computed:{
      
    },
    methods:{
      
      clk(id,url){
        this.tab_plan = id;
        this.plan_url = url;
      },
      returnIndex(){
        this.$router.push(`/?userid=${this.$route.params.userid}`)
      },
      saveUrl(url){
        // console.log(url)
        this.imgShowUrl=url;
        this.imgShow = true;
      }
      
    }
}
</script>

<style lang='less' scoped>
@import url(../assets/css/main.less);
// @import url(../assets/css/common.less);
@deepBlue:#388cc8;
@lightBlue:#37a2ba;
div.pag{
  background: #f7b454;min-height:100vh;padding-top:1em;position:relative;padding-bottom:6em;
  h2{
    font-size: 1.3em;
    color:#fff;
    font-weight:bold;
    margin: 1em;
    margin-top:0;
    padding-bottom:1em; 
    border-bottom:1px solid #fff;
  }
}
ul.list{
  display:flex;
  width: 90%;
  margin-left:5%;
  justify-content:space-between;
  flex-wrap:wrap;
  li{
    width: 47%;margin-bottom:1.5em;height: 12em;overflow: hidden;
    img{
      width:100%;height:100%;
    }
  }
  
}
div.footer{
  width:100%;
  line-height:1rem;
  // margin-top:2em;
  // margin-left:-5%;
  position: absolute;
  bottom:0;
  left:0;
  background-image: -webkit-radial-gradient(top, @deepBlue, @lightBlue); 
  text-align:center;
  color:#fff;
}
div.imgShow{
  position:fixed;top:0;left:0;width:100vw;height:100vh;background:rgba(0,0,0,.7);
  img{width:80%;position:absolute;top:50%;transform:translateY(-50%);margin-left:10%}
}
</style>