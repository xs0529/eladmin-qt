<template>
  <div class="head-container">
    <!-- 搜索 -->
    <el-input v-model="query.value" clearable placeholder="输入搜索内容" style="width: 200px;" class="filter-item" @keyup.enter.native="toQuery"/>
    <el-select v-model="query.type" clearable placeholder="类型" class="filter-item" style="width: 130px">
      <el-option v-for="item in queryTypeOptions" :key="item.key" :label="item.display_name" :value="item.key"/>
    </el-select>
    <el-select v-model="query.articleType" clearable placeholder="文章类型" class="filter-item" style="width: 120px" @change="toQuery">
      <el-option v-for="item in article_type" :key="item.id" :label="item.label" :value="item.id"/>
    </el-select>
    <el-select v-model="query.articleStatus" clearable placeholder="状态" class="filter-item" style="width: 100px" @change="toQuery">
      <el-option v-for="item in article_status" :key="item.id" :label="item.label" :value="item.id"/>
    </el-select>
    <el-select v-model="query.sourceType" clearable placeholder="来源类型" class="filter-item" style="width: 150px" @change="toQuery">
      <el-option v-for="item in source_type" :key="item.id" :label="item.label" :value="item.id"/>
    </el-select>
    <el-button class="filter-item" size="mini" type="success" icon="el-icon-search" @click="toQuery">搜索</el-button>
    <!-- 新增 -->
    <router-link
      v-permission="['ADMIN','ARTICLE_ALL','ARTICLE_CREATE']"
      class="filter-item"
      size="mini"
      type="primary"
      icon="el-icon-plus"
      to="add/0">
      <el-button type="primary" size="mini" style="width: 100px;margin-left: 10px" icon="el-icon-edit">新增文章</el-button>
    </router-link>
  </div>
</template>

<script>
import { get } from '@/api/dictDetail'
import initDict from '@/mixins/initDict'
export default {
  mixins: [initDict],
  props: {
    query: {
      type: Object,
      required: true,
      articleStatus: null,
      articleType: null,
      sourceType: null
    }
  },
  data() {
    return {
      queryTypeOptions: [
        { key: 'articleTitle', display_name: '文章标题' },
        { key: 'username', display_name: '用户名' }
      ],
      article_status: [],
      article_type: [],
      source_type: []
    }
  },
  created() {
    this.$nextTick(() => {
      this.getSelectData()
    })
  },
  methods: {
    toQuery() {
      this.$parent.page = 0
      this.$parent.init()
    },
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
    }
  }
}
</script>
