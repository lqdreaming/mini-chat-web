<template>
  <div class="index">
    <div>
      <div class="user-info">
        <div>
          <div class="return-btn" @click="backHome()"></div>
        </div>
        <div>
          <div class="user-gender-title">
            <!--<div>男神/女神</div>-->
            <div>情感状况</div>
          </div>
          <!--<div>{{ruleForm.index}}</div>-->
          <!--<div class="user-gender" v-if="index===0">-->
          <!--<div data-sex="1" class="male" @click="selectGenger(1)"></div>-->
          <!--<div data-sex="2" class="female" @click="selectGenger(2)"></div>-->
          <!--</div>-->


          <!--<div class="user-gender-sex">-->
          <!--<div class="box-user-info-radio-group age-radio">-->
          <!--<input id="slider"  type="range" min="0" max="550" step="1"  />-->
          <!--</div>-->
          <!--</div>-->


          <div class="user-marriage">
          <div class="box-radio-group"><label class="radio-item"><input type="radio" name="marriage" value="1"
          hidden="hidden">
          <div class="radio-btn" @click="selectMarriage(1)"></div>
          <strong>单身</strong></label> <label class="radio-item"><input type="radio" name="marriage" value="2"
          hidden="hidden">
          <div class="radio-btn" @click="selectMarriage(2)"></div>
          <strong>热恋</strong></label> <label class="radio-item"><input type="radio" name="marriage" value="3"
          hidden="hidden">
          <div class="radio-btn" @click="selectMarriage(3)"></div>
          <strong>已婚</strong></label> <label class="radio-item"><input type="radio" name="marriage" value="4"
          hidden="hidden">
          <div class="radio-btn" @click="selectMarriage(4)"></div>
          <strong>离异</strong></label></div>
          </div>

        </div>
      </div> <!----></div>


    <!--<h1>请输入您以下的基本信息</h1>-->
    <!--<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">-->

    <!--<el-form-item label="性别" prop="gender">-->
    <!--<el-radio-group v-model="ruleForm.gender">-->
    <!--<el-radio label="1">男</el-radio>-->
    <!--<el-radio label="2">女</el-radio>-->
    <!--</el-radio-group>-->
    <!--</el-form-item>-->

    <!--<el-form-item label="年龄" prop="age">-->
    <!--<el-input v-model="ruleForm.age" placeholder="请输入整数" type="number" class="age-input"></el-input>-->
    <!--</el-form-item>-->

    <!--<el-form-item label="情感状况">-->
    <!--<el-radio-group v-model="ruleForm.marriage">-->
    <!--<el-radio label="1">单身</el-radio>-->
    <!--<el-radio label="2">恋爱</el-radio>-->
    <!--<el-radio label="3">结婚</el-radio>-->
    <!--<el-radio label="4">离婚</el-radio>-->
    <!--</el-radio-group>-->
    <!--</el-form-item>-->

    <!--<el-form-item class="btn-content">-->
    <!--<el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>-->
    <!--<el-button @click="resetForm('ruleForm')">重置</el-button>-->
    <!--</el-form-item>-->

    <!--</el-form>-->
  </div>
</template>


<script>
  import Conf from '@/conf/conf.js'
  import axios from 'axios'
  import Store from '@/tool/store.js'
  import index from '../router'

  export default {
    data () {

      return {
        ruleForm: {
          gender: '1',
          age: '20',
          marriage: '2',
        },
      }
    },
    methods: {
      backHome () {
        alert('回到主页')
      },

      selectMarriage (marriage) {
        this.marriage = marriage
        alert(marriage)
      }

    }

    //   submitForm (formName) {
    //     this.$refs[formName].validate((valid) => {
    //       if (!valid) {
    //         console.log('error submit!!')
    //         return
    //       }
    //
    //       // alert('submit!');
    //       var that = this
    //
    //       var uid = Store.fetch('uid')
    //       if (uid == null) {
    //         uid = 'bd235faf-f82f-41bd-bdfb-dda8e9485e37'
    //       }
    //       console.log('submitForm：' + Store.fetch('uid'))
    //       axios.post(Conf.API + '/userInfo', {
    //         uid: uid,
    //         gender: this.gender,
    //         marriage: this.marriage
    //       })
    //         .then(function (response) {
    //           console.log(response.data.code)
    //
    //           if (response.data.code === 0) {
    //             that.$message.success('保存用户基本信息成功')
    //             // 需要跳转到其他界面
    //           } else {
    //             that.$message.error('保存用户基本信息失败')
    //           }
    //         })
    //         .catch(function (response) {
    //           that.$message.error('保存用户基本信息失败')
    //         })
    //     })
    //   },
    //   resetForm (formName) {
    //     this.$refs[formName].resetFields()
    //   }
    // }
  }
</script>


<style scoped>


  /*--------------基本布局 + 选择男女----------------------*/
  .user-gender-title {
    display: flex;
    justify-content: center;
    margin: 0 auto 100px;
    text-align: center;
    overflow: hidden;
  }

  .return-btn {
    position: absolute !important;
    width: 146px;
    height: 72px;
    top: -400px;
    right: -600px;
    z-index: 66;
    background: url("../assets/return-btn.png") no-repeat;
  }

  .user-gender {
    display: flex;
    justify-content: center;
  }

  .user-info {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: #FFAEC4 url(../assets/bg1.png) fixed center center no-repeat;
    background-size: cover;
  }

  .user-info > div {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 10;
  }

  .user-gender-title > div {
    height: 50px;
    width: 181px;
    line-height: 50px;
    padding: 10px;
    border: 1px solid #fff;
    font-size: 20px;
    color: #fff;
    background: #5eced6;
    border-radius: 50px;
  }

  .male {
    width: 410px;
    height: 551px;
    margin-right: 50px;
    background: url(../assets/man.png) no-repeat;
  }

  .female {
    width: 410px;
    height: 551px;
    margin-left: 50px;
    background: url(../assets/woman.png) no-repeat;
  }


  /*--------------年龄选择器0906----------------------*/

  .box-user-info-radio-group.age-radio {
    /*padding: 166.537px 92.951px 0;*/
    padding: 167px 93px 0;
  }

  .box-user-info-radio-group {
    width: 1143px;
    height: 377px;
    /*width: 1142.508px;*/
    /*height: 376.635px;*/
    background: url(../assets/info-bg.png) no-repeat;
    background-size: 100%;
    padding: 167px 93px 0;
    box-sizing: border-box;
    color: #fff;
  }

  .box-slider {
    padding: 0;
    align-items: center;
    position: relative;
  }

  .box-slider, .box-radio-group {
    height: 10px;
    background: #fff;
    position: relative;
    display: flex;
    justify-content: space-between;
    border-radius: 6px;
    font-size: 46px;
  }

  .box-slider-item:first-child {
    transform: translateX(-50%);
  }

  .box-slider-item:nth-child(10n), .box-slider-item:first-child {
    width: 8px;
    /*width: 7.734px;*/
    border: 4px solid #fff;
    /*border: 3.859px solid #fff;*/
    border-radius: 6px;
    background: #5eced6;
  }

  .box-slider-item {
    width: 2px;
    /*width: 1.922px;*/
    height: 31px;
    /*height: 30.984px;*/
    background: #fff;
    position: relative;
  }

  .box-slider-item:nth-child(10n).age-number, .box-slider-item:first-child.age-number {
    display: block;
  }

  .age-number {
    position: absolute;
    left: 50%;
    top: 0;
    transform: translate(-50%, 85px);
    color: #fff;
    font-size: 46px;
    white-space: nowrap;
    display: none;
  }

  /*划线*/
  .box-slider-bar {
    position: absolute;
    /*top: -69.711rem;*/
    top: -70rem;
    left: 0;
    /*width: 38.719px;*/
    /*height: 232.359px;*/

    width: 39px;
    height: 232px;
  }

  .box-slider-bar::before {
    content: "";
    position: absolute;
    left: 50%;
    top: 0;
    bottom: 0;
    transform: translateX(-50%);
    width: 4px;
    height: 232px;
    background: #fff;
    border-radius: 6px;
  }

   .box-slider-bar > div {
    position: absolute;
    left: 50%;
    top: 0;
    transform: translate(-50%, 248px);
    white-space: nowrap;
  }

  .box-slider-bar::after {
    content: "";
    position: absolute;
    left: 50%;
    /*top: 38.730px;*/
    top: 39px;
    transform: translateX(-50%);
    width: 23px;
    height: 62px;
    /*width: 23.234px;*/
    /*height: 61.953px;*/
    /*border: 3.859px solid #fff;*/
    border: 4px solid #fff;
    border-radius: 6px;
    background: #F14E87;
  }

  --------------年龄选择器----------------------
  /*.age-ra {*/
    /*width: 1372px;*/
    /*height: 561px;*/
    /*background: url(../assets/info-bg.png) no-repeat;*/
    /*color: #fff;*/
    /*margin: 0 auto;*/
  /*}*/

  /*#el_slider_age {*/
    /*padding: 250px 60px 0;*/
    /*width: 800px;*/
    /*height: 400px;*/
  /*}*/

  /*input::-webkit-slider-thumb {*/
    /*-webkit-appearance: none;*/
  /*}*/

  /*input::-webkit-slider-runnable-track {*/
    /*height: 10.1px;*/
    /*border-radius: 10px; !*将轨道设为圆角的*!*/
    /*!*box-shadow: 0 1px 1px #def3f8, inset 0 .125em .125em #0d1112; !*轨道内置阴影效果*!*!*/
  /*}*/

  /*input::-webkit-slider-thumb {*/
    /*-webkit-appearance: none;*/
    /*height: 50px;*/
    /*width: 25px;*/
    /*margin-top: -5px; !*使滑块超出轨道部分的偏移量相等*!*/
    /*background: #ffffff;*/
    /*border-radius: 15px; !*外观设置为圆形*!*/
    /*!*transform: translateX(-50%);*!*/
    /*border: 2px solid #fff;*/
    /*background: #F14E87;*/
  /*}*/

  /*input {*/
    /*-webkit-appearance: none;*/
    /*width: 1000px;*/
    /*border-radius: 10px; !*这个属性设置使填充进度条时的图形为圆角*!*/
  /*}*/

  /*.box-slider {*/
  /*padding: 0;*/
  /*align-items: center;*/
  /*position: relative;*/
  /*}*/

  /*.box-slider, .box-radio-group {*/
  /*height: 10px;*/
  /*padding: 0 15px;*/
  /*background:    #fff;*/
  /*position: relative;*/
  /*display: flex;*/
  /*justify-content: space-between;*/
  /*border-radius: 2px;*/
  /*font-size: 46px;*/
  /*}*/

  /*.box-slider {*/
  /*width: 8px;*/
  /*border: 4px solid #fff;*/
  /*border-radius: 4px;*/
  /*background: #5eced6;*/
  /*}*/

  /*--------------婚姻状态选择器----------------------*/
  .user-marriage {
    width: 1250px;
    height: 350px;
    background: url(../assets/info-bg.png) no-repeat;
    padding: 194px 40px 0;
    color: #fff;
  }

  .box-radio-group {
    height: 10px;
    padding: 0 15px;
    background: #fff;
    position: relative;
    display: flex;
    justify-content: space-between;
    border-radius: 6px;
    font-size: 15px;
  }

  .radio-item {
    display: block;
    text-align: center;
    width: 105px;
    height: 0;
    padding-top: 105px;
    position: relative;
  }

  .radio-btn {
    position: absolute;
    left: 50%;
    top: 0;
    transform: translate(-50%, -50%);
    width: 70px;
    height: 70px;
    border: 4px solid #fff;
    border-radius: 50%;
    margin: 0 auto;
    background: #FFB3C4;
    transition: all 0.1s ease;
  }

  strong {
    white-space: nowrap;
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 93px;
    height: 46px;
    padding: 0 41px 0 53px;
    transform: translate(-50%, 23px);
  }

</style>
