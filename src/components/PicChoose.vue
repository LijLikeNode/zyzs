<template>
  <div class="maskgray">
  	<div class="panel">
      <h2>选择添加选项</h2>
      <ul>
        <li @click="tab=1"><span :class='[{"active":tab==1}]'></span>微名片</li>
        <li @click="tab=2"><span :class='[{"active":tab==2}]'></span>微信计划书</li>
        <li class="short" v-if="tab==2" v-for="(val,i) in planList" @click="clk(val.plan_id,val.plan_url)"><span :class='[{"active":tab_plan==val.plan_id}]'></span>{{val.plan_name}}</li>
        <li @click="tab=3"><span :class='[{"active":tab==3}]'></span>微投产品链接</li>
        <li class="short" v-if="tab==3" v-for="(val,i) in productList" @click="clk1(val.product_code,val.immediately_insure_url)"><span :class='[{"active":tab_product==val.product_code}]'></span>{{val.product_name}}</li>
      </ul>
      <a @click="addPlan">确认添加</a>
      <i @click="$emit('close')"></i>
    </div>
  </div>
</template>
<script>
export default {
    name: 'plan',
    data(){
      return {
        tab:'',
        tab_plan:'',
        tab_product:'',
        plan_url:'',
        product_url:'',
        final_url:''
      }
    },
    props:['userid'],
    created(){
      
    },
    watch:{
      tab:{
        handler(newVal){
          newVal==2?this.requestPlan():newVal==3?this.requestProduct():"";
        }
      },
    },
    mounted(){
      
    },
    computed:{
      planList(){
        return this.$store.state.planList;
      },
      productList(){
        return this.$store.state.productList;
      }
    },
    methods:{
      
      clk(id,url){
        this.tab_plan = id;
        this.plan_url = url;
      },
      clk1(id,url){
        this.tab_product = id;
        this.product_url = url;
      },
      addPlan(){
        //生成二维码

        if(this.tab==''){
          popalert.fade('请添加选项');
          return;
        }

        if(this.tab==2){
          if(this.tab_plan==''){
            popalert.fade('请添加计划书');
            return;
          }
        }

        if(this.tab==3){
          if(this.tab_products==''){
            popalert.fade('请添加产品链接');
            return;
          }
        }


        if(this.tab==1){
          this.final_url = 'http://zmt.ihxlife.com/hportal_zj/home/shareIndex.do?userid='+this.userid;
        }else if(this.tab==2){
          this.final_url = this.plan_url;
        }else{
          this.final_url = this.product_url+'&sales_agent='+this.userid;
        }
        this.$emit('getUrl',this.final_url);

      },
      requestPlan(){
        if(this.$store.state.planList.length>0) return;
        this.ax('queryPlan.do',{}).then(res=>{
          this.$store.state.planList = {...res.planList};
        })
      },
      requestProduct(){
        if(this.$store.state.productList.length>0) return;
        this.ax('queryProduct.do',{'userid':this.userid}).then(res=>{
          this.$store.state.productList = {...res.proList};
        })
      },
    }
}
</script>

<style lang='less' scoped>
@import url(../assets/css/main.less);
// @import url(../assets/css/common.less);
div.panel{
  position:absolute;top:50%;left:5%;width:90%;background: #fff;border-radius: 5px;transform:translateY(-50%);
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
      &.short{
        margin-left: 4.8em;
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