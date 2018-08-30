<template>
  <div :class="[classes,styleClass]" @click="clickFuc">
    {{text}}
  </div>
</template>
<script>
  export default {
    props:{
      classes: {
        type:String
      },
      currentClass:{
        type:String
      },
      activeClass:{
        type:String,
        default:"__ACTIVECLASS__"
      },
      disabledClass:{
        type:String,
        default:"__DISABLEDCLASS__"
      },
      defaultText:{
        type:String,
        required:true
      },
      updateText:{
        type:String,
        required:true
      },
      countDownSec:{
        type:Number,
        required:true
      },
      otherRule:{
        type:String
      }
    },
    data(){
      return {
        timer:null,
        sec:this.countDownSec,
        styleClass:this.currentClass,
        hasClicked:false
      }
    },
    computed:{
      text(){

        return !this.hasClicked ? this.defaultText : this.sec+this.updateText

      }
    },
    watch:{
      currentClass(cls){
        if(!this.hasClicked){
          this.styleClass=cls
        }
      }
    },
    methods:{
      clickFuc(){
        if(this.styleClass == this.disabledClass) return;

        if(this.otherRule && !this.$parent[this.otherRule]()){
          return;
        }

        this.styleClass = this.disabledClass;
        this.countDown();
        this.$emit("btnClick");
        this.hasClicked = true;
      },
      countDown(){
        clearInterval(this.timer);
        this.timer = setInterval(()=>{
          if(this.sec<=1){
            clearInterval(this.timer);
            this.styleClass = this.currentClass;
            this.sec=this.countDownSec;
            this.hasClicked = false;
            return;
          }
          this.sec--;
        },1000)

      }
    }

  }
</script>
