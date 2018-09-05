<template>
  <div class="VerifyPhone">
    <div class="bg">
    </div>
    <div>
      <div class="content">
        <input class="input phone" type="tel" maxlength="11"  @focus="phoneNumFocus()" autofocus="autofocus"
               v-model="phone" placeholder="请输入手机号码">
        <div class="code-content">
          <input class="input code" type="tel" maxlength="6"  @focus="codeFocus()"
                v-model="code" placeholder="请输入验证码">
          <el-button id="codeBtn" type="primary" round class="button">获取验证码</el-button>
        </div>
      </div>
      <div class="keyboard">
        <keyboard @_getInput="getInput"/>
      </div>
    </div>
    <!-- <keyboard/> -->
  </div>
</template>

<script>
import Keyboard from './keyboard.vue'

export default {
  name: 'VerifyPhone',
  data () {
    return {
      inputPhone: true,
      phone: '',
      code: '',
    }
  },
  components:{
    Keyboard
  },
  methods: {
    getInput: function(type, value){
      console.info(type)
      if(type == 'num'){
        if(this.inputPhone){
          this.phone += value
          this.phone = this.phone.slice(0,11)
        }else{
          this.code += value
          this.code = this.code.slice(0,6)
        }
      }else{
        if(this.inputPhone){
          this.phone = this.phone.slice(0,-1)
        }else{
          this.code = this.code.slice(0,-1)
        }
      }
    },
    phoneNumFocus: function(){
      this.inputPhone = true
    },
    codeFocus: function(){
      this.inputPhone = false
    },
  }
}
</script>


<style scoped lang="scss">
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
.VerifyPhone{
  position: absolute;
  // // width: 200px;
  height: 1080px;
  overflow: hidden;
}
.bg {
  position: absolute;
  top: 0;
  // bottom: 0;
  right: 0;
  margin: auto;
  height: 1080px;
  width: 550px;
  background-color: rgba(90, 90, 90, 0.5);
  z-index: 0;
  box-shadow: 0 4px 8px 2px rgba(204, 99, 128, 0.50);
}
.content{
  position: absolute;
  right: 0;
  width: 450px;
  margin-right: 50px;
  margin-top: 200px;
}
.input {
  color: #999999;
  height: 70px;
  font-size: 25px;
  margin-top: 30px;
  border-radius: 15px;
  border: none;
  padding-left: 60px;
  letter-spacing: 2px;
  outline:none;
}
.phone {
  width: 400px;
  background: url("../assets/register-icon-phone.png") 10px no-repeat #F5F0F0;
}
.code {
  position: absolute;
  width: 200px;
  left: 0;
  background: url("../assets/register-icon-code.png") 10px no-repeat #F5F0F0;
}
#codeBtn{
  position: absolute;
  margin-top: 32px;
  margin-left: 78px;
  height: 70px;
  font-size: 25px;
}
</style>
