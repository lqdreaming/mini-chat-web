<template>
  <div class="keyboard-box">
    <div class="content">
      <template v-for="item in buttonList">
        <span v-if="item.type === 'num'" :class="`${item.type} item-${item.value}`"
              @click="handleClick('num', item.value)">{{item.value}}</span>
        <span v-if="item.type === 'delete'" :class="item.type" @click="handleClick('delete')"></span>
        <span v-if="item.type === 'end'" :class="item.type" @click="handleClick('end')"></span>

        <!-- <span v-if="item.type === 'sure'" :class="item.type" @touchstart="handleClick('sure')">确认</span> -->
      </template>
    </div>
  </div>
</template>

<script>

  export default {
    data () {
      return {
        buttonList: [{
          type: 'num',
          value: 1
        }, {
          type: 'num',
          value: 2
        }, {
          type: 'num',
          value: 3
        }, {
          type: 'num',
          value: 4
        }, {
          type: 'num',
          value: 5
        }, {
          type: 'num',
          value: 6
        }, {
          type: 'num',
          value: 7
        }, {
          type: 'num',
          value: 8
        }, {
          type: 'num',
          value: 9
        }, {
          type: 'num',
          value: 0
        }, {
          type: 'delete'
        }]
      }
    },
    created () {

    },
    methods: {
      handleClick (type, value) {
        this.$emit('_getInput', type, value)
      }
    }

  }
</script>

<style scoped lang="scss">

.keyboard-box {
  position: absolute;
  z-index: 600;
  right: 0;
  margin-top: 600px;
  margin-right: 10px;
  // bottom: 0;
  .content {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    align-items: center;
    width: 500px;
    height: 368px;
    border-radius: 2px;
    padding: 16px;
    span {
      width: 150px;
      height: 60px;
      line-height: 60px;
      display: inline-block;
      text-align: center;
      margin-left: 2px;
      margin-top: 2px;
      // box-shadow: 0 2px 4px 2px rgba(176, 126, 131, 0.50);
      border-radius: 8px;
      background: #FFFFFF;
      font-size: 48px;
      color: #333333;
      -webkit-user-select:none;
      -moz-user-select:none;
      -ms-user-select:none;
      user-select:none;
    }
    .end {
      background-image: url("../assets/icon-close.png");
      background-repeat: no-repeat;
      background-position: center;
    }
    .delete {
      background-image: url("../assets/icon-delete.png");
      background-repeat: no-repeat;
      background-position: center;
      &:active {
        background: #C0C0C0;
      }
    }
    .sure {
      background: #FF3589;
      border-radius: 8px;
      color: #fff;
      font-size: 36px;
    }
    .num {
      &:active {
        background: #C0C0C0;
      }
    }
    .item-0 {
      margin-left: 175px;
    }
  }
}
</style>
