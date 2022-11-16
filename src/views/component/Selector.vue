<template>
  <select @change="selectChange($event.target.value)">
    <option :value="index" v-for="(title, index) in data" :key="index">
      {{ title }}
    </option>
  </select>
</template>

<script setup >
// 获取options数组，即手机品牌。
const props = defineProps({
  data:{
      type: Array,
      default: () => []
  }
});

// 选项框变化后，将选项框的index值传递给父组件。
const emit = defineEmits(['selectChange'])

const selectChange = (value) => {
    emit('selectChange',value)
}

</script>

<style lang="less" scoped>
</style>