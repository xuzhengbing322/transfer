<template>
  <div class="box button-group">
    <!--leftButtonDisabled的值为父组件传递过来的 transferButtonDisabled.left。
    当leftButtonDisabled为真，则right数组没数据，则左按钮半隐藏。
        leftButtonClick是调用自定义函数leftButtonClick所指向的父组件的removeRightListData()。
    removeRightListData()删除right数组，即删除右列表选中的数据项。左列表是通过总数据-右列表数据得来，从而实现数据转移
        -->
    <button :disabled="leftButtonDisabled" @click="leftButtonClick">
      &lt;
    </button>

    <!--rightButtonDisabled的值为父组件传递过来的 transferButtonDisabled.right。
    当leftButtonDisabled为真，则left数组没数据，则右按钮半隐藏。
        rightButtonClick是调用自定义函数rightButtonClick所指向的父组件的addRightListData()。
    addRightListData()添加left数组到右边，实现数据从左往右移。 
        -->
    <button :disabled="rightButtonDisabled" @click="rightButtonClick">
      &gt;
    </button>
  </div>
</template>

<script setup >
const props = defineProps({
  leftButtonDisabled: {
    type: Boolean,
    default: true,
  },
  rightButtonDisabled: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits([
    'leftButtonClick',
    'rightButtonClick'
])

const leftButtonClick = () => {
    emit('leftButtonClick');
}

const rightButtonClick = () => {
    emit('rightButtonClick')
}
</script>

<style lang="less" scoped>
.button-group {
  display: flex;
  justify-content: center;
  align-items: center;
  border-left: 1px solid #ddd;
  border-right: 1px solid #ddd;

  button {
    border: none;
    outline: none;
    width: 38px;
    height: 38px;
    background-color: gray;
    color: #fff;
    border-radius: 5px;
    // 设置按钮的隐藏样式
    &:disabled {
      opacity: 0.6;
    }
    &:nth-child(2) {
      margin-left: 10px;
    }
  }
}
</style>