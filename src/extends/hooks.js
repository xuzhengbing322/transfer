import {
    ref,
    computed,
    reactive
} from "@vue/reactivity";

// 创建targetIndex变量接受选项框的index，setTargetIndex获取改变后选项的index
export function useTargetIndex(initialIndex) {
    const targetIndex = ref(initialIndex);

    function setTargetIndex(newIndex) {
        targetIndex.value = Number(newIndex);
    };
    return [targetIndex, setTargetIndex]
};

export function useRightListData(initialData, checkedData) {
    // rightListData变量用于存放右列表数据
    const rightListData = ref(initialData);

    // 右列表添加数据。右列表最终的数据就是newData合并rightListData.value中的数据。因此，newData必须是个数组，它就是left数组。
    function addRightListData(newData) {
        rightListData.value = [
            ...rightListData.value,
            ...newData
        ]
        // 将left数组中的数据项添加到右列表后，left数组的数据要被清空。
        checkedData.left = [];
    }

    /*删除右列表数据。newData是选中要删除的数据项。rightListData是右列表的数据。
    新右列表的数据=原右列表的数据-要删除的数据。因此filter返回新右列表的数据。
    */ 
    function removeRightListData(newData) {
        newData.forEach(newItem => {
            rightListData.value = rightListData.value.filter(item => item.id !== newItem.id)
        });

        // 将right数组中的数据添加到左列表后，right数组中的数据要被清空。
        checkedData.right = [];
    }

    return [
        rightListData,
        addRightListData,
        removeRightListData
    ]
}

// 定义left/right数组，容纳选中要移动的数据项，
export function useCheckedData() {
    const checkedData = reactive({
        left: [],
        right: []
    });

    /*点击checkbox，就像准备要添加的数据存放到left/right数组中。
    leftOrRight表示准备添加数据的数组，item表示要添加的数据项
    */ 
    function addCheckedData(leftOrRight, item) {
        switch (leftOrRight) {
            case 'left':
                checkedData.left.push(item)
                break;
            case 'right':
                checkedData.right.push(item)
                break;
            default:
                break;
        }
    }

    /*取消checkbox选项，就将left/right数组中准备要添加的数据给删除掉。删除后的left/right就是准备添加的数据。
    leftOrRight表示准备删除数据的数组，id表示要删除的数据项的id。
    通过filter方法过滤
    */ 
    function removeCheckedData(leftOrRight, id) {
        switch (leftOrRight) {
            case 'left':
                checkedData.left = checkedData.left.filter(item => item.id !== id);
                break;
            case 'right':
                checkedData.right = checkedData.right.filter(item => item.id !== id);
                break;
            default:
                break;
        }
    }

    return [
        checkedData,
        addCheckedData,
        removeCheckedData
    ]

}

// dragedItem保存拖拽的数据项，setDragedItem实现重复拖拽
export function useDragedItem () {
    const dragedItem = ref(null)
    
    function setDragedItem (item) {
        dragedItem.value = item
    }

    return [
        dragedItem,
        setDragedItem
    ]
}

export function useSetCheckedData (addCheckedData,removeCheckedData) {
    const setCheckedData = (checked, leftOrRight, item) => {
        checked
          ? addCheckedData(leftOrRight, item)
          : removeCheckedData(leftOrRight, item.id);
      };

    return [
        setCheckedData
    ]
}

export function useComputedData(data, targetIndex, rightListData, checkedData) {
    // 根据选项框的index获取总数据中的title属性，作为左边框的标题
    const leftTitle = computed(() => {
        return data[targetIndex.value].title
    })

    const leftListData = computed(() => {
        // 解构当前品牌选项对象中的data，即手机。并将data重命名为currentData。
        const { data: currentData } = data[targetIndex.value];
        /*左列表数据=总数据-右列表数据。
        item.id是currentData(总数据)中的id，{id}是获取右列表数据对象中的id属性，所以id就是是右列表中数据的id。
        item.id===id，则证明这个数据在右列表中，那就不返回这个数据。反之则返回。
        */ 
        return currentData.filter(item => {
            if (!rightListData.value.find(({ id }) => item.id === id)) {
                return item
            }
        })


    })

    // 当right数组为空时，则left:true，则左边的按钮半隐藏。当left数组为空时，则right:true，则右边的按钮半隐藏。
    const transferButtonDisabled = computed(() => ({
        left: checkedData.right.length === 0,
        right: checkedData.left.length === 0,

    }))

    return {
        leftTitle,
        leftListData,
        transferButtonDisabled
    }
}