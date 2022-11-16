<template>
  <h1 class="list-title">{{ title }}</h1>
</template>

<script  setup >
const props = defineProps({
    title:{
        type:String,
        default:'标题'
    }
})

</script>

<style lang="less" scoped>
    .list-title {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 30px;
      font-weight: normal;
      margin: 0;
      color: #666;
      border-bottom: 1px solid #ddd;
      background-color: #efefef;
      font-size: 14px;
    }
</style>