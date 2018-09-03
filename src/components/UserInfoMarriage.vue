<template>
  <div class="index" ref="ruleForm">
    <div>
      <div class="user-info">
        <div>
          <div class="return-btn"></div>
        </div>
        <div>
          <div class="user-gender-title">
            <!--<div>男神/女神</div>-->
            <div>多大啦</div>
          </div>
          <!--<div class="user-gender-sex">-->
          <!--<div data-sex="1" class="male" @click="selectGenger(1)">&lt;!&ndash;&ndash;&gt;</div>-->
          <!--<div data-sex="2" class="female" @click="selectGenger(2)">&lt;!&ndash;&ndash;&gt;</div>-->
          <!--</div>-->


          <!--<div class="user-gender-sex">-->
          <!--<div class="box-user-info-radio-group age-radio">-->
          <!--<el-slider v-model="ruleForm.age" id="el_slider_age" show-input></el-slider>-->
          <!--</div>-->
          <!--</div>-->




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

  export default {
    data () {
      // var validateAge = (rule, value, callback) => {
      //   var INTEGER_PATTERN = /^[0-9]{0,2}$/
      //   if (value === '') {
      //     callback(new Error('请输入年龄'))
      //   } else if (!INTEGER_PATTERN.test(value)) {
      //     callback(new Error('请输入0-100的年龄'))
      //   } else {
      //     callback()
      //   }
      // }

      return {
        ruleForm: {
          gender: '1',
          age: '20',
          marriage: '2'
        }
        // , rules: {
        //   age: [
        //     {validator: validateAge, trigger: 'blur'}
        //   ]
        // }
      }
    },
    methods: {
      selectGenger (gender) {
        this.gender = gender
        alert(gender)
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
    background: url("../assets/return-btn.png") 0 0/100% no-repeat;
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

  /*--------------年龄选择器----------------------*/
  .age-ra {
    width: 1372px;
    height: 561px;
    background: url(../assets/info-bg.png) no-repeat;
    color: #fff;
    margin: 0 auto;
  }

  #el_slider_age {
    padding: 250px 60px 0;
    width: 400px;
  }



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


</style>
