<template>
    <div>
        <Card>
            <Button @click="reset" type="primary">重新获取数据</Button>
            <Collapse v-model="value1">
                <Panel name="1">
                    清理上传空文件夹 
                    <div slot="content">
                        <Button @click="delnullfile" type="error">点击清理</Button>
                    </div>
                </Panel>
                <Panel name="2">
                    文章图片管理
                    <div slot="content">
                        <Button @click="delimg" type="error">删除废用图片</Button>
                        <div style="display:flex;justify-content: space-around;">
                            <ul>
                                <p>所有图片({{notice_news_allimg.length}})</p>
                                <li v-for="(item,index) in notice_news_allimg" :key="index">{{item}}</li>
                            </ul>
                            <ul>
                                <p>正在使用({{notice_news_nowuseimg.length}})</p>
                                <li v-for="(item,index) in notice_news_nowuseimg" :key="index">{{item}}</li>
                            </ul>
                        </div>
                        
                    </div>
                </Panel>
                <Panel name="3">
                    管理员图片管理
                    <div slot="content">
                        <Button @click="deladmin" type="error">删除废用图片</Button>
                        <div style="display:flex;justify-content: space-around;">
                            <ul>
                                <p>所有图片({{admin_allimg.length}})</p>
                                <li v-for="(item,index) in admin_allimg" :key="index">{{item}}</li>
                            </ul>
                            <ul>
                                <p>正在使用({{admin_nowuseimg.length}})</p>
                                <li v-for="(item,index) in admin_nowuseimg" :key="index">{{item}}</li>
                            </ul>
                        </div>
                        
                    </div>
                </Panel>
                <Panel name="4">
                    广告图片管理
                    <div slot="content">
                        <Button @click="deladvertisement" type="error">删除废用图片</Button>
                        <div style="display:flex;justify-content: space-around;">
                            <ul>
                                <p>所有图片({{advertisement_allimg.length}})</p>
                                <li v-for="(item,index) in advertisement_allimg" :key="index">{{item}}</li>
                            </ul>
                            <ul>
                                <p>正在使用({{advertisement_nowuseimg.length}})</p>
                                <li v-for="(item,index) in advertisement_nowuseimg" :key="index">{{item}}</li>
                            </ul>
                        </div>
                        
                    </div>
                </Panel>
            </Collapse>
        </Card>
    </div>
</template>
<script>
import {database_notice_news,database_delnotice_news,database_admin,database_deladmin,database_advertisement,database_deladvertisement,database_delnullfile} from '@/api/system'
export default {
    name: 'abandoned_picture_management',
    data(){
        return {
            value1 : "",
            notice_news_allimg:[],
            notice_news_nowuseimg:[],
            admin_allimg:[],
            admin_nowuseimg:[],
            advertisement_allimg:[],
            advertisement_nowuseimg:[],
        }
    },
    created(){
        this.getAdminInfo();
        this.getadminimg();
        this.getadvertisement();
    },
    methods:{
        //   获取管理员信息
        getAdminInfo(){
            var _this = this;
            database_notice_news().then((res)=>{
                var data = res.data;
                _this.notice_news_allimg = data.data.allimg;
                _this.notice_news_nowuseimg = data.data.nowuseimg;
            }).catch(function(error){
                console.log(error)
            })
        },
        // 重新获取文章数据
        reset(){
            this.getAdminInfo();
            this.getadminimg();
            this.getadvertisement();
            this.$Message.success('重置成功');
        },
        delimg(){
            var _this = this;
            database_delnotice_news().then((res)=>{
                var data = res.data;
                if(data.status === 200){
                    _this.$Message.success(data.message);
                }
                _this.getAdminInfo();
            }).catch(function(error){
                console.log(error)
            })
        },
        getadminimg(){
            var _this = this;
            database_admin().then((res)=>{
                var data = res.data;
                _this.admin_allimg = data.data.allimg;
                _this.admin_nowuseimg = data.data.nowuseimg;
            }).catch(function(error){
                console.log(error)
            })
        },
        deladmin(){
            var _this = this;
            database_deladmin().then((res)=>{
                var data = res.data;
                if(data.status === 200){
                    _this.$Message.success(data.message);
                }
                _this.getadminimg();
            }).catch(function(error){
                console.log(error)
            })
        },
        getadvertisement(){
            var _this = this;
            database_advertisement().then((res)=>{
                var data = res.data;
                _this.advertisement_allimg = data.data.allimg;
                _this.advertisement_nowuseimg = data.data.nowuseimg;
            }).catch(function(error){
                console.log(error)
            })
        },
        deladvertisement(){
            var _this = this;
            database_deladvertisement().then((res)=>{
                var data = res.data;
                if(data.status === 200){
                    _this.$Message.success(data.message);
                }
                _this.getadvertisement();
            }).catch(function(error){
                console.log(error)
            })
        },
        // 清理空文件夹
        delnullfile(){
            var _this = this;
            database_delnullfile().then((res)=>{
                var data = res.data;
                if(data.status === 200){
                    _this.$Message.success(data.message);
                }
            }).catch(function(error){
                console.log(error)
            })
        }
    }
}
</script>