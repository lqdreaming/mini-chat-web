<template>
  <div class="box-register">
    <div class="box-register-form">
      <div class="container">
        <div class="box-register-label">
          <input class="label-input phone" type="tel" v-model.trim="phone" maxlength="11"
                 placeholder="请输入手机号码" @click="defaultClick">
          <!--<span class="label-input phone" :class="(/[^\x00-\xff]+/.test(phone)) && 'default'"-->
          <!--@click="defaultClick('phone')">{{phone}}</span>-->
        </div>
        <div class="box-register-label">
          <input class="label-input code" type="tel" v-model.trim="code" @change="onChangeCode" maxlength="6"
                 placeholder="请输入验证码">
          <!--<span class="label-input code" :class="(/[^\x00-\xff]+/.test(code)) && 'default'"-->
          <!--@click="defaultClick('code')">{{code}}</span>-->
          <CountdownButton classes="box-register-btn code-btn" :currentClass="btnActive"
                           :activeClass="btnActive" :disabledClass="btnDisabled" defaultText="获取验证码"
                           updateText="s后重新获取" :countDownSec="60"
                           @btnClick="getVerifyCode"></CountdownButton>
          <!--<input type="button" class="box-register-btn" value="确定" @click="submitForm">-->
          <keyboard v-if="keyboardStatus"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import CountdownButton from './CountdownButton';
  import Keyboard from './keyboard.vue';
  // import serve from '../../../common/js/serve.js';
  // import * as api from '../../../api/box.js';

  export default {
    name: "register",
    components: {
      CountdownButton,
      Keyboard
    },
    data () {
      return {
        canClick: false,
        showRegisterBox: false,
        phone: '',
        code: '',
        btnActive: 'btn-active',
        btnDisabled: 'btn-disabled',
        keyboardStatus: true, //初始化键盘状态
        currentType: '', //当前激活的类型
        uid: ''
      };
    },
    // created () {
    //   // get uid
    //   serve.httpRequestMsg({
    //     headers: this.headers
    //   }, api.getUID, ({code, data, msg}) => {
    //     this.uid = data;
    //   });
    // },
    methods: {
      onChangeCode: function (e) {
        let val = e.target.value;

        if (val.length === 6) {
          this.submitForm();
          console.log('go to finish');
        }
      },
      // submitForm () {
      //验证手机号码格式
      // if (!this.checkTelphone() || !this.checkCode()) {
      //   return;
      // }

      // }
      // this.$loading();
      //   serve.httpRequestMsg({
      //     params: {
      //       phone: this.phone,
      //       code: this.code
      //     },
      //     headers: this.headers
      //   }, api.checkVerifyCode, ({code, data, msg}) => {
      //     this.$loading.end();
      //     if (code === 0) {
      //       // this.$emit('verify', true);
      //       this.$router.push('/question-tip');
      //     } else {
      //       if (msg.indexOf('验证码') > -1) {
      //         this.code = '';
      //       } else if (msg.indexOf('手机号') > -1) {
      //         this.phone = '';
      //       }
      //       this.$loading({
      //         type: "no",
      //         tips: msg
      //       });
      //     }
      //   });
      // },
      // ,
      defaultClick (type) {
        this.keyboardStatus = true;
        if (/[^\x00-\xff]+/.test(this[type])) {
          this[type] = '';
        }
        if (type === 'phone') {
          this.currentType = 'phone';
          this.code = /\d+/.test(this.code) ? this.code : '';
        } else if (type === 'code') {
          this.currentType = 'code';
          this.phone = /\d+/.test(this.phone) ? this.phone : '';
        }
      },
      //获取验证码
      getVerifyCode: function () {
        //   if (!this.checkTelphone()) {
        //     return;
        //   }
        //   serve.httpRequestMsg({
        //     params: {
        //       phone: this.phone
        //     },
        //     headers: this.headers
        //   }, api.getVerifyCode, ({code, data, msg}) => {
        //     if (code === 0) {
        //       this.$loading({
        //         type: "yes",
        //         tips: "验证码获取成功"
        //       });
        //     } else {
        //       this.$loading({
        //         type: "no",
        //         tips: msg
        //       });
        //     }
        //   });
      }
      // //验证手机号码格式
      // checkTelphone () {
      //   this.keyboardStatus = false;
      //   if (!(/^1[3456789]\d{9}$/.test(this.phone))) {
      //
      //     this.$loading({
      //       type: "no",
      //       tips: "请输入正确格式的手机号码！"
      //     });
      //     return false;
      //   }
      //   return true;
      // },
      // checkCode () {
      //   this.keyboardStatus = false;
      //   if (this.code.length !== 6) {
      //
      //     this.$loading({
      //       type: "no",
      //       tips: "请输入6位验证码"
      //     });
      //     return false;
      //   }
      //   return true;
      // }
      // }
    },
  }
</script>

<style type="text/scss" lang="scss" scoped>
  @function boxrem($px) {
    @return ($px / 75 * 2) * 1rem;
  }

  .box-register {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 600;
    // background: url("../assets/register-bg.png") fixed no-repeat;
    background-size: 100% 100%;

    .box-register-form {
      width: 100%;
      position: absolute;
      bottom: boxrem(167);
      display: flex;
      justify-content: center;
      & > div {
        background: #ffffff;
        width: boxrem(600);
        height: boxrem(188);
        border-radius: boxrem(8);
        padding: boxrem(60) boxrem(90);
      }
    }
    .box-register-label {
      font-size: boxrem(48);
      color: #fff;
      &:last-child {
        display: flex;
      }
      .label-input {
        background: #F5F0F0;
        border: 1px solid #CCC8C8;
        color: #999999;
        line-height: boxrem(88);
        height: boxrem(88);
        font-size: boxrem(28);
        border-radius: boxrem(8);
        /*margin: 0 boxrem(32);*/
        padding-left: boxrem(64);
        width: boxrem(520);
        &.phone {
          letter-spacing: boxrem(4);
          margin-bottom: boxrem(16);
          background: url("../assets/register-icon-phone.png") 10px no-repeat #F5F0F0;
          background-size: boxrem(24) boxrem(36);
        }
        &.code {
          width: boxrem(280);
          letter-spacing: boxrem(2);
          background: url("../assets/register-icon-code.png") 10px no-repeat #F5F0F0;
          background-size: boxrem(24) boxrem(36);
          /*display: inline-block;*/
        }
        &.default {
          font-weight: normal;
          color: #ccc;
        }
      }
    }
    .box-register-btn {
      background: #E62877;
      border-radius: boxrem(8);
      font-size: boxrem(28);
      width: boxrem(232);
      height: boxrem(92);
      line-height: boxrem(92);
      text-align: center;
      margin-left: boxrem(8)
      /*display: inline-block;*/
    }
  }
</style>
