<template>
  <div>
    <!--面包屑-->
    <breadcrumb secondLevel="商品管理" thirdLevel="添加商品"></breadcrumb>
      <!--卡片区-->
    <el-card>
      <!--消息提示-->
      <el-alert
        title="添加商品信息"
        type="info"
        center
        :closable="false"
        show-icon>
      </el-alert>
      <!-- 步骤条 -->
      <el-steps :space="200" :active="+activeIndex" finish-status="success" align-center>
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>

      <!-- tab栏 -->
      <el-form :model="tabDataList" :rules="tabFormRules" ref="goodsInfoForm" label-width="100px" class="demo-ruleForm" label-position="top">
        <el-tabs :tab-position="'left'" v-model="activeIndex" :before-leave="tabBeforeLeave" @tab-click="tabClick">
          <!--基本信息-->
          <el-tab-pane label="基本信息" name="0">
            <el-form-item label="商品名称" prop="goods_name">
              <el-input v-model="tabDataList.goods_name"></el-input>
            </el-form-item>
            <el-form-item label="商品价格" prop="goods_price">
              <el-input v-model="tabDataList.goods_price" type="number"></el-input>
            </el-form-item>
            <el-form-item label="商品重量" prop="goods_weight">
              <el-input v-model="tabDataList.goods_weight" type="number"></el-input>
            </el-form-item>
            <el-form-item label="商品数量" prop="goods_number">
              <el-input v-model="tabDataList.goods_number" type="number"></el-input>
            </el-form-item>
            <el-form-item label="商品分类" prop="goods_cat">
              <el-cascader
                v-model="tabDataList.goods_cat"
                :options="goodsList"
                expandTrigger="hover"
                :props="cateProps"
                @change="handleChange"
                clearable
              ></el-cascader>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品参数" name="1">
            <el-form-item v-for="item in manyData" :key="item.attr_id" :label="item.attr_name">
              <el-checkbox v-model="item.attr_vals" v-for="(item2, i2) in item.attr_vals" :key="i2" :label="item2" border></el-checkbox>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品属性" name="2">
            <el-form-item v-for="item in onlyData" :key="item.attr_id" :label="item.attr_name">
              <el-input v-model="item.attr_vals"></el-input>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品图片" name="3">
            <el-upload
              :action="uploadURL"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :on-success="handleSuccess"
              :headers="headersObj"
              list-type="picture">
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-tab-pane>
          <el-tab-pane label="商品内容" name="4">
            <quill-editor
            v-model="tabDataList.goods_introduce"
            ></quill-editor>
            <el-button type="primary" class="addBtn" @click="addGoods">添加商品</el-button>
          </el-tab-pane>
        </el-tabs>
      </el-form>
    </el-card>
    <!-- 图片预览窗口 -->
    <el-dialog
      title="图片预览"
      :visible.sync="dialogVisible"
      width="50%"
      >
      <span slot="footer" class="dialog-footer">
        <img :src="previewPath" alt="" class="previewImg">
      </span>
    </el-dialog>
  </div>
</template>

<script>
// 请求
import { getGoodsList, getManyDataList, addGoodsData } from '@/network/goods/goods'

import _ from 'lodash'

export default {
  name: 'addGoods',
  data () {
    return {
      activeIndex: '0',
      // tab栏数据
      tabDataList: {
        goods_name: '',
        goods_price: 0,
        goods_weight: 0,
        goods_number: 0,
        goods_cat: '',
        pics: [],
        goods_introduce: '',
        attrs: []
      },
      // from表单验证
      tabFormRules: {
        goods_name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' }
        ],
        goods_price: [
          { required: true, message: '请输入商品价格', trigger: 'blur' }
        ],
        goods_number: [
          { required: true, message: '请输入商品数量', trigger: 'blur' }
        ],
        goods_weight: [
          { required: true, message: '请输入商品重量', trigger: 'blur' }
        ]
      },
      // 商品分类数据
      goodsList: [],
      // 级联选择器配置
      cateProps: {
        value: 'cat_id',
        label: 'cat_name',
        children: 'children'
      },
      // 动态参数数据
      manyData: [],
      // 静态属性
      onlyData: [],
      // 上传地址
      uploadURL: 'http://www.gx-blog.com:8888/api/private/v1/upload',
      headersObj: {
        Authorization: window.sessionStorage.getItem('token')
      },
      // 图片预览地址
      previewPath: '',
      // 是否打开弹层
      dialogVisible: false
    }
  },
  mounted () {
    this.getGoods()
  },
  methods: {
    // 获取商品分类列表
    async getGoods () {
      const { meta, data } = await getGoodsList()
      try {
        if (meta.status !== 200) {
          return this.$message.error('获取商品数据失败')
        }
        this.goodsList = data
      } catch (e) {
        this.$message.error(e)
      }
    },
    // 切换tab到动态参数
    async tabClick () {
      // 判断是否到动态参数栏
      if (this.activeIndex === '1') {
        const { meta, data } = await getManyDataList(this.cateId, 'many')
        try {
          if (meta.status !== 200) {
            return this.$message.error('获取参数失败')
          }
          // 将获得的数据进行处理
          data.forEach(item => {
            item.attr_vals = item.attr_vals ? item.attr_vals.split(' ') : []
          })
          this.manyData = data
        } catch (e) {
          this.$message.error(e)
        }
      } else if (this.activeIndex === '2') {
        const { meta, data } = await getManyDataList(this.cateId, 'only')
        try {
          if (meta.status !== 200) {
            return this.$message.error('获取参数失败')
          }
          this.onlyData = data
        } catch (e) {
          this.$message.error(e)
        }
      }
    },
    // 添加商品
    addGoods () {
      this.$refs.goodsInfoForm.validate(async valid => {
        if (!valid) {
          return this.$message.error('添加商品失败')
        }
        const from = _.cloneDeep(this.tabDataList)
        from.goods_cat = from.goods_cat.join(',')
        // 处理商品参数
        this.manyData.forEach(item => {
          const newInfo = {
            attr_id: item.attr_id,
            attr_value: item.attr_vals
          }
          this.tabDataList.attrs.push(newInfo)
        })
        // 静态属性
        this.onlyData.forEach(item => {
          const newInfo = {
            attr_id: item.attr_id,
            attr_value: item.attr_vals
          }
          this.tabDataList.attrs.push(newInfo)
        })
        // 将tabDataList中的attrs赋值给from中的attrs
        from.attrs = this.tabDataList.attrs
        // 发送请求
        const { meta } = await addGoodsData(from)
        try {
          if (meta.status !== 201) {
            return this.$message.error(meta.msg)
          }
          this.$message.success(meta.msg)
          await this.$router.push('/goods')
        } catch (e) {
          this.$message.error(e)
        }
      })
    },
    // 级联触发
    handleChange () {
      if (this.tabDataList.goods_cat.length !== 3) {
        this.tabDataList.goods_cat = []
      }
    },
    // tab切换标签之前的钩子处理函数
    tabBeforeLeave (activeName, oldActiveName) {
      if (oldActiveName === '0' && this.tabDataList.goods_cat.length !== 3) {
        this.$message.error('请选择商品分类')
        return false
      }
    },
    // 图片预览
    handlePreview (file) {
      this.previewPath = 'http://www.gx-blog.com:8888/' + file.response.data.tmp_path
      this.dialogVisible = true
    },
    // 移除图片
    handleRemove (file) {
      const removePath = file.response.data.tmp_path
      const i = this.tabDataList.pics.findIndex(item => item.pic === removePath)
      this.tabDataList.pics.splice(i, 1)
    },
    // 文件 上传成功的钩子处理
    handleSuccess (response) {
      // 拼接数据
      const picsObj = { pic: response.data.tmp_path }
      // 将数据追加到
      this.tabDataList.pics.push(picsObj)
    }
  },
  computed: {
    cateId () {
      if (this.tabDataList.goods_cat.length === 3) {
        return this.tabDataList.goods_cat[2]
      }
      return null
    }
  }
}
</script>

<style scoped lang="less">
.el-checkbox {
  margin: 0 10px 0 0 !important;
}
.previewImg {
  width: 100%;
}
.addBtn {
  margin-top: 15px;
}
.ql-editor {
  min-height: 300px !important;
}
</style>
