<template>
  <div class="editor-wrapper">
    <div :id="editorId"></div>
  </div>
</template>

<script>
import Editor from 'wangeditor'
import 'wangeditor/release/wangEditor.min.css'
import { oneOf } from '@/libs/tools'
export default {
  name: 'Editor',
  props: {
    value: {
      type: String,
      default: ''
    },
    /*绑定的值的类型, enum: ['html', 'text']*/
    valueType: {
      type: String,
      default: 'html',
      validator: (val) => {
        return oneOf(val, ['html', 'text'])
      }
    },
    /* @description 设置change事件触发时间间隔*/
    changeInterval: {
      type: Number,
      default: 200
    },
    /*@description 是否开启本地存储*/
    cache: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    editorId () {
      return `editor${this._uid}`
    }
  },
  methods: {
    setHtml (val) {
      this.editor.txt.html(val)
    }
  },
  mounted () {
    this.editor = new Editor(`#${this.editorId}`)
    this.editor.customConfig.onchange = (html) => {
      let text = this.editor.txt.text()
      if (this.cache) localStorage.editorCache = html
      this.$emit('input', this.valueType === 'html' ? html : text)
      this.$emit('on-change', html, text)
    }
    //开启debug模式
    // this.editor.customConfig.debug = true;
    // 关闭粘贴内容中的样式
    // this.editor.customConfig.pasteFilterStyle = false
    // // 忽略粘贴内容中的图片
    // this.editor.customConfig.pasteIgnoreImg = true
    //                                                           // 使用 base64 保存图片
    //                                                           //editor.customConfig.uploadImgShowBase64 = true
  
    // // 上传图片到服务器
    // this.editor.customConfig.uploadFileName = 'myFile'; //设置文件上传的参数名称
    // // this.editor.customConfig.uploadImgServer = 'localhost:3000'; //设置上传文件的服务器路径
    // this.editor.customConfig.uploadImgMaxSize = 3 * 1024 * 1024; // 将图片大小限制为 3M
    // //自定义上传图片事件
    // this.editor.customConfig.uploadImgHooks = {
    //   before : function(xhr, editor, files) {
        
    //   },
    //   success : function(xhr, editor, result) {
    //     console.log("上传成功");
    //   },
    //   fail : function(xhr, editor, result) {
    //     console.log("上传失败,原因是"+result);
    //   },
    //   error : function(xhr, editor) {
    //     console.log("上传出错");
    //   },
    //   timeout : function(xhr, editor) {
    //     console.log("上传超时");
    //   }
    // }
    this.editor.customConfig.onchangeTimeout = this.changeInterval
    // create这个方法一定要在所有配置项之后调用
    this.editor.create()
    // 如果本地有存储加载本地存储内容
    // let html = this.value || localStorage.editorCache
    // if (html) this.editor.txt.html(html)
  }
}
</script>

<style lang="less">
.editor-wrapper *{
  // z-index: 100 !important;
}
</style>
