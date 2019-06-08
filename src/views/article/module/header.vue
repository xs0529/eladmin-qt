<template>
  <div class="head-container">
    <!-- 搜索 -->
    <el-input v-model="query.value" clearable placeholder="输入搜索内容" style="width: 200px;" class="filter-item" @keyup.enter.native="toQuery"/>
    <el-select v-model="query.type" clearable placeholder="类型" class="filter-item" style="width: 130px">
      <el-option v-for="item in queryTypeOptions" :key="item.key" :label="item.display_name" :value="item.key"/>
    </el-select>
    <el-select v-model="query.articleType" clearable placeholder="文章类型" class="filter-item" style="width: 100px" @change="toQuery">
      <el-option v-for="item in dicts" :key="item.id" :label="item.label" :value="item.id"/>
    </el-select>
    <el-button class="filter-item" size="mini" type="success" icon="el-icon-search" @click="toQuery">搜索</el-button>
    <!-- 新增 -->
    <div style="display: inline-block;margin: 0px 2px;">
      <el-button
        v-permission="['ADMIN','ARTICLE_ALL','ARTICLE_CREATE']"
        class="filter-item"
        size="mini"
        type="primary"
        icon="el-icon-plus"
        @click="$refs.form.dialog = true">新增</el-button>
      <eForm ref="form" :is-add="true"/>
    </div>
  </div>
</template>

<script>
import initDict from '@/mixins/initDict'
import eForm from './form'
export default {
  components: { eForm },
  mixins: [initDict],
  props: {
    query: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      queryTypeOptions: [
        { key: 'articleType', display_name: '文章类型' },
        { key: 'articleTitle', display_name: '文章标题' },
        { key: 'articleStatus', display_name: '文章状态' },
        { key: 'username', display_name: '用户名' },
        { key: 'sourceType', display_name: '来源类型' }
      ],
      enabledTypeOptions: [
        this.getDict('article_type')
      ]
    }
  },
  methods: {
    toQuery() {
      this.$parent.page = 0
      this.$parent.init()
    }
  }
}
</script>
