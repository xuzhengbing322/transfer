<template>
  <div>
    <div>
      <Selector
        :data="options"
        @select-change="setTargetIndex"
      ></Selector>
    </div>
    <div class="transfer">
      <div 
        class="box left-list"
        @dragover.prevent
        @drop="removeRightListData([dragedItem])"  
      >
        <ListTitle 
          :title="leftTitle"
        ></ListTitle>
         <!-- setCheckedData()：点击checkbox选项框，向left数组中添加/删除数据。
        $event.target.checked表示选项框是true/false，及是添加数据项到数组还是从数据项中删除数据。
        "left"：表示操作的数组是left数组。item（来自leftListData）表示勾选的数据项。
         -->
        <ListItem
          :data="leftListData"
          leftOrRight='left'
          @checkboxClick="setCheckedData"
          @drag-item="setDragedItem"
        ></ListItem>
      </div>
      <ButtonGroup
        :left-button-disabled="transferButtonDisabled.left"
        :right-button-disabled="transferButtonDisabled.right"
        @left-button-click="removeRightListData(checkedData.right)"
        @right-button-click="addRightListData(checkedData.left)"
      ></ButtonGroup>
      <div 
        class="box right-list"
        @dragover.prevent
        @drop="addRightListData([dragedItem])"
      >
        <ListTitle
          :title="rightTitle"
        ></ListTitle>
        <div>
          <ListItem
            :data="rightListData"
            leftOrRight='right'
            @checkboxClick="setCheckedData"
            @drag-item="setDragedItem"
          ></ListItem>
        </div>
      </div>
    </div>
  </div>
</template>

<script  setup >
import Selector from './component/Selector.vue'
import ListTitle from './component/ListTitle.vue'
import ButtonGroup from './component/ButtonGroup.vue'
import ListItem from './component/ListItem.vue'


import { reactive, ref, toRefs } from "@vue/reactivity";
import {
  useTargetIndex,
  useComputedData,
  useRightListData,
  useCheckedData,
  useDragedItem,
  useSetCheckedData
} from "../extends/hooks.js";

import propsDefinition from "../extends/props.js"

// 接受App组件传递的信息
const props = defineProps(propsDefinition);

const data = reactive({
  dataAll: props.data,
  //获取title数组
  options: props.data.map(({ title }) => title),
  rightTitle:props.right_title
});

const { dataAll, options,rightTitle } = toRefs(data);

// 获取下拉列表选型框的index
const [
    targetIndex, 
    setTargetIndex
    ] = useTargetIndex(0);

// 获取左/右列表中选择的数据
const [
  checkedData, 
  addCheckedData, 
  removeCheckedData
  ] = useCheckedData();

// 获取右列表数据，右列表添加数据方法，右列表删除数据方法。
const [
    rightListData, 
    addRightListData, 
    removeRightListData
    ] = useRightListData([],checkedData);

// 获取左列表标题，左列表数据
const { 
    leftTitle, 
    leftListData, 
    transferButtonDisabled 
    } = useComputedData(data.dataAll, targetIndex, rightListData, checkedData);

/*setCheckedData()通过调用addCheckedData()和removeCheckedData()来设置left/right数组。
checked表示true/false，即勾选/清除。leftOrRight表示操作的是left/right数组，item表示操作的数据项。
checked为真就执行addCheckedData()，为假就执行removeCheckedData()
*/ 

const [
    dragedItem,
    setDragedItem
 ] = useDragedItem()

 const [
   setCheckedData
 ] = useSetCheckedData(addCheckedData,removeCheckedData)

</script>

<style lang="less" scoped>
.transfer {
  display: flex;
  flex-direction: row;
  width: 360px;
  height: 300px;
  border: 1px solid #ddd;

  .box {
    width: 120px;
    height: 100px;





    
  }
}
</style>