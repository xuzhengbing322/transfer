<template>
  <div>
      <!-- 将数据传递给transfer组件 -->
    <Transfer :data="dataPhone" :right_title="rightTitle"/>
  </div>
</template>

<script  setup >
import { reactive, toRefs } from "@vue/reactivity";
import Transfer from "./views/Transfer.vue";

const data = reactive({
    rightTitle:"已选择机型"
})

const {rightTitle} = toRefs(data)


const dataPhone = [
  {
    title: "华为",
    data: [
      {
        id: 1,
        phone_name: "Mate 40 Pro",
        disabled: false,
      },
      {
        id: 2,
        phone_name: "P40 Pro",
        disabled: true,
      },
      {
        id: 3,
        phone_name: "P50 Pro",
        disabled: false,
      },
      {
        id: 4,
        phone_name: "Mate Xs 2",
        disabled: false,
      },
    ],
  },
  {
    title: "小米",
    data: [
      {
        id: 5,
        phone_name: "12 Pro",
        disabled: true,
      },
      {
        id: 6,
        phone_name: "12sUltra",
        disabled: true,
      },
      {
        id: 7,
        phone_name: "12s",
        disabled: false,
      },
      {
        id: 8,
        phone_name: "Civi 1s",
        disabled: false,
      },
    ],
  },
  {
    title: "iPhone",
    data: [
      {
        id: 9,
        phone_name: "13 mini",
        disabled: false,
      },
      {
        id: 10,
        phone_name: "13",
        disabled: false,
      },
      {
        id: 11,
        phone_name: "13 Pro",
        disabled: false,
      },
      {
        id: 12,
        phone_name: "13 Pro Max",
        disabled: true,
      },
    ],
  },
];


</script>

<style lang="less" scoped>
</style>