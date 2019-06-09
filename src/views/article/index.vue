<template>
  <div class="app-container">
    <eHeader :query="query"/>
    <!--表格渲染-->
    <el-table v-loading="loading" :data="data" size="small" style="width: 100%;">
      <el-table-column prop="articleType" label="文章类型">
        <template slot-scope="scope">
          <div v-for="item in article_type" :key="item.id">
            <span v-if="item.id==scope.row.articleType+''">{{ item.label }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="articleTitle" label="文章标题"/>
      <el-table-column prop="creatTime" label="creatTime">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.creatTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="modifyTime" label="modifyTime">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.modifyTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="articleStatus" label="文章状态">
        <template slot-scope="scope">
          <div v-for="item in article_status" :key="item.id">
            <el-tag v-if="item.id==scope.row.articleStatus+''" :type=" item.value === 'false' ? 'info' : 'success'">{{ item.label }}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="username" label="用户名"/>
      <el-table-column prop="sourceType" label="来源类型">
        <template slot-scope="scope">
          <div v-for="item in source_type" :key="item.id">
            <span v-if="item.id==scope.row.sourceType+''">{{ item.label }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column v-if="checkPermission(['ADMIN','ARTICLE_ALL','ARTICLE_EDIT','ARTICLE_DELETE'])" label="操作" width="150px" align="center">
        <template slot-scope="scope">
          <!-- 编辑 -->
          <router-link
            v-permission="['ADMIN','ARTICLE_ALL','ARTICLE_EDIT']"
            :to="'add/'+scope.row.id"
            class="filter-item"
            size="mini"
            type="primary"
            icon="el-icon-plus">
            <el-button type="primary" size="mini" icon="el-icon-edit">编辑</el-button>
          </router-link>
          <edit v-permission="['ADMIN','ARTICLE_ALL','ARTICLE_EDIT']" :data="scope.row" :sup_this="sup_this"/>
          <el-popover
            v-permission="['ADMIN','ARTICLE_ALL','ARTICLE_DELETE']"
            :ref="scope.row.id"
            placement="top"
            width="180">
            <p>确定删除本条数据吗？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="$refs[scope.row.id].doClose()">取消</el-button>
              <el-button :loading="delLoading" type="primary" size="mini" @click="subDelete(scope.row.id)">确定</el-button>
            </div>
            <el-button slot="reference" type="danger" icon="el-icon-delete" size="mini"/>
          </el-popover>
        </template>
      </el-table-column>
    </el-table>
    <!--分页组件-->
    <el-pagination
      :total="total"
      style="margin-top: 8px;"
      layout="total, prev, pager, next, sizes"
      @size-change="sizeChange"
      @current-change="pageChange"/>
  </div>
</template>

<script>
import { get } from '@/api/dictDetail'
import checkPermission from '@/utils/permission'
import initData from '@/mixins/initData'
import { del } from '@/api/article'
import { parseTime } from '@/utils/index'
import eHeader from './module/header'
export default {
  components: { eHeader },
  mixins: [initData],
  data() {
    return {
      delLoading: false, sup_this: this,
      article_status: [],
      article_type: [],
      source_type: []
    }
  },
  created() {
    this.$nextTick(() => {
      this.init()
      this.getSelectData()
    })
  },
  methods: {
    getSelectData() {
      get('article_status').then(res => {
        this.article_status = res.content
      })
      get('article_type').then(res => {
        this.article_type = res.content
      })
      get('source_type').then(res => {
        this.source_type = res.content
      })
    },
    parseTime,
    checkPermission,
    beforeInit() {
      this.url = 'api/article'
      const sort = 'id,desc'
      this.params = { page: this.page, size: this.size, sort: sort }
      const query = this.query
      const type = query.type
      const value = query.value
      const articleStatus = query.articleStatus
      const articleType = query.articleType
      const sourceType = query.sourceType
      if (articleStatus) { this.params['articleStatus'] = articleStatus }
      if (articleType) { this.params['articleType'] = articleType }
      if (sourceType) { this.params['sourceType'] = sourceType }
      if (type && value) { this.params[type] = value }
      return true
    },
    subDelete(id) {
      this.delLoading = true
      del(id).then(res => {
        this.delLoading = false
        this.$refs[id].doClose()
        this.init()
        this.$notify({
          title: '删除成功',
          type: 'success',
          duration: 2500
        })
      }).catch(err => {
        this.delLoading = false
        this.$refs[id].doClose()
        console.log(err.response.data.message)
      })
    }
  }
}
</script>

<style scoped>

</style>
