<template>
  <el-dialog :append-to-body="true" :visible.sync="dialog" :title="isAdd ? '新增' : '编辑'" width="500px">
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
      <el-form-item label="Spring Bean名称" >
        <el-input v-model="form.beanName" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="cron 表达式" >
        <el-input v-model="form.cronExpression" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="状态：1暂停、0启用" >
        <el-input v-model="form.isPause" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="任务名称" >
        <el-input v-model="form.jobName" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="方法名称" >
        <el-input v-model="form.methodName" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="参数" >
        <el-input v-model="form.params" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="备注" >
        <el-input v-model="form.remark" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="创建或更新日期" >
        <el-input v-model="form.updateTime" style="width: 370px;"/>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { add, edit } from '@/api/quartzJob'
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
        beanName: '',
        cronExpression: '',
        isPause: '',
        jobName: '',
        methodName: '',
        params: '',
        remark: '',
        updateTime: ''
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
        beanName: '',
        cronExpression: '',
        isPause: '',
        jobName: '',
        methodName: '',
        params: '',
        remark: '',
        updateTime: ''
      }
    }
  }
}
</script>

<style scoped>

</style>
