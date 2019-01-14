<template>
  <div v-if="showFullScreenBtn" class="full-screen-btn-con">
    <Tooltip :content="value ? '退出全屏' : '全屏'" placement="bottom">
      <Icon @click.native="handleChange" :type="value ? 'md-contract' : 'md-expand'" :size="23"></Icon>
    </Tooltip>
  </div>
</template>

<script>
export default {
  name: 'lockScreen',
  lockScreenSize: 0,
  showUnlock:false,
  methods: {
    lock() {
        let lockScreenBack = document.getElementById('lock_screen_back');
        if(lockScreenBack){
        lockScreenBack.style.transition = 'all 3s';
        lockScreenBack.style.zIndex = "10000";
        lockScreenBack.style.boxShadow = '0 0 0 ' + this.lockScreenSize + 'px #667aa6 inset';
        this.showUnlock = true;
        let name=this.$route.name?this.$route.name:'';
        Cookies.set('last_page_name', name);
        setTimeout(() => {
            lockScreenBack.style.transition = 'all 0s';
            this.$router.push({
                name: 'locking'
            });
        }, 800);
        Cookies.set('locking', '1');}
    },
    handleChange () {
      this.handleFullscreen()
    },  
    mounted () {
        let lockdiv = document.createElement('div');
        lockdiv.setAttribute('id', 'lock_screen_back');
        lockdiv.setAttribute('class', 'lock-screen-back');
        document.body.appendChild(lockdiv);
        let lockScreenBack = document.getElementById('lock_screen_back');
        let x = document.body.clientWidth;
        let y = document.body.clientHeight;
        let r = Math.sqrt(x * x + y * y).toString();
        let size = parseInt(r);
        this.lockScreenSize = size;
        window.addEventListener('resize', () => {
            let x = document.body.clientWidth;
            let y = document.body.clientHeight;
            let r = Math.sqrt(x * x + y * y).toString();
            let size = parseInt(r);
            this.lockScreenSize = size;
            lockScreenBack.style.transition = 'all 0s';
            lockScreenBack.style.width = lockScreenBack.style.height = size + 'px';
        });
        lockScreenBack.style.width = lockScreenBack.style.height = size + 'px';
    }
  }
}
</script>
<style lang="less">
.lock-screen-btn-con .ivu-tooltip-rel{
  height: 64px;
  line-height: 56px;
  i{
    cursor: pointer;
  }
}
</style>

