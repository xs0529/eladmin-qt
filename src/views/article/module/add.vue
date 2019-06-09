<template>
  <el-row class="top30">
    <el-col :span="12">
      <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
        <el-form-item label="文章标题" prop="articleTitle">
          <el-input
            :rows="2"
            v-model="form.articleTitle"
            type="textarea"
            placeholder="请输入内容"/>
        </el-form-item>
        <el-form-item label="文章类型" prop="articleTitle">
          <el-select v-model="form.articleType" clearable placeholder="文章类型" class="filter-item" style="width: 370px">
            <el-option v-for="item in article_type" :key="item.id" :label="item.label" :value="item.id"/>
          </el-select>
        </el-form-item>
        <el-form-item label="来源类型" prop="sourceType">
          <el-select v-model="form.sourceType" clearable placeholder="来源类型" class="filter-item" style="width: 370px">
            <el-option v-for="item in source_type" :key="item.id" :label="item.label" :value="item.id"/>
          </el-select>
        </el-form-item>
        <el-form-item label="文章来源（转载时的url）" prop="articleSource">
          <el-input
            :rows="2"
            v-model="form.articleSource"
            type="textarea"
            placeholder="请输入内容"/>
        </el-form-item>
      </el-form>
      <div class="toolbar">
        <div ref="editorTitle"/>
      </div>
      <div ref="editorText" class="text" style="text-align:left;margin: 5px"/>
    </el-col>
    <el-col :span="12">
      <div style="text-align: center">
        <el-button type="primary" @click="doSubmit(19)">保存为草稿</el-button>
        <el-button type="success" @click="doSubmit(20)">发布</el-button>
      </div>
      <div class="editor-content yulan" v-html="editorContent"/>
    </el-col>
  </el-row>
</template>

<script>
import { get } from '@/api/dictDetail'
import { add, one, edit } from '@/api/article'
import { mapGetters } from 'vuex'
import E from 'wangeditor'
import { getToken } from '@/utils/auth'
export default {
  name: 'ArticleAdd',
  data() {
    return {
      headers: {
        'Authorization': 'Bearer ' + getToken()
      },
      editorContent:
        `<h3 style="text-align: center;">欢迎使用 wangEditor 富文本编辑器!</h3>
        <ul>
          <li>富文本中图片上传使用的是sm.ms图床，支持上传到七牛云：<a style="color: #42b983" target="_blank" href="https://sm.ms/">sm.ms</a></li>
          <li>更多帮助请查看官方文档：<a style="color: #42b983" target="_blank" href="https://www.kancloud.cn/wangfupeng/wangeditor3/332599">wangEditor</a></li>
        </ul>`,
      article_type: [],
      source_type: [],
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
        articleTitle: [
          { required: true, message: '请输入文章标题', trigger: 'blur' }
        ],
        articleType: [
          { required: true, message: '请选择文章类型', trigger: 'blur' }
        ],
        sourceType: [
          { required: true, message: '请选择文章来源类型', trigger: 'blur' }
        ],
        editorContent: [
          { required: true, message: '请输入文章内容', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters([
      'imagesUploadApi'
    ])
  },
  created() {
    this.$nextTick(() => {
      // eslint-disable-next-line eqeqeq
      this.getSelectData()
    })
  },
  async mounted() {
    var editor = new E(this.$refs.editorTitle, this.$refs.editorText)
    editor.customConfig.uploadImgShowBase64 = true // 使用 base64 保存图片
    // 不可修改
    editor.customConfig.uploadImgHeaders = this.headers
    // 自定义文件名，不可修改，修改后会上传失败
    editor.customConfig.uploadFileName = 'file'
    editor.customConfig.uploadImgServer = this.imagesUploadApi // 上传图片到服务器
    editor.customConfig.onchange = (html) => {
      this.editorContent = html
    }
    editor.create()
    // eslint-disable-next-line eqeqeq
    if (this.$route.params.id != 0) {
      this.form.id = this.$route.params.id
      one(this.form.id).then(res => {
        this.form = res
        this.editorContent = res.articleContent
        editor.txt.html(res.articleContent)
      }).catch(err => {
        console.log(err.response.data.message)
      })
    }
  },
  methods: {
    getSelectData() {
      get('source_type').then(res => {
        this.source_type = res.content
      })
      get('article_type').then(res => {
        this.article_type = res.content
      })
    },
    doSubmit(i) {
      this.form.articleContent = this.editorContent
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.form.articleStatus = i
          if (this.form.id == null) {
            this.doAdd()
          } else {
            this.doEdit()
          }
        } else {
          return false
        }
      })
    },
    doAdd() {
      add(this.form).then(res => {
        this.$message({
          message: '保存成功！',
          type: 'success',
          duration: 2500
        })
        this.$router.go(-1)
      }).catch(err => {
        console.log(err.response.data.message)
      })
    },
    doEdit() {
      edit(this.form).then(res => {
        this.$message({
          message: '更新成功！',
          type: 'success',
          duration: 2500
        })
        this.$router.go(-1)
      }).catch(err => {
        console.log(err.response.data.message)
      })
    }
  }
}
</script>

<style scoped>
  .editor-content{
    padding-left: 5px;
  }
  .top30{
    margin-top: 30px;
  }
  .toolbar {
    border: 1px solid #ccc;
  }
  .text {
    border: 1px solid #ccc;
    height: 800px;
  }
  .yulan {
    border: 1px solid #ccc;
    height: 800px;
    margin: 30px 10px 0px 10px;
  }
</style>
