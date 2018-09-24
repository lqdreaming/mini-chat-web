<template>
  <div class="VerifyPhone">
    <div class="bg">
    </div>
    <div>
      <div class="content">
        <div class="title">
          {{contentTitle}}
        </div>
        <div class="details">
            {{contentDetail}}
        </div>
        <input class="input " v-bind:class="{ active: inputPhone, phoneActive: inputPhone, phone:!inputPhone}" type="tel" maxlength="11"  @focus="phoneNumFocus()" autofocus="autofocus"
               v-model="phone" placeholder="请输入手机号码">
        <div class="code-content">
          <input class="input " type="tel" maxlength="6"  @focus="codeFocus()" v-bind:class="{ active: !inputPhone , codeActive: !inputPhone , code:inputPhone}"
                v-model="code" placeholder="请输入验证码">
          <el-button id="codeBtn" :disabled=getCodeBtnDisable type="primary" round class="button" v-on:click="getVerifyCode()">{{codeContent}}</el-button>
        </div>
        <el-button id="confirmBtn" :disabled=confirmBtnDisable type="primary" round class="button" v-on:click="checkVerifyCode()">确认</el-button>
      </div>
      <div class="keyboard">
        <keyboard @_getInput="getInput"/>
      </div>
      <div>
        <img  ondragstart="return false" @click="close" class="closeBtn" src="../../static/close.png">
      </div>
    </div>
    <!-- <keyboard/> -->
  </div>
</template>

<script>
import Keyboard from './keyboard.vue'
import Conf from '@/conf/conf.js'
import axios from 'axios'
import Store from '@/tool/store.js'

export default {
  name: 'VerifyPhone',
  data () {
    return {
      inputPhone: true,
      phone: '',
      code: '',
      confirmBtnDisable: true,
      confirmBtnflag: true,
      getCodeBtnDisable: true,
      isCount: false,
      count: 60,
      codeContent: '获取验证码',
    }
  },
  props: {
    contentDetail: {
       type: String,
       default: '验证完立即开始连线，老师正在等您噢~',
    },
    contentTitle: {
       type: String,
       default: '手机号验证',
    },
  },
  components:{
    Keyboard
  },
  methods: {
    getInput: function(type, value){
      // console.info(type)
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
        this.confirmBtnflag = true
      }
      if(this.phone.slice(10,11) != "" && this.code.slice(5,6) != ""){
        this.confirmBtnDisable = false
      }else{
        this.confirmBtnDisable = true
      }
      if(this.phone.slice(10,11) != "" && !this.isCount){
        this.getCodeBtnDisable = false
      }else{
        this.getCodeBtnDisable = true
      }
    },
    phoneNumFocus: function(){
      this.inputPhone = true
    },
    codeFocus: function(){
      this.inputPhone = false
    },
    close: function(){
      this.$emit('close')
    },
    getVerifyCode: function(){
      var that = this
      console.info('clockskd')
      axios.get(Conf.API + '/smsCode/' + that.phone)
        .then(function (response) {
          var responseData = response.data.data
          console.log(response.data.code);
            if (response.data.code === 0){
                that.getCodeBtnDisable = true
                that.isCount = true
                // that.$message('验证码发送成功');
                var doingCountDown = function(){
                  setTimeout(function(){
                    if(that.count >= 1){
                      that.count--
                      that.codeContent = that.count +　's'
                      if(that.count === 0){
                        setTimeout(function(){
                          that.isCount = false
                          that.getCodeBtnDisable = false
                          that.codeContent = '获取验证码'
                          that.count = 60
                        },1000)
                      }else{
                        doingCountDown()
                      }
                    }
                  },1000)
                }
                doingCountDown()

            }else if(response.data.code === 400){
              that.getCodeBtnDisable = true
              that.$message({
                message: '输入手机号格式不正确'
              });
            }
        })
        .catch(function (response) {
          console.log(response)
        })
    },
    checkVerifyCode: function(){
      var that = this
      axios.get(Conf.API + '/smsCode/' + that.phone + '/' + that.code, {
        headers: {
            'X-Uid': Store.fetch('uid')
        }})
        .then(function (response) {
          var responseData = response.data.data

            if (response.data.code === 0){
              console.log("验证码正确");
              that.$emit('verify')
            }else{
              that.$emit('verifyFail')
              // that.confirmBtnDisable = true
              that.confirmBtnflag = false
            }
        })
        .catch(function (response) {
          console.log(response)
        })
    }
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
  position: relative;
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
  background-color: rgba(90, 90, 90, 0.8);
  z-index: 5;
  box-shadow: 0 4px 8px 2px rgba(204, 99, 128, 0.50);
}
.content{
  position: absolute;
  right: 0;
  width: 450px;
  margin-right: 50px;
  margin-top: 100px;
  z-index: 10;
}
.input {
  color: #999999;
  height: 70px;
  font-size: 25px;
  margin-top: 50px;
  border-radius: 15px;
  border: none;
  padding-left: 60px;
  letter-spacing: 2px;
  outline:none;
  z-index: 10;
}
.active{
  border:2px solid #fa8dcc;
  height: 75px;
  font-size: 28px;
  color: #000;
}
.phone {
  width: 400px;
  background: url("../assets/register-icon-phone.png") 10px no-repeat #F5F0F0;
  z-index: 10;
}
.phoneActive {
  width: 400px;
  background: url("../../static/register-icon-phone-red.png") 12px no-repeat #F5F0F0;
  z-index: 10;
}
.codeActive {
  position: absolute;
  width: 200px;
  left: 0;
  background: url("../../static/register-icon-code-red.png") 12px no-repeat #F5F0F0;
  z-index: 10;
}
.code {
  position: absolute;
  width: 200px;
  left: 0;
  background: url("../assets/register-icon-code.png") 10px no-repeat #F5F0F0;
  z-index: 10;
}
.title{
  color: #ffffff;
  font-size: 35px;
  z-index: 10;
}
.details{
  margin-top: 30px;
  color: #ffffff;
  font-size: 20px;
  text-align: left;
  z-index: 10;
}
#confirmBtn{
  position: absolute;
  margin-top: 175px;
  right: 0;
  margin-right: 15px;
  height: 70px;
  width: 400px;
  font-size: 25px;
  z-index: 10;
}
#codeBtn{
  position: absolute;
  margin-top: 52px;
  margin-left: 78px;
  height: 70px;
  width: 155px;
  font-size: 25px;
  z-index: 10;
}
.closeBtn{
  position: absolute;
  z-index: 1;
  right: 0;
  margin-right: 10px;
  margin-top: 10px;
  width: 80px;
  z-index: 10;
  // margin-left: 100px;
}

.closeBtn:active {
  margin-right: 5px;
  margin-top: 5px;
  width: 90px;
}
</style>
