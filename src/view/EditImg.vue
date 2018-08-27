<template>
  <div class="page">
    <div id="poster" class="img_res">
      <img :src="bigPic" alt="">
      <div class="word">
        <div class="agent">
          <div class="pic"><img :src="smallPic" alt=""></div>
          <div class="info">
            <p>{{agent.name}}</p>
            <p>{{agent.manage_com_name}}</p>
          </div>
        </div>

        <div class="qrCode">
          <p @click="addUrl" v-show="!qrCodeShow"><img src="../assets/images/add.png" alt=""></p>
          <div id="qrcode" @click="addUrl" v-show="qrCodeShow"></div>
        </div>
        
      </div>
      
    </div>
    <!-- <img id="grow-img" src="" alt=""> -->
    <canvas id="canvas" style="display:none"></canvas>
    <pic-choose ref="qrcode" v-show="urlShow" :userid="$route.params.userid" @close="urlShow=false" @getUrl="getUrl"></pic-choose>
    <div class="footer" @click="publicImg">保存</div>
  </div>
</template>
<script>
import PicChoose from '@/components/PicChoose'
import QRCode from 'qrcodejs2';
import html2canvas from 'html2canvas';
export default {
    name: 'index',
    data(){
      return {
        agent:{
          avatar:'',
          manage_com_name:'',
          name:'',
        },
        urlShow:false,
        qrCodeShow:false,
        bigPic:'',
        smallPic:'',
        finalBase64:'',
      }
    },
    components:{PicChoose},
    created(){

    },
    mounted(){
      common.noShare();
      this.ax('queryAgentInfo.do',{userid:this.$route.params.userid}).then(res=>{
        this.agent = {...res.agentinfo};
        this.toBase64(2);
      });
      this.toBase64(1);
    },
    computed:{
      // bigPic(){
      //   return 
      // }
    },
    methods:{
      toBase64(n){
        this.ax('imageToBase64ByOnline.do',{imgurl:n==1?this.$store.state.imgUrl:this.agent.avatar}).then(res=>{
          n==1?this.bigPic = res.base64:this.smallPic=res.base64;
        })
      },
      publicImg(){
        // console.log(this.$refs)
        if(this.$refs.qrcode.final_url==''){
          popalert.fade('点击加号添加二维码链接')
          return;
        }
        this.transferImg();
      },
      transferImg(){
        let that = this;
        let content_html = document.getElementById('poster');　　　　//要转化的div
        let width = content_html.offsetWidth;
        let height = content_html.offsetHeight;
        let offsetTop = content_html.offsetTop;
        let canvas = document.getElementById("canvas");
        let context = canvas.getContext('2d');
        let scaleBy = Math.ceil(window.devicePixelRatio);
        canvas.width = width*scaleBy;
        canvas.height = (height+offsetTop)*scaleBy;
        context.scale(scaleBy,scaleBy);
        var opts = {
          allowTaint:true,//允许加载跨域的图片
          tainttest:true, //检测每张图片都已经加载完成
          scale:1, // 添加的scale 参数  图片缩放倍数 调整清晰度
          canvas:canvas, //自定义 canvas
          logging: false, //日志开关，发布的时候记得改成false
          width:width, //dom 原始宽度
          height:height //dom 原始高度
        };
        html2canvas(content_html,opts).then(function (canvas) {
          canvas.style.width = width+"px";
          canvas.style.height = height+"px";
          var image = new Image();
          var url =canvas.toDataURL("image/png");
          that.finalBase64 = url;
          that.savePic(url);
          // $('#grow-img').attr('src', url);
        });
      },
      savePic(url){
          let para = {
            "userid":this.$route.params.userid,  
            "pic_id":this.$route.params.id,  
            "picture":url, 
            }
          this.ax('publishPicture.do',{data:JSON.stringify(para)},true).then(res=>{
          if(res.result=='succ'){
            popalert.fade('保存成功');
            setTimeout(()=>{
              this.$router.push(`/publicimg/${this.$route.params.userid}`)
            },1500)
          }
        })
      },
      getUrl(url){
        this.urlShow=false;
        this.qrcode(url);
      },
      qrcode (url) {
        // let url = this.getUrl();
        this.qrCodeShow=true;
        $('#qrcode').html('')
        let qrcode = new QRCode('qrcode', {
          width: 100,
          height: 100, // 高度
          text: url // 二维码内容
          // render: 'canvas' // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
          // background: '#f0f'
          // foreground: '#ff0'
        })
        // console.log(qrcode)
      },
      addUrl(){
        this.urlShow = true;
      },
    }
}
</script>

<style lang='less' scoped>
@import url(../assets/css/main.less);
// @import url(../assets/css/common.less);
@deepBlue:#388cc8;
@lightBlue:#37a2ba;
div.page{
  padding-bottom: 6em;position:relative;
  img{width:100%;}
  div.img_res{
    background: #fff;padding: 1em;width:100%;
    img{width: 100%;}
    .word{
      padding:2em 1em 1em;margin-top: 2em;width:100%;overflow:hidden;
    }
    div.agent{
      width:70%;height:6em;display:inline-block;
      .pic{
         width:5em;overflow: hidden;margin-right: 1em;display:inline-block;vertical-align:middle;
         img{
          border-radius:4em;
         }

      }
      .info{
        display:inline-block;width:60%;vertical-align:middle;
        p{
          margin-bottom: .3em;

         }
      }
    }
    div.qrCode{
      line-height: 4;display:inline-block;width:28%;vertical-align:middle;
      p{
        text-align:center;
        img{
            width:2em;height:2em;
          }
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
}
#qrcode{
  margin-top:-1em;
  // margin-left:2em;
}
</style>