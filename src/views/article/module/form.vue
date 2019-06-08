<template>
  <el-dialog :append-to-body="true" :visible.sync="dialog" :title="isAdd ? '新增' : '编辑'" width="500px">
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
      <el-form-item label="文章类型" >
        <el-input v-model="form.articleType" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="文章内容" >
        <el-input v-model="form.articleContent" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="文章标题" >
        <el-input v-model="form.articleTitle" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="creatTime" >
        <el-input v-model="form.creatTime" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="modifyTime" >
        <el-input v-model="form.modifyTime" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="文章状态" >
        <el-input v-model="form.articleStatus" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="创建人id" >
        <el-input v-model="form.createUser" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="用户名" >
        <el-input v-model="form.username" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="文章来源（转载时的url）" >
        <el-input v-model="form.articleSource" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="来源类型" >
        <el-input v-model="form.sourceType" style="width: 370px;"/>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { add, edit } from '@/api/article'
export default {
  props: {
    isAdd: {
      type: Boolean,
      required: true
    },
    sup_this: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      loading: false, dialog: false,
      form: {
        id: '',
        articleType: '',
        articleContent: '',
        articleTitle: '',
        creatTime: '',
        modifyTime: '',
        articleStatus: '',
        createUser: '',
        username: '',
        articleSource: '',
        sourceType: ''
      },
      rules: {
      }
    }
  },
  methods: {
    cancel() {
      this.resetForm()
    },
    doSubmit() {
      this.loading = true
      if (this.isAdd) {
        this.doAdd()
      } else this.doEdit()
    },
    doAdd() {
      add(this.form).then(res => {
        this.resetForm()
        this.$notify({
          title: '添加成功',
          type: 'success',
          duration: 2500
        })
        this.loading = false
        this.$parent.$parent.init()
      }).catch(err => {
        this.loading = false
        console.log(err.response.data.message)
      })
    },
    doEdit() {
      edit(this.form).then(res => {
        this.resetForm()
        this.$notify({
          title: '修改成功',
          type: 'success',
          duration: 2500
        })
        this.loading = false
        this.sup_this.init()
      }).catch(err => {
        this.loading = false
        console.log(err.response.data.message)
      })
    },
    resetForm() {
      this.dialog = false
      this.$refs['form'].resetFields()
      this.form = {
        id: '',
        articleType: '',
        articleContent: '',
        articleTitle: '',
        creatTime: '',
        modifyTime: '',
        articleStatus: '',
        createUser: '',
        username: '',
        articleSource: '',
        sourceType: ''
      }
    }
  }
}
</script>

<style scoped>

</style>
