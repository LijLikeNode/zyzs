import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/view/Index';
import PublicAticle from '@/view/PublicAticle';
import DetailNoEdit from '@/view/DetailNoEdit';
import DetailEdit from '@/view/DetailEdit';
import EditImg from '@/view/EditImg';
import PicList from '@/view/PicList';
Vue.use(Router)

 const router = new Router({   // 回滚
  scrollBehavior (to, from, savedPosition){
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index,
      meta:{txt:'展业助手'}
    },
    {
      path: '/article/:userid',
      name: 'article',
      component: PublicAticle,
      meta:{txt:'已发文章'}
    },
    {
      path: '/details/:id/:userid',
      name: 'detailn',
      component: DetailNoEdit,
      meta:{txt:'详情'}
    },
    {
      path: '/detail/:id/:userid',
      name: 'detail',
      component: DetailEdit,
      meta:{txt:'详情'}
    },
    {
      path: '/editimg/:id/:userid',
      name: 'editimg',
      component: EditImg,
      meta:{txt:'图片详情'}
    },
    {
      path: '/publicimg/:userid',
      name: 'publicimg',
      component: PicList,
      meta:{txt:'已发图片'}
    },
  ]
});

router.beforeEach((to, from, next) => {
  if (to.meta.txt) {
    document.title = to.meta.txt;
  }
  next();
});
export default router;