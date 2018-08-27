<template>
  <div class="maskgray">
  	<div class="panel">
      <h2>微信计划书列表</h2>
      <ul>
        <li v-for="(val,i) in list" @click="clk(val.plan_id,val.plan_url)"><span :class='[{"active":plan_id==val.plan_id}]'></span>{{val.plan_name}}</li>
      </ul>
      <a @click="addPlan">确认添加计划书</a>
      <i @click="$emit('close')"></i>
    </div>
  </div>
</template>
<script>
export default {
    name: 'plan',
    data(){
      return {
        name:'',
        plan_id:'',
        plan_url:'',
      }
    },
    props:['list','plan'],
    created(){
      
    },
    mounted(){
      this.plan_id = this.plan.plan_id;
      this.plan_url = this.plan.plan_url;
    },
    computed:{
      
    },
    methods:{
      clk(id,url){
        if(this.plan_id==id){
          this.plan_id='';
          this.plan_url='';
        }else{
          this.plan_id = id;
          this.plan_url = url;
        }
      },
      addPlan(){
        console.log(this.plan_id,this.plan_url);
        let id = this.plan_id;
        let url = this.plan_url;
        if(this.plan_id=='') popalert.fade('请选择计划书');
        else this.$emit('addPlan',id,url)
      },
    }
}
</script>

<style lang='less' scoped>
@import url(../assets/css/main.less);
// @import url(../assets/css/common.less);
div.panel{
  position:absolute;top:50%;left:5%;width:90%;background: #fff;border-radius: 5px;transform:translateY(-59%);
  padding:1em 0 2em 0;
  h2{
    width:96%;margin-left:2%;padding:0;border-bottom:1px solid #ddd;color:#000;text-align: center;font-size:1.2em;padding-bottom:.6em;display:inline-block;
  }
  ul{
    padding:1.2em;margin-bottom: 2em;
    li{
      line-height: 3;font-size:1.1em;border-bottom:1px solid #ddd;margin-left: 2.8em;position:relative;
      span{
        position:absolute;width:2em;height:2em;background:url('../assets/images/ynocheck.png') no-repeat center center;background-size:60%;left:-2.2em;top:.4em;
        &.active{
          background:url('../assets/images/ycheck.png') no-repeat center center;background-size:60%;
        }
      }
    }
  }
  a{
    display:block;width:70%;
    border-radius: 8px;
    background-image: -webkit-linear-gradient( -90deg, rgb(61,190,223) 0%, rgb(63,162,211) 63%, rgb(64,133,199) 100%);
    color:#fff;
    padding:.9em;
    text-align:center;margin:0 auto;
  }
  i{
    position:absolute;width:2em;height:2em;background:url('../assets/images/close.png') no-repeat center center ;bottom:-3em;left:50%;transform:translateX(-50%);background-size:100%;
  }
}
</style>