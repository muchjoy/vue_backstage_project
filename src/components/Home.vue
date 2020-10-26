<template>

  <el-container class="home-container">
    <!--头部-->
    <el-header>
      <div>
        <img src="~@/assets/heima.png" alt="">
        <span>电商管理后台</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <!--主体-->
    <el-container>
      <!-- 侧边 -->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="btnCollapse" @click="buttonCollpase">|||</div>
        <el-menu
          class="el-menu-vertical-demo"
          background-color="#333744"
          text-color="#fff"
          unique-opened
          :collapse="isCollapse"
          :collapse-transition="false"
          router
          active-text-color="#409eff"
          :default-active="activePath"
        >
          <el-submenu :index="item.id+''" v-for="item in menus" :key="item.id">
            <!--一级菜单-->
            <template slot="title">
              <!--图标-->
              <i :class="iconsObj[item.id]"></i>
              <!--文本-->
              <span>{{ item.authName }}</span>
            </template>
            <!--二级菜单-->
            <el-menu-item
              :index="'/'+child.path"
              v-for="child in item.children"
              :key="child.id"
              @click="toActivePath('/'+child.path)"
            >
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>{{ child.authName }}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右侧主体 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { getMenus } from '@/network/home/menus'

export default {
  name: 'Home',
  data () {
    return {
      menus: [],
      iconsObj: {
        125: 'iconfont icon-user1',
        103: 'iconfont icon-tijikongjian',
        101: 'iconfont icon-psi-',
        102: 'iconfont icon-danju',
        145: 'iconfont icon-baobiao'
      },
      isCollapse: false,
      activePath: ''
    }
  },
  mounted () {
    this.getMenuDate()
    this.activePath = window.sessionStorage.getItem('active')
  },
  methods: {
    // 退出登陆
    logout () {
      window.sessionStorage.removeItem('token')
      window.sessionStorage.removeItem('active')
      this.$router.push('/login')
    },
    async getMenuDate () {
      try {
        const res = await getMenus()
        if (res.meta.status !== 200) {
          this.$message.error(`${res.meta.msg}`)
        }
        this.menus = res.data
      } catch (e) {
        this.$message.error(e)
      }
    },
    buttonCollpase () {
      this.isCollapse = !this.isCollapse
    },
    toActivePath (active) {
      window.sessionStorage.setItem('active', active)
      this.activePath = active
    }
  }
}
</script>

<style scoped lang="less">
.home-container {
  height: 100%;
}
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #ffff;
  padding-left: 0;
  font-size: 20px;
  div {
    display: flex;
    align-items: center;
  }
  span {
    margin-left: 15px;
  }
}
.el-aside {
  background-color: #333744;
  .el-menu {
    border-right: none;
  }
}
.el-main {
  background-color: #eaedf1;
}
.btnCollapse {
  font-size: 10px;
  color: #ffffff;
  line-height: 24px;
  text-align: center;
  background-color: #4a5064;
  cursor:pointer;
  letter-spacing: 0.2em;
}
</style>
