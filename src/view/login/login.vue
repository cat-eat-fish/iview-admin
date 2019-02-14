<style lang="less">
  @import './login.less';
</style>

<template>
  <div class="login">
    <div class="login-con">
      <Card icon="log-in" title="欢迎登录" :bordered="false">
        <div class="form-con">
          <login-form @on-success-valid="handleSubmit"></login-form>
          <p class="login-tip">如登录有误，请联系管理员</p>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import {login,getUserInfo} from '@/api/user'
import LoginForm from '_c/login-form'
import { mapActions } from 'vuex'
export default {
  components: {
    LoginForm
  },
  methods: {
    ...mapActions([
    //   'handleLogin',
      'getUserInfo'
    ]),
    handleSubmit({userName,password}){
        userName = userName.trim()
        // var token = this.$store.state.user.token === false ? '' : this.$store.state.user.token;
        login({userName,password}).then(res => {
          const data = res.data
          if(data.status === 401){
            this.$Message.error(data.message)
          }else if(data.status === 402){
            this.$Message.error(data.message)
          }else{
            this.$store.commit('setToken', data.token);
            this.$store.commit('setUser', userName);
            this.getUserInfo(this.$store.state.user.token,this.$store.state.user.user).then(res => {
              this.$Message.success(data.message)
              this.$router.push({
                name: this.$config.homeName
              })
            })
          }
        }).catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style>

</style>
