<template>
    <div>
        <!-- 添加管理员表单 -->
        <Modal v-model="addmodal" title="添加管理员" :footer-hide=true :mask-closable=false  @on-cancel="cancel">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                <FormItem label="用户名" prop="username">
                    <Input v-model="formValidate.username"  placeholder="请输入您的登录用户名"  />
                </FormItem>
                <FormItem label="姓名" prop="name">
                    <Input v-model="formValidate.name" placeholder="请输入您的姓名" />
                </FormItem>
                <FormItem label="密码" prop="passwd">
                    <Input type="password" v-model="formValidate.passwd" placeholder="请输入您的登录密码" />
                </FormItem>
                <FormItem  label="重复密码" prop="passwdCheck">
                    <Input type="password" v-model="formValidate.passwdCheck" placeholder="请重复输入您的登录密码" />
                </FormItem>
                <FormItem label="手机号码" prop="phone">
                    <Input v-model="formValidate.phone" placeholder="请输入您的联系方式" />
                </FormItem>
                <FormItem label="身份证号" prop="card">
                    <Input v-model="formValidate.card" placeholder="请输入您的身份证号" />
                </FormItem>
                <FormItem label="所在城市" prop="city">
                    <Cascader :data="citydata" v-model="formValidate.city" placeholder="请选择所在城市" ></Cascader>
                </FormItem>
                <FormItem label="性别" prop="gender">
                    <RadioGroup v-model="formValidate.gender">
                        <Radio label="male">男性</Radio>
                        <Radio label="female">女性</Radio>
                    </RadioGroup>
                </FormItem>
                
                <FormItem label="备注" prop="desc">
                    <Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入一些备注吧..." />
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
                    <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
                </FormItem>
            </Form>
        </Modal>
        <!-- 编辑管理员表单 -->
        <Modal v-model="editmodal" title="编辑管理员" :footer-hide=true @on-ok="editok" @on-cancel="editcancel">
            <Form ref="editformValidate" :model="editformValidate" :rules="editruleValidate" :label-width="80">
                <FormItem label="用户名" prop="username">
                    <Input v-model="editformValidate.username" placeholder="请输入您的登录用户名"  />
                </FormItem>
                <FormItem label="姓名" prop="name">
                    <Input v-model="editformValidate.name" placeholder="请输入您的姓名" />
                </FormItem>
                <FormItem label="密码" prop="password">
                    <Input v-model="editformValidate.password" placeholder="请输入您的登录密码" />
                </FormItem>
                <FormItem label="手机号码" prop="phone">
                    <Input v-model="editformValidate.phone" placeholder="请输入您的联系方式" />
                </FormItem>
                <FormItem label="身份证号" prop="card">
                    <Input v-model="editformValidate.card" placeholder="请输入您的身份证号" />
                </FormItem>
                <FormItem label="所在城市" prop="city">
                    <Cascader :data="citydata" v-model="editformValidate.city" placeholder="请选择所在城市" ></Cascader>
                </FormItem>
                <FormItem label="性别" prop="gender">
                    <RadioGroup v-model="editformValidate.gender">
                        <Radio label="male">男性</Radio>
                        <Radio label="female">女性</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label="备注" prop="desc">
                    <Input v-model="editformValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入一些备注吧..."  />
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="edithandleSubmit('editformValidate')">提交</Button>
                    <Button @click="edithandleReset('editformValidate')" style="margin-left: 8px">重置</Button>
                </FormItem>
            </Form>
        </Modal>
        <!-- 管理员信息表格 -->
        <Card>
            <div style="display:flex;line-height: 50px;">
                <div class="search-con search-con-top"  >
                    <Button type="success" @click="addadmin"><Icon type="md-add" />添加管理员</Button>&nbsp;
                    <Button style="margin: 10px 0;" type="primary" @click="exportExcel">导出为Csv文件</Button>&nbsp;
                    <Select v-model="searchKey" class="search-col">
                        <Option v-for="item in columns2"  v-if="item.key !== 'action'" :value="item.key" :key="`search-col-${item.key}`">{{ item.title }}</Option>
                    </Select>
                    <Input  clearable placeholder="输入关键字搜索" class="search-input" v-model="searchValue"/>
                    <Button @click="handleSearch" class="search-btn" type="primary"><Icon type="search"/>搜索</Button>
                    <Button @click="resetSearch" class="search-btn" type="primary"><Icon type="search"/>重置</Button>
                </div>
                <div>
                    <Page :total="total" show-sizer style="mmargin-left:10px;" />
                </div>
            </div>
            <Table width="100%" ref="tables"  :loading="loading" border :columns="columns2" :data="data"></Table>
        </Card>
        <!-- 文件上传 -->
        <Modal title="View Image" v-model="visible2">
            <Upload 
            ref="upload" 
                name="inputFile" 
                :show-upload-list="false" 
                :on-progress="handleprogress" 
                :on-success="handleSuccess"             
                :on-error="handleErroe"
                :format="['jpg','jpeg','png']"
                :max-size="2048"
                :on-format-error="handleFormatError"
                :on-exceeded-size="handleMaxSize"
                :before-upload="handleBeforeUpload"
                multiple:false
                type="drag"
                action="http://localhost:3000/api/file/uploading"
                :data="uploaddatas"
                style="display: inline-block;width:58px;"
            >
                <div style="width: 58px;height:58px;line-height: 58px;">
                    <Icon type="ios-camera" size="20"></Icon>
                </div>
            </Upload>  
            <div v-if="file !== null">
                上传文件: {{ file.name }} 
                <Button type="text" @click="upload" :loading="loadingStatus">{{ loadingStatus ? '上传中' : '点击上传' }}</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
import {admin,addAdmin,delAdmin,editAdmin} from "@/api/system"
import addressJson from "@/api/address.json"
import CountTo from '_c/count-to'
export default {
  components: {CountTo},
  name: 'back_management',
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
            var pattphone =/^[1][3,4,5,7,8][0-9]{9}$/;// /^(13[0-9]|14[0-9]|15[0-9]|166|17[0-9]|18[0-9]|19[8|9])d{8}$/
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
    return {
        searchKey: '',
        searchValue: '',            //搜索关键字
        insideTableData: [],
        data: [],                   //管理员信息表格 数据
        total:0,                    //管理员总条数
        addmodal: false,            // 控制 添加管理员 model 是否代开 
        editmodal:false,            // 控制 编辑管理员 model 是否打开
        visible2: false,            // 控制 文件上传 model 是否打开
        file: null,                 // 要上传的文件
        uploaddatas:{id:0},
        loadingStatus: false,       // 控制 文件加载上传中... 是否打开
        loading:true,               // 控制 管理员表格信息加载中... 是否打开  
        returnCitySN:{},            //地理信息
        citydata: [],               // 省市县三级联动数据
        // 添加管理员表单信息
        formValidate: {username:'', name: '',passwdCheck:"",phone:"",card:"", gender: '',city:[],desc: '',},
        // 编辑管理员表单信息
        editformValidate: {username:'', name: '',password: "",phone:"",card:"", gender: '',city:[],desc: ''},
        // 添加管理员表单 - 验证
        ruleValidate: {
            username: [{ required: true, message: '用户名不能为空', trigger: 'change' }],
            card: [{ required: true, message: '身份证号码不能为空', trigger: 'change' },{ validator: validateCard,  trigger: 'change' }],
            passwd:[{ required: true, message: '密码不能为空', trigger: 'blur' },{ validator: validatePass, trigger: 'blur' }],
            passwdCheck: [{ required: true, message: '重复密码不能为空', trigger: 'blur' },{ validator: validatePassCheck, trigger: 'blur' }],
            phone: [{ required: true, message: '联系方式不能为空', trigger: 'blur' },{ validator: validatePhone,  trigger: 'change' }],
        },
        // 编辑管理员表单 - 验证
        editruleValidate: {
            username: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
            card: [{ required: true, message: '身份证号码不能为空', trigger: 'change' },{ validator: validateCard,  trigger: 'change' }],
            password:[{ required: true, message: '登录密码不能为空', trigger: 'blur' }],
            phone: [{ required: true, message: '联系方式不能为空', trigger: 'blur' },{ validator: validatePhone,  trigger: 'change' }],
        },
        // 管理员信息表格 -- 表头信息
        columns2: [
            {title: 'ID',key: 'id',width: 80,fixed: 'left',align: 'center',sortable: true},
            {title: '用户名',key: 'username',width: 160,align: 'center',fixed: 'left'},
            {title: '姓名',key: 'name',width: 150,align: 'center',fixed: 'left'},
            {title: '密码',key: 'password',width: 160,align: 'center'},
            {title: '联系方式',key: 'phone',width: 160,align: 'center'},
            {title: '头像',key: "thumb",width: 80,align: 'center', 
                render: (h,params) => {
                    var _this = this;
                    return h('img',{
                        props: {type: 'primary',size: 'small'},
                        attrs: {src: params.row.thumb, style: 'width: 40px;height: 40px;border-radius: 2px;'},
                        style: {marginRight: '5px'},
                        on:{click(e){
                            _this.setuploaddatas (params.row.id);
                            _this.visible2=true;
                            var thumb = params.row.thumb.replace("http","https");
                            _this.defaultList= [{name:"",url : thumb}];
                        }}
            　　　　 });
    　　　　     }
            },
            {title: '注册时间',key: 'date',width: 180,align: 'center',},
            {title: '注册地点',key: 'registeraddress',width: 180,align: 'center',},
            {title: '注册IP',key: 'ip',width: 180,align: 'center',},
            {title: '身份证号',key: 'card',width: 180,align: 'center',},
            {title: '城市',key: 'address',width: 250,align: 'center',},
            {title: '操作',key: 'action',width: 200,options: ['delete'],align: 'center',fixed: 'right',
                render: (h, params) => {
                    var _this = this;
                    return h('div', [
                        h('Button', {props: {type: 'primary',size: 'small'},style: {marginRight: '5px'},on: {click: () => {this.show(params.index)}}}, '查看'),
                        h('Button', {
                            props: {type: 'success',size: 'small'},style: {marginRight: '5px'},
                                on: {click: () => {
                                    params.row.city = params.row.address.split("-");
                                    this.editformValidate = params.row;
                                    this.editformValidate.gender = params.row.gender === "男" ? "male" : params.row.gender === "女" ? "female" : "";
                                    this.editformValidate.desc = params.row.mydesc;
                                    this.editmodal = true;
                                }
                            }
                        },"编辑"),
                        h('Poptip', {props: { placement:"top",transfer:true, confirm:true,title:"你确定要删除该项吗？",},
                            on: {click: () => {},"on-ok":()=>{_this.deladmin(params.row.id)},"on-cancel":()=>{console.log(0)}}
                        }, [h("Button",{props:{type: 'error',size: 'small',}},"删除")])
                    ]);
                }
            },
        ],
    }
  },
  computed:{
    addressdata:function(){
        var e = addressJson.citylist;
        var city = {};
        var p = [];
        if(e.length !== 0){
            e.map((item,index)=>{
                p[index]={};
                p[index].value = item.p;
                p[index].label = item.p;
                p[index].children = [];
                if(item.c){
                    item.c.map((item2,index2)=>{
                        p[index].children[index2] = {};
                        p[index].children[index2].value = item2.n;
                        p[index].children[index2].label = item2.n;
                        p[index].children[index2].children = [];
                        if(item2.a){
                            item2.a.map((item3,index3)=>{
                                p[index].children[index2].children[index3] = {};
                                p[index].children[index2].children[index3].value = item3.s;
                                p[index].children[index2].children[index3].label = item3.s;
                            })
                        }
                    })
                }
            })
        }
        return p
    }
  },
  mounted(){
    // 初始信息加载
    this.getAdminInfo();
    this.setDefaultSearchKey();
  },
  created(){
    // 获取地理信息
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src= "http://pv.sohu.com/cityjson?ie=utf-8";
    head.appendChild(script);
    var that = this;
    setTimeout(function(){that.returnCitySN = returnCitySN;},5000)
    this.citydata = this.addressdata;
  },
  methods: {
    //  重置搜索内容
    resetSearch(){
        this.getAdminInfo();
        this.setDefaultSearchKey();
        this.$Message.success('重置成功');
    },
    setDefaultSearchKey () {
      this.searchKey = this.columns2[0].key !== 'action' ? this.columns2[0].key : (this.columns2.length > 1 ? this.columns2[1].key : '')
    },
    // 搜索
    handleSearch () {
      this.data = this.data.filter(item => item[this.searchKey].indexOf(this.searchValue) > -1)
      this.searchValue = "";
    },
    // 导出表格
    exportExcel () {
      this.$refs.tables.exportCsv({
        filename: `table-${(new Date()).valueOf()}.csv`
      })
    },
    // 获取信息
    getAdminInfo(){
        var that = this;
        admin().then(function(res){
            var data = res.data;
            data.map((item,index)=>{
                item.id = String(item.id)
                item.thumb = "http://localhost:3000"+(item.thumb.substr(8))
            })
            that.data = data;
            that.total = data.length;
            that.loading = false;
        }).catch(function(error){
            console.log(error)
        })
    },
    // 显示 单个管理员信息
    show (index) {
        this.$Modal.info({
            title: '管理员信息信息',
            content: `用户ID：${this.data[index].id}<br>用户名：${this.data[index].username}<br>姓名：${this.data[index].name}<br>地址：${this.data[index].address}<br>注册时间：${this.data[index].date}<br>身份证号：${this.data[index].card}<br>`
        })
    },
    // 设置 上传文件 携带数据
    setuploaddatas (e) {
        this.uploaddatas.id = e;
    },
    // 点击上传文件
    upload () {
        this.$refs.upload.post(this.file);
        this.loadingStatus = true;
    },
    // 文件上传之前 
    handleBeforeUpload (file) {
        this.file = file;
        return false;
    },
    // 文件上传时 -- 没效果
    handleprogress(event){
        // console.log(event)
    },
    // 文件上传成功 重新获取数据  
    handleSuccess (res, file) {
        var that = this;
        this.getAdminInfo();
        this.loadingStatus = false;
        this.visible2 = false;

    },
    // 文件上传失败  -- 没效果
    handleErroe (error){
        that.$Message.error("上传失败，请重试！");
    },
    // 文件上传 格式错误
    handleFormatError (file) {
        this.$Notice.warning({
            title: '文件格式不正确',
            desc: '文件格式 ' + file.name + ' 不正确，请选择jpg或png。'
        });
    },
    // 文件上传 大小错误
    handleMaxSize (file) {
        this.$Notice.warning({
            title: '超出文件大小限制',
            desc: '文件 ' + file.name + ' 太大，不超过2M。'
        });
    },
    addadmin (){
        this.$Message.info({content:"欢迎添加后台管理员，误操作会影响你的正常工作，且不会保存数据，请正常操作！",duration:2.5});
        this.addmodal = true;
    },
    // 添加管理员 model 取消事件
    cancel () {
        this.handleReset('formValidate');
        this.$Message.info('Clicked cancel');
    },
    // 添加管理员 表单验证
    handleSubmit (name) {
        var addform = this.formValidate;
        this.$refs[name].validate((valid) => {
            if (valid) {
                // 整理后台
                var nform = {};
                    nform.nusername = addform.username,                     //用户名
                    nform.nname = addform.name ? addform.name : '-1',         //姓名
                    nform.npassword = addform.passwd,                       //密码
                    nform.nphone = addform.phone,                           //手机号
                    nform.ncard = addform.card ? addform.card : '-1',         //身份证号
                    nform.ncity = addform.city == "" ? "-1" : addform.city.join('-'),     //地址
                    nform.ngender = addform.gender === "male" ? "男" : addform.gender === "female" ? "女" : '-1',   //性别
                    nform.ndesc = addform.desc ? addform.desc : '-1',         //备注
                    nform.nip = this.returnCitySN.cip,
                    nform.nregisteraddress = this.returnCitySN.cname;
                // 传数据
                var that = this;
                addAdmin(nform).then(function(res){
                    var data = res.data;
                    if(data.status === 201){
                        that.$Message.warning(data.message);
                        that.handleReset("formValidate");
                        that.addmodal = false;
                    }else if(data.status === 200){
                        that.$Message.success(data.message);
                        that.getAdminInfo();
                        that.addmodal = false;
                    }
                }).catch(function(error){
                    console.log(error)
                })
            } else {
                this.$Message.error('Fail!');
            }
        })
    },
    // 删除admin
    deladmin(id){
        var _this = this;
        delAdmin(id).then(function(res){
            var data = res.data;
            if(data.status === 200){
                _this.$Message.success(data.message);
                _this.getAdminInfo();
            }
        }).catch(function(error){
            console.log(error)
        })
    },
    // 重置 添加管理员表单
    handleReset (name) {this.$refs[name].resetFields();},
    // 编辑管理员 model 确定事件
    editok(){console.log('editok')},
    // 编辑管理员 model 取消事件
    editcancel(){console.log('editcancel')},
    // 编辑管理员 表单验证
    edithandleSubmit (name) {
        var addform = this.editformValidate;
        this.$refs[name].validate((valid) => {
            if (valid) {
                var nform = {};
                    nform.nid = Number(addform.id),
                    nform.nusername = addform.username,                     //用户名
                    nform.nname = addform.name ? addform.name : -1,         //姓名
                    nform.npassword = addform.password,                       //密码
                    nform.nphone = addform.phone,                           //手机号
                    nform.ncard = addform.card ? addform.card : -1,         //身份证号
                    nform.ncity = addform.city == "" ? "-1" : addform.city.join('-'),     //地址
                    nform.ngender = addform.gender === "male" ? "男" : addform.gender === "female" ? "女" : '-1',   //性别
                    nform.ndesc = addform.desc ? addform.desc : -1;         //备注
                // 传数据
                var that = this;
                editAdmin(form).then(function(res){
                    var data = res.data;
                    if(data.status === 200){
                        that.$Message.success(data.message);
                        that.getAdminInfo()
                        that.editmodal = false;
                    }
                }).catch(function(error){
                    console.log(error)
                })
            } else {
                this.$Message.error('Fail!');
            }
        })
    },
    // 重置 编辑管理员表单
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
