<template>
  <div class="user-info">
    <img id="returnBtn" v-on:click="returnBtn()" src="../../static/return-btn.png"/>
    <img id="checkBtn1" v-show="gender == 1" src="../../static/radio2.png"/>
    <img id="checkBtn2" v-show="gender == 2" src="../../static/radio2.png"/>
    <div id="title">男神/女神</div>
    <div class="user-gender">
      <div data-sex="1" class="male" @click="selectGenger(1)"></div>
      <div data-sex="2" class="female" @click="selectGenger(2)"></div>
    </div>

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
        gender: 0,
        time: null
      }
    },
    methods: {
      selectGenger (gender) {
        this.gender = gender
        Store.save('user-gender', gender);
        var that = this
        window.clearTimeout(this.time)
        this.time = window.setTimeout(function () {
          that.$router.push({
            path:'/UserInfoAge'
          })
        }, 2000)  //timer2->2 当前是第二个定时器
      },
      returnBtn: function(){
        this.$router.push({
          name: 'UserWelcome'
        })
      }
    }
  }
</script>


<style scoped>
#title {
  position: absolute;
  right: 0;
  left: 0;
  top: 0;
  margin: auto;
  font-size: 30px;
  color: #ffffff;
  background-color: #5eced6;
  width: 200px;
  height: 70px;
  border: 2px;
  border-style: solid;
  border-color: #ffffff;
  border-radius: 50px;
  text-align: center;
  line-height: 70px;
  margin-top: 200px;
}


#returnBtn {
  position: absolute;
  height: 60px;
  width: 120px;
  margin-left: 650px;
  margin-top: 100px;
}

#checkBtn1{
  position: absolute;
  height: 60px;
  width: 60px;
  left: 0;
  margin-left: 850px;
  margin-top: 380px;
  z-index: 1000;
}
#checkBtn2{
  position: absolute;
  height: 60px;
  width: 60px;
  left: 0;
  margin-left: 1360px;
  margin-top: 380px;
  z-index: 1000;
}

.user-gender {
  position: absolute;
  margin-top: 400px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
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




</style>
