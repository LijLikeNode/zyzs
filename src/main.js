// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import "babel-polyfill";
// require('./assets/util/vconsole.js');
// import './assets/js/polyfill.min.js';
import Vue from 'vue';
import App from './App';
import store from './store';
import router from './router';
import './assets/js/jquery.min.js';

// import './assets/css/mpicker.css'
// import './assets/js/mPicker.js'
import common from './api/common'
import ax from './api/server';
import rq from './api/urlString';
import pop from './popalert/popalert';
import 'vue-ydui/dist/ydui.flexible.js';
import {Tab, TabPanel} from 'vue-ydui/dist/lib.rem/tab';
/* 使用px：import {CellGroup, CellItem} from 'vue-ydui/dist/lib.px/cell'; */

Vue.component(Tab.name, Tab);
Vue.component(TabPanel.name, TabPanel);
import 'vue-ydui/dist/ydui.base.css';

import './assets/js/noshare';
import './assets/js/weChat_share.js';
// import {DateTime} from 'vue-ydui/dist/lib.rem/datetime';
//import VConsole from 'vconsole/dist/vconsole.min.js' //import vconsole
// let vConsole = new VConsole() // 初始化

Vue.config.productionTip = false;

// console.log(QRCode)
// console.log(vConsole)
Vue.prototype.ax = ax;

window.ax=ax;
// Vue.prototype.QRCode = QRCode;
Vue.prototype.urlString = rq;
window.common = common;
window.popalert = pop;
/* eslint-disable no-new */

// listener.back();
const historyStack = {
    data: {
        history: [],
        forward: true
    },
    watch: {
        '$route' (to, from) {
            document.title=to.meta.txt;


            if(this.history.length > 0 && to.path == this.history[this.history.length - 1]){
                this.forward = false;
                this.history.pop();
            }else{
                this.forward = true;
                this.history.push(from.path);
            }


            if(to.name=='detailn'){

              let isIphone = navigator.userAgent.includes('iPhone');
              if(isIphone){
                window.location.reload();
              }
            }
            
        }
    }
};


new Vue({
  el: '#app',
  router,
  store,
  mixins: [historyStack],
  template: '<App :forward="forward"/>',
  components: { App }
})
