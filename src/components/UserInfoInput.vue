<template>
  <div class="index">
    <h1>请输入您以下的基本信息</h1>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">

      <el-form-item label="性别" prop="gender">
        <el-radio-group v-model="ruleForm.gender">
          <el-radio label="1">男</el-radio>
          <el-radio label="2">女</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="年龄" prop="age">
        <el-input v-model="ruleForm.age" placeholder="请输入整数" type="number" class="age-input"></el-input>
      </el-form-item>

      <el-form-item label="情感状况">
        <el-radio-group v-model="ruleForm.marriage">
          <el-radio label="1">单身</el-radio>
          <el-radio label="2">恋爱</el-radio>
          <el-radio label="3">结婚</el-radio>
          <el-radio label="4">离婚</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item class="btn-content">
        <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>


<script>
  import Conf from '@/conf/conf.js'
  import axios from 'axios'
  import Store from '@/tool/store.js'

  export default {
    data () {
      var validateAge = (rule, value, callback) => {
        var INTEGER_PATTERN = /^[0-9]{0,2}$/
        if (value === '') {
          callback(new Error('请输入年龄'))
        } else if (!INTEGER_PATTERN.test(value)) {
          callback(new Error('请输入0-100的年龄'))
        } else {
          callback()
        }
      }

      return {
        ruleForm: {
          gender: '2',
          age: '',
          marriage: '2'
        },
        rules: {
          age: [
            {validator: validateAge, trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (!valid) {
            console.log('error submit!!')
            return
          }

          // alert('submit!');
          var that = this

          var uid = Store.fetch('uid')
          if (uid == null) {
            uid = 'bd235faf-f82f-41bd-bdfb-dda8e9485e37'
          }
          console.log('submitForm：' + Store.fetch('uid'))
          axios.post(Conf.API + '/userInfo', {
            uid: uid,
            gender: this.gender,
            marriage: this.marriage
          })
            .then(function (response) {
              console.log(response.data.code)

              if (response.data.code === 0) {
                that.$message.success('保存用户基本信息成功')
                // 需要跳转到其他界面
              } else {
                that.$message.error('保存用户基本信息失败')
              }
            })
            .catch(function (response) {
              that.$message.error('保存用户基本信息失败')
            })
        })
      },
      resetForm (formName) {
        this.$refs[formName].resetFields()
      }
    }
  }
</script>


<style scoped>
  .index {
    text-align: left;
    width: 50%;
    margin: 0 auto;
  }

  h1, h2 {
    font-weight: normal;
    color: #F56C6C;
    text-align: center;
  }

  .age-input {
    width: 100%;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  .btn-content {
    text-align: right;
  }
</style>
