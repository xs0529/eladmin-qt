<template>
  <div>
    <el-button size="mini" type="primary" icon="el-icon-edit" @click="to"/>
    <eForm ref="form" :sup_this="sup_this" :is-add="false"/>
  </div>
</template>
<script>
import eForm from './form'
export default {
  components: { eForm },
  props: {
    data: {
      type: Object,
      required: true
    },
    sup_this: {
      type: Object,
      required: true
    }
  },
  methods: {
    to() {
      const _this = this.$refs.form
      _this.form = {
        id: this.data.id,
        articleType: this.data.articleType,
        articleContent: this.data.articleContent,
        articleTitle: this.data.articleTitle,
        creatTime: this.data.creatTime,
        modifyTime: this.data.modifyTime,
        articleStatus: this.data.articleStatus,
        createUser: this.data.createUser,
        username: this.data.username,
        articleSource: this.data.articleSource,
        sourceType: this.data.sourceType
      }
      _this.dialog = true
    }
  }
}
</script>

<style scoped>
  div{
    display: inline-block;
    margin-right: 3px;
  }
</style>
