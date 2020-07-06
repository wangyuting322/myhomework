<template>
  <div>
    <!-- 整体布局 -->
    <a-layout id="layout_wrapper">
      <!-- 左侧边栏 -->
      <a-layout-sider v-model="collapsed" :trigger="null" collapsible>
        <div class="logo">
          <span v-if="collapsed">旭博 </span>
          <span v-else>旭博检测有限公司 </span>
        </div>
        <a-menu theme="dark" mode="inline">
          <a-sub-menu :key="item.id" v-for="item in menuList" >
            <span slot="title"
              ><a-icon type="appstore" /><span>{{item.authName }}</span></span
            >
            <a-menu-item :key="listitem.path"  v-for="listitem in item.children" @click="goRoute(listitem.path)">
          {{listitem.authName }}
            </a-menu-item>
          </a-sub-menu>
        </a-menu>
      </a-layout-sider>
      <a-layout>
        <a-layout-header class="layout-header">
          <!-- 伸缩 -->
          <a-icon
            class="trigger"
            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            @click="() => (collapsed = !collapsed)"
          />
          <!-- 登录状态 -->
          <a-dropdown>
            <a class="ant-dropdown-link" @click="(e) => e.preventDefault()">
              <!-- {{ this.$route.params.username }} -->
              {{ this.$route.query.username }}
              <a-icon type="down" />
            </a>
            <a-menu slot="overlay">
              <a-menu-item @click="loginOut">
                <a href="javascript:;">退出登录</a>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </a-layout-header>
        <a-layout-content>
          <router-view></router-view>
        </a-layout-content>
        
      </a-layout>
    </a-layout>
  </div>
</template>
<script>
import{getmenulist} from 'network/home.js'
export default {
  name: "Home",
  data() {
    return {
      menuList:[],
      collapsed: false,
    };
  },
  created(){

      getmenulist().then(res => {
        console.log('getmenuList', res)
        if(res.meta.status !==200)return ;
        this.menuList = res.data
      })
    
  },
  methods: {
    loginOut() {
      // 清空token值
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
    goRoute(path){
console.log(path);
this.$router.push('/'+path)


    }
  },
};
</script>
<style lang="scss" scoped>
// 隐藏滚动条
@mixin scrollbar {
  &::-webkit-scrollbar {
    display: none;
  }
  // &::-webkit-scrollbar {
  //   /*滚动条整体样式*/
  //   width: 5px; /*高宽分别对应横竖滚动条的尺寸*/
  //   height: 1px;
  // }
  // &::-webkit-scrollbar-thumb {
  //   /*滚动条里面小方块*/
  //   border-radius: 10px;
  //   -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  //   background: #535353;
  // }
  // &::-webkit-scrollbar-track {
  //   /*滚动条里面轨道*/
  //   -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  //   border-radius: 10px;
  //   background: #ededed;
  // }
}

#layout_wrapper {
  height: 100vh;

  .ant-layout-sider{
    height: 100vh;
overflow: auto;
      position: relative;
      left: 0;
 @include scrollbar;
    .logo {
      height: 32px;
      background: rgba(255, 255, 255, 0.2);
      margin: 16px;
      text-align: center;
      line-height: 32px;
      color: white;
    }
   
  }
  .ant-layout-header {
    display: flex;
    padding: 0px 10px;
    position: relative;
    justify-content: space-between;
    .trigger {
      font-size: 18px;
      line-height: 64px;
      cursor: pointer;
      transition: color 0.3s;
      color: white;
      width: 15px;
    }
  }
}
</style>
