<template>
  <div>
    <!--面包屑-->
    <breadcrumb secondLevel="权限管理" thirdLevel="角色列表"></breadcrumb>
    <!--卡片-->
    <el-card>
      <!-- 点击添加用户 editModular组件 size传空字符串会显示默认大小-->
      <edit-modular
        type="primary"
        title="添加角色"
        content="添加角色"
        size=""
        @ConfirmStatus="addUserPower"
      >
        <template #formInput>
          <edit-roles-form ref="formUserInfo"></edit-roles-form>
        </template>
      </edit-modular>
      <!--表格-->
      <el-table :data="userPowerList" border stripe >
        <!--展开列-->
        <el-table-column type="expand">
          <template v-slot="scope">
            <el-row v-for="(item1, i1) in scope.row.children" :key="i1" :class="{ 'bdtop': i1 === 0 }" class='bdbottom vcenter'>
              <!--一级权限-->
              <el-col :span="5">
                <el-tag closable>{{ item1.authName }}</el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <!--二级和三级权限-->
              <el-col :span="19">
                <el-row v-for="(item2, i2) in item1.children" :key="i2" :class="{'bdtop': i2 !== 0}" class="vcenter">
                  <el-col :span="6">
                    <el-tag type="success" closable>{{ item2.authName }}</el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <el-col :span="18">
                    <el-tag closable type="warning" v-for="(item3, i3) in item2.children" :key="i3" @close="removePowerById(scope.row, item3.id)">{{ item3.authName }}</el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <!--索引-->
        <el-table-column type="index" align="center"></el-table-column>
        <el-table-column prop="roleName" label="角色名称" align="center"></el-table-column>
        <el-table-column prop="roleDesc" label="角色描述" align="center"></el-table-column>
        <el-table-column label="操作" align="center" width="300px">
          <template v-slot="scope">
            <!--编辑功能按钮  使用editForm组件-->
            <edit-modular
              type="primary"
              icon="el-icon-edit"
              content="编辑"
              title="修改角色"
              @ConfirmStatus="confirmHandle(scope.row.id)"
              @OpenHandler="getEditUser(scope.row.id)"
            >
              <template #formInput>
                <edit-roles-form ref="formInfo" :powerInfo="powerInfo"></edit-roles-form>
              </template>
            </edit-modular>
            <!--删除功能按钮-->
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeRightById(scope.row.id)">删除</el-button>
            <!--分配权限按钮-->
            <edit-modular
              type="warning"
              icon="el-icon-setting"
              title="分配权限"
              content="分配权限"
              @OpenHandler="getPowerTree(scope.row)"
              @dialogChange="dialogCloseHandle"
              @ConfirmStatus="addPowerUser"
            >
              <template #formInput>
                <!--树形-->
                <el-tree
                  :data="treeList"
                  :props="defaultProps"
                  show-checkbox
                  node-key="id"
                  default-expand-all
                  :default-checked-keys="defaultKeysArr"
                  ref="treeRef"
                ></el-tree>
              </template>
            </edit-modular>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { userLsit, editPowerUser, userPower, deletePowerUser, getAllTree, addUserInfo, addUserPower, deleteUserPower } from '@/network/power/rights'

import editRolesForm from '@/components/power/FormInput/editRolesForm'

export default {
  name: 'roles',
  components: {
    editRolesForm
  },
  data () {
    return {
      userPowerList: [],
      powerInfo: {},
      // 所有权限 树形请求数据
      treeList: [],
      // 树形控件的属性绑定对象
      defaultProps: {
        label: 'authName',
        children: 'children'
      },
      // 默认展开的节点的 key 的数组
      defaultKeysArr: [],
      // 用户id
      roleId: null
    }
  },
  mounted () {
    this.getUserList()
  },
  methods: {
    // 发送请求获取角色列表
    async getUserList () {
      const res = await userLsit()
      try {
        if (res.meta.status !== 200) {
          return this.$message.error(`${res.meta.msg}`)
        }
        this.userPowerList = res.data
      } catch (e) {
        this.$message.error(e)
      }
    },
    // 添加角色
    async addUserPower () {
      const user = this.$refs.formUserInfo.powerInfo
      const { meta } = await addUserInfo(user)
      try {
        if (meta.status !== 201) {
          return this.$message.error(`${meta.msg}`)
        }
        this.$message.success(`${meta.msg}`)
        await this.getUserList()
      } catch (e) {
        this.$message.error(e)
      }
    },
    // 根据id获取角色
    async getEditUser (id) {
      const res = await userPower(id)
      try {
        if (res.meta.status !== 200) {
          this.$message.error('获取角色失败')
        }
        this.powerInfo = res.data
      } catch (e) {
        this.$message.error(e)
      }
    },
    // 编辑提交
    async confirmHandle (val) {
      const info = this.$refs.formInfo.editPowerList
      const res = await editPowerUser(val, info)
      try {
        if (res.meta.status !== 200) {
          this.$message.error('修改角色失败')
        }
        this.$message.success('修改角色成功')
        await this.getUserList()
      } catch (e) {
        this.$message.error(e)
      }
    },
    // 删除用户
    async removeRightById (id) {
      const confirmInfo = await this.$confirm(
        '此操作将永久删除该文件, 是否继续?', '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch(err => err)
      if (confirmInfo !== 'confirm') {
        return this.$message.info('已取消删除')
      }
      const res = await deletePowerUser(id)
      try {
        if (res.meta.status !== 200) {
          this.$message.error('删除用户失败')
        }
        this.$message.success(`${res.meta.msg}`)
        await this.getUserList()
      } catch (e) {
        this.$message.error(e)
      }
    },
    // 删除角色指定权限
    async removePowerById (roleId, rightId) {
      const confirmInfo = await this.$confirm(
        '此操作将永久删除该文件, 是否继续?', '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch(err => err)
      if (confirmInfo !== 'confirm') {
        return this.$message.info('已取消删除')
      }
      console.log(roleId, rightId)
      const { meta, data } = await deleteUserPower(roleId.id, rightId)
      try {
        if (meta.status !== 200) {
          return this.$message.error(`${meta.msg}`)
        }
        this.$message.success(`${meta.msg}`)
        roleId.children = data
      } catch (e) {
        this.$message.error(e)
      }
    },
    // 所有权限列表 树形
    async getPowerTree (val) {
      // 将角色的id 保存到data中
      this.roleId = val.id
      // 获取所有三级的id
      this.getChildrenKeys(val, this.defaultKeysArr)
      const res = await getAllTree()
      try {
        if (res.meta.status !== 200) {
          return this.$message.error(`${res.meta.msg}`)
        }
        this.treeList = res.data
        console.log(this.defaultKeysArr)
      } catch (e) {
        this.$message.error(e)
      }
    },
    // 角色授权
    async addPowerUser () {
      const rids = [
        ...this.$refs.treeRef.getCheckedKeys(),
        ...this.$refs.treeRef.getHalfCheckedKeys()
      ]
      const StrRids = rids.join(',')
      const { meta } = await addUserPower(this.roleId, StrRids)
      try {
        if (meta.status !== 200) {
          return this.$message.error('分配权限失败')
        }
        this.$message.error('分配权限成功')
      } catch (e) {
        this.$message.error(e)
      }
    },
    // 递归 获取所有三级权限id
    getChildrenKeys (node, arr) {
      // 如果当前节点不包括子节点, 那么就是三级节点, 将当前的节点id存入数组中
      if (!node.children) {
        return  arr.push(node.id)
      }
      // 如果包含子节点, 则循环 , 递归
      node.children.forEach(item => {
        this.getChildrenKeys(item, arr)
      })
    },
    // 分配弹层关闭触发事件
    dialogCloseHandle () {
      this.defaultKeysArr = []
    },
  }
}
</script>

<style scoped>
  .el-tag {
    margin: 7px;
  }
  .bdtop {
    border-top: 1px solid #eeeeee;
  }
  .bdbottom {
    border-bottom: 1px solid #eeeeee;
  }
  .vcenter {
    display: flex;
    align-items: center;
  }
</style>
