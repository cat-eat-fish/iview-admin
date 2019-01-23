<template>
    <div>
        <!-- 添加 -->
        <Modal v-model="addmodal" title="添加新广告" :footer-hide=true :mask-closable=false @on-ok="ok" @on-cancel="cancel">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                <FormItem label="排序" prop="sort">
                    <Input v-model="formValidate.sort"  placeholder="请输入广告排序"  />
                </FormItem>
                <FormItem label="广告标题" prop="name">
                    <Input v-model="formValidate.name"  placeholder="请输入您要添加的广告标题"  />
                </FormItem>
                <FormItem label="广告类型" prop="type">
                    <Select v-model="formValidate.type" >
                        <Option value="默认类型" >默认类型</Option>
                    </Select>
                </FormItem>
                <FormItem label="广告链接" prop="link">
                    <Input  v-model="formValidate.link" placeholder="请输入您要添加的广告链接" />
                </FormItem>
                <!-- 上传图片 -->
                <FormItem label="广告图片" prop="img">
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
                        action="http://localhost:3000/api/addadvertisement"
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
                <FormItem>
                    <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
                    <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
                </FormItem>
            </Form>
        </Modal>
        <!-- 编辑 -->
        <Modal v-model="editmodal" title="编辑广告" :footer-hide=true :mask-closable=false @on-ok="editok" @on-cancel="editcancel">
            <Form ref="editformValidate" :model="editformValidate" :rules="editruleValidate" :label-width="80">
                <FormItem label="排序" prop="sort">
                    <Input v-model="editformValidate.sort"  placeholder="请输入广告排序"  />
                </FormItem>
                <FormItem label="广告标题" prop="name">
                    <Input v-model="editformValidate.name"  placeholder="请输入您要添加的广告标题"  />
                </FormItem>
                <FormItem label="广告类型" prop="type">
                    <Select v-model="editformValidate.type" >
                        <Option value="默认类型" >默认类型</Option>
                    </Select>
                </FormItem>
                <FormItem label="广告链接" prop="link">
                    <Input  v-model="editformValidate.link" placeholder="请输入您要添加的广告链接" />
                </FormItem>
                <!-- 上传图片 -->
                <FormItem label="广告图片" prop="img">
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
                        action="http://localhost:3000/api/editadvertisement"
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
        <!-- 广告信息表格 -->
        <Card>
            <p class="search-con search-con-top">
                <Button type="success" @click="addadmin"><Icon type="md-add" />添加广告</Button>&nbsp;
                <!-- <Button style="margin: 10px 0;" type="primary" @click="exportExcel">导出为Csv文件</Button>&nbsp; -->
                <Select v-model="searchKey" class="search-col">
                    <Option v-for="item in columns2"  v-if="item.key !== 'action'" :value="item.key" :key="`search-col-${item.key}`">{{ item.title }}</Option>
                </Select>
                <Input  clearable placeholder="输入关键字搜索" class="search-input" v-model="searchValue"/>
                <Button @click="handleSearch" class="search-btn" type="primary"><Icon type="search"/>搜索</Button>
                <Button @click="resetSearch" class="search-btn" type="primary"><Icon type="search"/>重置</Button>
            </p>
            <Table width="100%" ref="tables"   :loading="loading" border :columns="columns2" :data="data"></Table>
        </Card>
        <!-- 文件上传 -->
    </div>
</template>

<script>
import {advertisement,deladvertisement} from '@/api/front_management'
export default {
  name: 'advertisement_management',
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
        defaultList: [{'url':""},],     //默认已上传的文件列表
        uploadList: [],
        file: null,                  //上传文件
        loadingStatus: false,
        imgName: '',
        visible: false,  
        searchKey: '',
        searchValue: '',            //搜索关键字
        data: [],                   //广告信息表格 数据
        total:0,                    //广告总条数
        addmodal: false,            // 控制 添加广告 model 是否代开 
        editmodal:false,            // 控制 编辑广告 model 是否打开
        uploaddatas:{},
        advertisementType:"",       //广告类型
        loading:true,               // 控制 广告表格信息加载中... 是否打开  
        // 添加广告表单信息
        formValidate: { name: '',sort:"",type:"默认类型",link:"",img:''},
        // 编辑广告表单信息
        editformValidate: {name: '',sort:"",type:"默认类型",link:"",img:''},
        // 添加广告表单 - 验证
        ruleValidate: {
            name:[{ required: true, message: '广告标题不能为空', trigger: 'blur' }],
            sort:[{ required: true, message: '排序不能为空', trigger: 'blur' },{ validator: validateSort,  trigger: 'change' }],
            type:[{ required: true, message: '广告类型不能为空', trigger: 'blur' }],
            link:[{ required: true, message: '广告链接不能为空', trigger: 'blur' }],
        },
        // 编辑广告表单 - 验证
        editruleValidate: {
            name:[{ required: true, message: '广告标题不能为空', trigger: 'blur' }],
            sort:[{ required: true, message: '排序不能为空', trigger: 'blur' },{ validator: validateSort,  trigger: 'change' }],
            type:[{ required: true, message: '广告类型不能为空', trigger: 'blur' }],
            link:[{ required: true, message: '广告链接不能为空', trigger: 'blur' }],
        },
        // 广告信息表格 -- 表头信息
        columns2: [
            {title: 'ID',key: 'id',width: 80,align: 'center',fixed: 'left',sortable: true},
            {title: '排序',key: 'sort',width: 80,align: 'center',sortable: true},
            {title: '广告标题',key: 'name',width: 160,align: 'center'},
            {title: '广告类型',key: 'type',width: 100,align: 'center'},
            {title: '广告链接',key: "link",width: 300,align: 'center',render: (h,params) => {return h('a', {attrs: {href: params.row.link,target:"_blank"},},params.row.link)}},
            {title: '广告图片',key: "img",width: 500,align: 'center',     
                render: (h,params) => {
                    var _this = this;
                    return h("div",[
                        h('img', {
                            props: {type: 'primary',size: 'small'},
                            attrs: {src: params.row.img, style: 'width: 100px;border-radius: 2px;'},
                　　　　　　 style: {marginRight: '5px'},
                        }),
                        h("div",{},params.row.img)
                    ])
                }
            },
            {title: '添加时间',key: 'time',width: 180,align: 'center',sortable: true},
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
  mounted(){
    this.setDefaultSearchKey();
    this.uploadList = this.$refs.editupload.fileList;
  },
  created(){
    this.getAdminInfo();
  },
  methods: {
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
    // 获取广告信息
    getAdminInfo(){
        var that = this;
        advertisement().then(res=>{
            var data = res.data;
            data.map((item,index)=>{
                item.id = String(item.id)
                item.sort = String(item.sort)
                item.img = "http://localhost:3000"+(item.img.substr(8))
            })
            that.data = data;
            that.total = data.length;
            that.loading = false;
        }).catch(function(error){
            console.log(error)
        })
    },
    // 删除广告信息
    deladvertisement(e){{
        var _this = this;
        deladvertisement(e.id).then(res=>{
            var data = res.data;
            _this.getAdminInfo();
            _this.$Message.warning(data.message);
        }).catch(function(error){
            console.log(error)
        })        
    }},
    addadmin (){
        this.$Message.info({content:"欢迎添加广告，误操作会影响你的正常工作，且不会保存数据，请正常操作！",duration:2.5});
        this.addmodal = true;
    },
    // 添加 model 确定事件
    ok () {this.$Message.info('Clicked ok');},
    // 添加 model 取消事件
    cancel () {
        this.handleReset('formValidate');
        this.file =  null;
        this.$Message.info('Clicked cancel');
    },
    // 添加 表单验证
    handleSubmit (name) {
        var addform = this.formValidate;
        this.$refs[name].validate((valid) => {
            if (valid) {
                if(this.file == null){{
                    this.$Message.error('广告图片不能为空!');
                }}
                this.uploaddatas.name = this.formValidate.name;
                this.uploaddatas.sort = this.formValidate.sort;
                this.uploaddatas.type = this.formValidate.type;
                this.uploaddatas.link = this.formValidate.link;
                // 传数据
                this.upload();
            } else {
                this.$Message.error('Fail!');
            }
        })
    },
    // 重置 添加表单
    handleReset (name) {this.$refs[name].resetFields();},
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
                    this.$Message.error('广告图片不能为空!');
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
    // 重置 编辑广告表单
    edithandleReset (name) {this.$refs[name].resetFields();},
  }
}
</script>

<style lang="less" >
    .search-con{
        .search{
            &-col{display: inline-block; width: 200px;}
            &-input{display: inline-block;width: 200px;margin-left: 2px;}
            &-btn{margin-left: 2px;}
        }
    }
    .demo-upload-list{display: inline-block;width: 60px;height: 60px;text-align: center;line-height: 60px;border: 1px solid transparent;border-radius: 4px;overflow: hidden;background: #fff;position: relative;box-shadow: 0 1px 1px rgba(0,0,0,.2);margin-right: 4px;}
    .demo-upload-list img{width: 100%;height: 100%;}
    .demo-upload-list-cover{display: none;position: absolute;top: 0;bottom: 0;left: 0;right: 0;background: rgba(0,0,0,.6);}
    .demo-upload-list:hover .demo-upload-list-cover{display: block;}
    .demo-upload-list-cover i{color: #fff;font-size: 20px;cursor: pointer;margin: 0 2px;}
</style>
