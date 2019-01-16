<template>
    <div>
        <Card>
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
                        <Button @click="reset" type="primary">重新获取数据</Button>
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
                <Panel name="2">
                    管理员图片管理
                    <div slot="content">
                        <Button @click="resetadminimg" type="primary">重新获取数据</Button>
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
            </Collapse>
        </Card>
    </div>
</template>
<script>
export default {
    name: 'ad_pictures',
    data(){
        return {
            value1 : "",
            notice_news_allimg:[],
            notice_news_nowuseimg:[],
            admin_allimg:[],
            admin_nowuseimg:[],
        }
    },
    created(){
        this.getAdminInfo();
    },
    methods:{
        //   获取管理员信息
        getAdminInfo(){
            var _this = this;
            this.$axios({method: 'post',url: '/api/database/notice_news'})
            .then(function(res){
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
            this.$Message.success('重置成功');
        },
        delimg(){
            var _this = this;
            this.$axios({method: 'post',url: '/api/database/delnotice_news'})
            .then(function(res){
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
            this.$axios({method: 'post',url: '/api/database/adminimg'})
            .then(function(res){
                var data = res.data;
                _this.admin_allimg = data.data.allimg;
                _this.admin_nowuseimg = data.data.nowuseimg;
            }).catch(function(error){
                console.log(error)
            })
        },
        //重新获取管理员图片
        resetadminimg(){

        },


        // 清理空文件夹
        delnullfile(){
            var _this = this;
            this.$axios({method: 'post',url: '/api/database/delnullfile'})
            .then(function(res){
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