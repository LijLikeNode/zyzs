<template>
  <div class="card">
    <div class="header">
      <div class="header-top">
        <div><p>{{agentinfo.look_count}}</p><p>浏览</p></div>
        <!-- <div class="radio-broadcast" @click="playAudio" v-if="isShowVoice">
          <audio :src="agentinfo.voice" id="audioPlay"></audio>
          <div class="trumpet">
            认识我
              <img src="../assets/images/trumpet.png" alt="">
              <img class="middle" src="../assets/images/trumpet1.png" ref="img1" alt="">
              <img src="../assets/images/trumpet2.png" ref="img2" alt="">
          </div>
          
        </div> -->
      </div>
      <div class="header-user">
        <dl>
          <dt><img :src="agentinfo.avatar" alt=""></dt>
          <dd>
            <h6>{{agentinfo.name}}</h6>
            <p class="user-company">{{agentinfo.manage_com_name}}</p>
            <p class="value-counten"><input type="text" :value="agentinfo.describe" readonly = "readonly"></p>
          </dd>
        </dl>
      </div>
    </div>
  </div>
</template>
<script>
export default {
    name: 'card',
    data(){
      return {
        name:'',
        isShowVoice:true
      }
    },
    props:['agentinfo'],
    computed:{
      
    },
    created(){

    },
    mounted(){
      console.log(this.agentinfo)
    },
    methods:{
      changeTab(){
        
      },
      playPauseAnimate(){
          clearInterval(window.imgA);
          clearTimeout(window.img1);
          clearTimeout(window.img2);
          this.$refs.img1.style.display = 'inline-block';
          this.$refs.img2.style.display = 'inline-block';
      },
      playAnimate(){
          this.$refs.img1.style.display = 'none';
          this.$refs.img2.style.display = 'none';
          window.img1 = setTimeout(()=>{
              this.$refs.img1.style.display = 'inline-block';
          },500);
          window.img2 = setTimeout(()=>{
              this.$refs.img2.style.display = 'inline-block';
          },1000);
      },
      playAudio(){
        let ado = document.getElementById("audioPlay");
          if (this.isPlayAudio) {
              this.isPlayAudio = false;
              ado.pause();
              this.playPauseAnimate();
          } else {
              this.isPlayAudio = true;
              ado.play();
              window.imgA = setInterval(()=>{
                  this.playAnimate();
              },1500)
          }
      }
    }
}
</script>

<style lang='less'>
@import url(../assets/css/main.less);
@import url(../assets/css/common.less);
@deepBlue:#388cc8;
@lightBlue:#37a2ba;
div.card{
  .header {
      width: 100%;
      // height: 3.5rem;
      border-radius:5px;
      overflow:hidden;
      background: linear-gradient(to right, #478ac4, #3aa7c1);
      position: relative;
      .header-top {
          position: absolute;
          right: 0.3rem;
          top: 0.3rem;
          padding: 0.08rem 0.04rem;
          justify-content: space-around;
          width: .9rem;
          display: flex;
          border: 1px solid #c4dcef;
          border-radius: 5px;
          color: #fefeff;
          .radio-broadcast {
              width: 6em;
              box-sizing:border-box;
              position: absolute;
              bottom: -0.5rem;
              right: 0rem;
              background: #48add9;
              height:1.5em;
              border-radius: 7px;
              color: #e7f2f9;
              audio {
                  width: 0.4rem;
              }
              span {
                  vertical-align: middle;
              }
              div.trumpet{
                  text-align:left;height:1.5em;padding:0 .5em;line-height:1.5;min-width:1.3em;
              }
              img {
                  vertical-align: middle;height:60%;
                  &:first-child{
                    margin-top:-.2em;
                  }
                  &.middle{
                      height:40%;
                      
                  }
                  &:nth-child(2){
                    margin-top:-.2em;
                      margin-left:-.2em;
                  }
                  &:last-child{
                    margin-top:-.25em;
                      margin-left:-.25em;
                      // margin-top:-.1em;
                      height:90%;
                  }
              }
          }
          p {
              text-align: center;
              line-height: 0.33rem;
              font-size: 0.25rem;
          }
      }
      .header-user {
          padding: 1rem 0.25rem .5rem;
          color: #fefeff;
          dl {
              display: flex;
              dt {
                  width: 1.6rem;
                  height: 1.6rem;
                  
                  overflow: hidden;
                  img {
                      width: 100%;
                      border: 1px solid #43b8d8;
                      border-radius: 10em;
                  }
              }
              dd {
                  margin-top: 0.35rem;
                  padding-left: 0.2rem;
                  font-size: 0.29rem;
                  .user-company{
                      line-height: .35rem;
                  }
                  .value-counten {
                      position: relative;
                      margin-top: 0.35rem;
                      // z-index: 22;
                      border-radius: 7px;
                      overflow: hidden;
                      background: #43b8d8;
                      input {
                          background: #43b8d8;
                          color: #fff;
                          display: inline-block;
                          padding: 0.05rem 0.6rem 0.05rem 0.15rem;
                          overflow: hidden;
                          // width: 3.8rem;
                          text-overflow: ellipsis;
                          white-space: nowrap;
                          border:none;
                      }
                      img {
                          position: absolute;
                          z-index: 11;
                          height: 100%;
                          width: auto;
                          right: 0.1rem;
                      }
                  }
                  h6 {
                      font-size: 0.37rem;
                      margin-bottom: 0.1rem;
                      font-weight:100;
                  }
              }
          }
      }
  }
}
</style>