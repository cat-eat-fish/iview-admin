<template>
    <div>
        <!-- 添加 -->
        <Modal v-model="addmodal" title="添加新文章" :fullscreen=true :footer-hide=true :mask-closable=false @on-ok="ok" @on-cancel="cancel">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                <FormItem label="排序" prop="sort">
                    <Input v-model="formValidate.sort"  placeholder="请输入文章排序"  />
                </FormItem>
                <FormItem label="文章类型" prop="pid">
                    <Select v-model="formValidate.pid" >
                        <Option value="1" >公告</Option>
                        <Option value="2" >新闻</Option>
                    </Select>
                </FormItem>
                <FormItem label="文章标题" prop="title">
                    <Input v-model="formValidate.title"  placeholder="请输入您要添加的文章标题"  />
                </FormItem>
                <FormItem label="文章作者" prop="author">
                    <Input  v-model="formValidate.author" placeholder="请输入您要添加的文章作者" />
                </FormItem>
                <FormItem label="添加时间">
                    <Row>
                        <Col span="4">
                            <FormItem prop="date">
                                <DatePicker type="date" placeholder="选择日期" v-model="formValidate.date"></DatePicker>
                            </FormItem>
                        </Col>
                        <Col span="1" style="text-align: center">-</Col>
                        <Col span="4">
                            <FormItem prop="time">
                                <TimePicker type="time" placeholder="选择时间" v-model="formValidate.time"></TimePicker>
                            </FormItem>
                        </Col>
                        <Col span="10">
                            <Button type="info" @click="setnowtime">使用当前时间</Button>
                        </Col>
                    </Row>
                </FormItem>
                <div ref="formDynamic" :model="formDynamic">
                    <FormItem :label="'关键词 ' + item.index"  v-for="(item, index) in formDynamic.items" v-if="item.status" :key="index" >
                        <Row>
                            <Col span="18">
                                <Input type="text" v-model="item.value" placeholder="请输入关键字" />
                            </Col>
                            <Col span="4" offset="1">
                                <Button @click="handleRemove(index)">删除</Button>
                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem>
                        <Row>
                            <Col span="12">
                                <Button type="dashed" long @click="handleAdd" icon="md-add">添加关键词</Button>
                            </Col>
                        </Row>
                    </FormItem>
                </div>
                <!-- 上传图片 -->
                <FormItem label="文章缩略图" prop="img">
                    <Upload
                        ref="upload"
                        name="inputFile"
                        :show-upload-list="false"
                        :on-success="handleSuccess"
                        :format="['jpg','jpeg','png']"
                        :max-size="2048"
                        :on-format-error="handleFormatError"
                        :on-exceeded-size="handleMaxSize"
                        :before-upload="handleUpload"
                        :data="uploaddatas"
                        type="drag"
                        action="/api/addnotice_news"
                        style="display: inline-block;width:58px;">
                        <div style="width: 58px;height:58px;line-height: 58px;">
                            <Icon type="ios-camera" size="20"></Icon>
                        </div>
                    </Upload>
                    <div v-if="file !== null">
                        上传图片: {{ file.name }} 
                    </div>
                </FormItem>
                <!-- 上传图片 -->
                
                <FormItem label="文章内容" prop="content">
                    <editor ref="editor" :value="formValidate.content" v-model="formValidate.content" @on-change="handleChange"/>
                    <Button @click="changeContent">修改编辑器内容</Button>
                </FormItem>
                
                <FormItem>
                    <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
                    <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
                </FormItem>
            </Form>
        </Modal>
        <!-- 编辑 -->
        <Modal
            v-model="editmodal"
            :fullscreen=true
            title="编辑文章"
            :footer-hide=true
            :mask-closable=false
            @on-ok="editok"
            @on-cancel="editcancel">
            <Form ref="editformValidate" :model="editformValidate" :rules="editruleValidate" :label-width="80">
                <FormItem label="排序" prop="sort">
                    <Input v-model="editformValidate.sort"  placeholder="请输入文章排序"  />
                </FormItem>
                <FormItem label="文章标题" prop="name">
                    <Input v-model="editformValidate.name"  placeholder="请输入您要添加的文章标题"  />
                </FormItem>
                <FormItem label="文章类型" prop="type">
                    <Select v-model="editformValidate.type" >
                        <Option value="默认类型" >默认类型</Option>
                    </Select>
                </FormItem>
                <FormItem label="文章链接" prop="link">
                    <Input  v-model="editformValidate.link" placeholder="请输入您要添加的文章链接" />
                </FormItem>
                <!-- 上传图片 -->
                <FormItem label="文章图片" prop="img">
                    <div class="demo-upload-list" v-for="(item,index) in uploadList" :key="index">
                        <template v-if="item.status === 'finished'">
                            <img :src="item.url">
                            <div class="demo-upload-list-cover">
                                <Icon type="ios-eye-outline" @click.native="handleView(item)"></Icon>
                            </div>
                        </template>
                        <template v-else>
                            <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                        </template>
                    </div>
                    <Upload
                        ref="editupload"
                        name="editinputFile"
                        :show-upload-list="false"
                        :on-success="edithandleSuccess"
                        :default-file-list="defaultList"
                        :format="['jpg','jpeg','png']"
                        :max-size="2048"
                        :on-format-error="handleFormatError"
                        :on-exceeded-size="handleMaxSize"
                        :before-upload="edithandleUpload"
                        :data="uploaddatas"
                        type="drag"
                        action="/api/editadvertisement"
                        style="display: inline-block;width:58px;">
                        <div style="width: 58px;height:58px;line-height: 58px;">
                            <Icon type="ios-camera" size="20"></Icon>
                        </div>
                    </Upload>
                    <Modal title="View Image" v-model="visible">
                        <img :src="imgName"  style="width: 100%">
                    </Modal>
                    <div v-if="file !== null">
                        上传图片: {{ file.name }} 
                    </div>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="edithandleSubmit('editformValidate')">提交</Button>
                    <Button @click="edithandleReset('editformValidate')" style="margin-left: 8px">重置</Button>
                </FormItem>
            </Form>
        </Modal>
        <!-- 文章信息表格 -->
        <Card>
            <p class="search-con search-con-top" style="display:flex;">
                <Button type="success" @click="addadmin"><Icon type="md-add" />添加文章</Button>&nbsp;
                <!-- <Button style="margin: 10px 0;" type="primary" @click="exportExcel">导出为Csv文件</Button>&nbsp; -->
                <Select v-model="searchKey" class="search-col">
                    <Option v-for="item in columns2"  v-if="item.key !== 'action'" :value="item.key" :key="`search-col-${item.key}`">{{ item.title }}</Option>
                </Select>
                <Input  clearable placeholder="输入关键字搜索" class="search-input" v-model="searchValue"/>
                <Button @click="handleSearch" class="search-btn" type="primary"><Icon type="search"/>搜索</Button>
                <Button @click="resetSearch" class="search-btn" type="primary"><Icon type="search"/>重置</Button>
                <Page :total="total" show-sizer style="margin-left:10px;" />
            </p>
            <Table width="100%" ref="tables"   :loading="loading" border :columns="columns2" :data="data"></Table>
        </Card>
        <!-- 文件上传 -->
    </div>
</template>

<script>
import Tables from '_c/tables'
import Editor from '_c/editor'
import addressJson from "@/api/address.json"        
import CountTo from '_c/count-to'
export default {
  components: {CountTo,Tables,Editor},
  name: 'notice_news',
  data () {
        const validateCard = (rule, value, callback) => {
            var pattcard = /^((d{18})|([0-9x]{18})|([0-9X]{18}))$/;
            if(!pattcard.test(value)){
                callback(new Error('身份证号码格式错误'));
            }else{
                callback();
            }
        };
        const validatePhone = (rule, value, callback) => {
            var pattphone = /^(13[0-9]|14[0-9]|15[0-9]|166|17[0-9]|18[0-9]|19[8|9])d{8}$/;
            if(!pattphone.test(value)){
                callback(new Error('手机号码格式错误'));
            }else{
                callback();
            }
        };
        const validateContent = (rule, value, callback) => {
            if(value.length < 100){
                callback(new Error('文章内容过少！'));
            }else{
                callback();
            }
        };
        const validatePass = (rule, value, callback) => {
            if (value.length < 3 || value.length >18 ) {
                callback(new Error('登录密码格式错误，需长度大于3小于18'));
            } else {
                if (this.formValidate.passwdCheck !== '') {
                    // 对第二个密码框单独验证
                    this.$refs.formValidate.validateField('passwdCheck');
                }
                callback();
            }
        };
        const validatePassCheck = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.formValidate.passwd) {
                callback(new Error('两次输入密码不一致'));
            } else {
                callback();
            }
        };
        const validateSort = (rule,value,callback)=>{
            var patt = /^\d$/;
            if(!patt.test(value)){
                callback(new Error('排序只能是数字'));
            }else{
                callback();
            }
        }
    return {
        total:0,                    //总条数
        index: 1,
        formDynamic: {
            items: [{value: '',index: 1,status: 1}]
        },
        defaultList: [
            {'url':""},
        ],
        uploadList: [],
        file: null,
        loadingStatus: false,
        imgName: '',
        visible: false,  
        searchKey: '',
        searchValue: '',            //搜索关键字
        data: [],                   //文章信息表格 数据
        total:0,                    //文章总条数
        addmodal: false,            // 控制 添加文章 model 是否代开 
        editmodal:false,            // 控制 编辑文章 model 是否打开
        uploaddatas:{},
        advertisementType:"",       //文章类型
        loading:true,               // 控制 文章表格信息加载中... 是否打开  
        // 添加文章表单信息
        formValidate: { pid: '1',sort:"",author:"",status:"1",title:"",content:"",keyword:"",hits:"",ontop:"0",iselite:"0",date:"",time:"",add_time:"",thumb:""},
        // 编辑文章表单信息
        editformValidate: { pid: '',sort:"",author:"",staus:"",title:"",content:"",keyword:"",hits:"",ontop:"",iselite:"",date:"",time:"",add_time:"",thumb:""},
        // 添加文章表单 - 验证
        ruleValidate: {
            sort:[{ required: true, message: '排序不能为空', trigger: 'blur' },{ validator: validateSort,  trigger: 'change' }],
            pid:[{ required: true, message: '文章类型不能为空', trigger: 'blur' }],
            title:[{ required: true, message: '文章标题不能为空', trigger: 'blur' }],
            author:[{ required: true, message: '文章作者不能为空', trigger: 'blur' }],
            content:[{ required: true, message: '文章内容不能为空', trigger: 'blur' },{ validator: validateContent,  trigger: 'blur' }],
            date: [{ required: true, type: 'date', message: '请选择日期', trigger: 'blur' }],
            time: [{ required: true, type: 'string', message: '请选择时间', trigger: 'blur' }],
        },
        // 编辑文章表单 - 验证
        editruleValidate: {
            name:[{ required: true, message: '文章标题不能为空', trigger: 'blur' }],
            sort:[{ required: true, message: '排序不能为空', trigger: 'blur' },{ validator: validateSort,  trigger: 'change' }],
            type:[{ required: true, message: '文章类型不能为空', trigger: 'blur' }],
            link:[{ required: true, message: '文章链接不能为空', trigger: 'blur' }],
        },
        // 文章信息表格 -- 表头信息
        columns2: [
            {title: 'ID',key: 'id',width: 80,align: 'center',fixed: 'left',sortable: true},
            {title: '所属栏目',key: 'pid',width: 160,align: 'center'},
            {title: '排序',key: 'sort',width: 160,align: 'center',sortable: true},
            {title: '文章标题',key: 'title',width: 160,align: 'center',},
            {title: '文章缩略图',key: "thumb",width: 500,align: 'center',     
                render: (h,params) => {
                    var _this = this;
                    return h("div",[
                        h('img', {
                            props: {type: 'primary',size: 'small'},
                            attrs: {src: params.row.thumb, style: 'width: 100px;border-radius: 2px;'},
                　　　　　　 style: {marginRight: '5px'},
                        }),
                        h("div",{},params.row.thumb)
                    ])
                }
            },
            {title: '文章作者',key: 'author',width: 160,align: 'center',},
            {title: '文章状态',key: 'status',width: 160,align: 'center'},
            {title: '文章关键字',key: 'keyword',width: 200,align: 'center'},
            {title: '文章点击数',key: 'hits',width: 200,align: 'center'},
            {title: '是否置顶',key: 'ontop',width: 200,align: 'center'},
            {title: '是否推荐',key: 'iselite',width: 200,align: 'center'},
            // {title: '',key: "",width: 300,align: 'center',render: (h,params) => {return h('a', {attrs: {href: params.row.link,target:"_blank"},},params.row.link)}},
            
            {title: '添加时间',key: 'add_time',width: 180,align: 'center',sortable: true},
            {title: '操作',key: 'action',width: 200,options: ['delete'],fixed: 'right',align: 'center',
                render: (h, params) => {
                    var _this = this;
                    return h('div', [
                        h('Button', {
                            props: {type: 'success',size: 'small'},
                            style: {marginRight: '5px'},
                            on: {click: () => {
                                this.defaultList[0].url = params.row.img
                                this.editformValidate = params.row
                                this.editmodal = true;
                            }
                            }
                        },"编辑"),
                        h('Poptip', {props: { placement:"top",transfer:true, confirm:true,title:"你确定要删除该项吗？",},
                        
                            on: {
                                click: () => {},
                                "on-ok":()=>{_this.deladvertisement(params.row)},
                                "on-cancel":()=>{console.log(0)}
                            }
                        }, [h("Button",{props:{type: 'error',size: 'small',}},"删除")])
                    ]);
                }
            },
        ],
    }
  },
//   计算属性 
  computed:{
  },
  mounted(){
      this.setDefaultSearchKey();
      this.uploadList = this.$refs.editupload.fileList;
  },
  created(){
    this.getAdminInfo();
  },
  methods: {
    //   使用当前时间
    setnowtime (){
        this.formValidate.date = new Date();
        this.formValidate.time = new Date();
    },
    handleChange (html, text) {
      // console.log(html, text)
    },
    changeContent () {
      this.$refs.editor.setHtml('<p>powered by wangeditor</p>')
    },
    handleAdd () {
        this.index++;
        this.formDynamic.items.push({
            value: '',
            index: this.index,
            status: 1
        });
    },
    handleRemove (index) {
        this.formDynamic.items[index].status = 0;
    },
    // 设置 上传文件 携带数据
    // setuploaddatas (e) {
    //     this.uploaddatas.id = e;
    // },
    handleView (e) {
        this.imgName = e.url;
        this.visible = true;
    },
    handleSuccess (res, file) {
        if(res.status === 200){
            this.$Message.success(res.message)
        }
        this.getAdminInfo();
        this.addmodal =  false;
    },
    edithandleSuccess(res,file){
        if(res.status === 200){
            this.$Message.success(res.message)
        }
        file.url = 'https://o5wwk8baw.qnssl.com/7eb99afb9d5f317c912f08b5212fd69a/avatar';
        this.getAdminInfo();
        this.editmodal =  false;
    },
    handleFormatError (file) {
        this.$Notice.warning({
            title: '文件格式不正确',
            desc: '文件格式' + file.name + ' 不正确，请选择JPG或PNG。'
        });
    },
    handleMaxSize (file) {
        this.$Notice.warning({
            title: '超出文件大小限制',
            desc: '文件 ' + file.name + '太大，不超过2M。'
        });
    },
    handleUpload (file) {
        this.file = file;
        return false;
    },
    edithandleUpload (file){
        this.file = file;
        return false;
    },
    upload () {
        this.$refs.upload.post(this.file);
        this.loadingStatus = true;
        this.file = null;
        this.loadingStatus = false;
        
    },
    editupload () {
        this.$refs.editupload.post(this.file);
        this.loadingStatus = true;
        this.file = null;
        this.loadingStatus = false;
        
    },


    // 重置搜索内容
    resetSearch(){
        this.getAdminInfo();
        this.setDefaultSearchKey();
        this.searchValue = "";
        this.$Message.success('重置成功');
    },
    // 默认搜索
    setDefaultSearchKey () {
      this.searchKey = this.columns2[0].key !== 'action' ? this.columns2[0].key : (this.columns2.length > 1 ? this.columns2[1].key : '')
    },
    // 搜索
    handleSearch () {
      this.data = this.data.filter(item => item[this.searchKey].indexOf(this.searchValue) > -1);
    },
    // 获取文章信息
    getAdminInfo(){
        var that = this;
        this.$axios({method: 'post',url: '/api/notice_news'})
        .then(function(res){
            var data = res.data;
            data.map((item,index)=>{
                item.id = String(item.id)
                item.sort = String(item.sort)
                item.thumb = "http://localhost:3000"+(item.thumb.substr(8))
            })
            that.data = data;
            that.total = data.length;
            that.loading = false;
        }).catch(function(error){
            console.log(error)
        })
    },
    // 删除文章信息
    deladvertisement(e){{
        var _this = this;
        this.$axios({method: 'post',data:{id:e.id}, url: '/api/deladvertisement'})
        .then(function(res){
            var data = res.data;
            console.log(data)
            _this.getAdminInfo();
            _this.$Message.warning(data.message);
            // that.handleReset("formValidate");
            // that.getAdminInfo()
            // that.addmodal = false;
        }).catch(function(error){
            console.log(error)
        })        
    }},
    // 判断数据类型
    getType(obj) {
        var type = typeof obj;
        if (type !== 'object') {
            return type;
        }
        return Object.prototype.toString.call(obj).replace(/^[object (S+)]$/, '$1');
    },
    addadmin (){
        this.$Message.info({content:"欢迎添加文章，误操作会影响你的正常工作，且不会保存数据，请正常操作！",duration:2.5});
        this.addmodal = true;
    },
    // 添加 model 确定事件
    ok () {this.$Message.info('Clicked ok');},
    // 添加 model 取消事件
    cancel () {
        this.handleReset('formValidate');
        this.formDynamic= {
            items: [{value: '',index: 1,status: 1}]
        },
        this.file =  null;
        this.$Message.info('Clicked cancel');
    },
    // 添加 表单验证
    handleSubmit (name) {
        var addform = this.formValidate;
        // console.log(this.formDynamic)
        this.$refs[name].validate((valid) => {
            if (valid) {
                if(this.file == null){{
                    this.$Message.error('文章图片不能为空!');
                }}
                this.uploaddatas.sort = this.formValidate.sort;
                this.uploaddatas.pid = this.formValidate.pid;
                this.uploaddatas.author = this.formValidate.author;
                this.uploaddatas.status = this.formValidate.status;
                this.uploaddatas.title = this.formValidate.title;
                this.uploaddatas.keyword = this.formValidate.keyword;
                this.uploaddatas.content = this.formValidate.content;
                this.uploaddatas.ontop = this.formValidate.ontop;
                this.uploaddatas.iselite = this.formValidate.iselite;
                this.uploaddatas.add_time = this.formValidate.add_time;
                this.uploaddatas.thumb = this.formValidate.thumb;
                // 传数据
                this.upload();
            } else {
                this.$Message.error('Fail!');
            }
        })
    },
    // 重置 添加表单
    handleReset (name) {
        this.$refs[name].resetFields();
        this.formDynamic= {items: [{value: '',index: 1,status: 1}]}
    },
    // 编辑 model 确定事件
    editok(){console.log('editok')},
    // 编辑 model 取消事件
    editcancel(){
        this.file =  null;
        this.$Message.info('Clicked cancel');
    },
    // 编辑 表单验证
    edithandleSubmit (name) {
        // var editform = this.editformValidate;
        this.$refs[name].validate((valid) => {
            if (valid) {
                if(this.file == null){{
                    this.$Message.error('文章图片不能为空!');
                }}
                this.uploaddatas.id = this.editformValidate.id;
                this.uploaddatas.name = this.editformValidate.name;
                this.uploaddatas.sort = this.editformValidate.sort;
                this.uploaddatas.type = this.editformValidate.type;
                this.uploaddatas.link = this.editformValidate.link;
                // 传数据
                this.editupload();
            } else {
                this.$Message.error('Fail!');
            }
        })
    },
    // 重置 编辑文章表单
    edithandleReset (name) {this.$refs[name].resetFields();},
  }
}
</script>

<style>
    .demo-upload-list{display: inline-block;width: 60px;height: 60px;text-align: center;line-height: 60px;border: 1px solid transparent;border-radius: 4px;overflow: hidden;background: #fff;position: relative;box-shadow: 0 1px 1px rgba(0,0,0,.2);margin-right: 4px;}
    .demo-upload-list img{width: 100%;height: 100%;}
    .demo-upload-list-cover{display: none;position: absolute;top: 0;bottom: 0;left: 0;right: 0;background: rgba(0,0,0,.6);}
    .demo-upload-list:hover .demo-upload-list-cover{display: block;}
    .demo-upload-list-cover i{color: #fff;font-size: 20px;cursor: pointer;margin: 0 2px;}
</style>


