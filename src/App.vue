<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  created(){

  },
  mounted(){
    var name = this.$store.state.user.userName;
    var unreadCount = this.$store.state.user.unreadCount;
    var that = this;
    if(name !== ""){
      if(unreadCount === 0){
        this.$Notice.warning({title: '通知提醒',desc: `欢迎回来,${name}。`,duration: 0});
      }else{
        this.$Notice.warning({
          title: '通知提醒',
          desc: ` `,
          duration: 0,
          render: h => {
            return h('div', [
              `欢迎回来,${name},您当前有 `,
              h('a', {on:{click:function(){that.$router.push('/message/message_page')}}},`${unreadCount}`),
                ' 条未读信息，请点击查看！'
              ])
            }
        });
      }
    }
  },
  methods:{

  }
}
</script>

<style lang="less">
.size{
  width: 100%;
  height: 100%;
}
html,body{
  .size;
  overflow: hidden;
  margin: 0;
  padding: 0;
}
#app {
  .size;
}
</style>
