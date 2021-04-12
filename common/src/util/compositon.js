import {ref, reactive} from 'vue';

// 显示隐藏
export function useVisible () {
  const visible = ref(false);

  const toggleVisible = () => {
    visible.value = !visible.value;
  };

  return {
    visible,
    toggleVisible
  };
}

// 下一步
export function useNext () {
  const step = ref(1);

  const toggleStep = (count) => {
    step.value += count;
  };

  return {
    step,
    toggleStep
  };
}

// 异步列表 
/**
 * @param {arr}  复制的对象参数
 * @param {object} fields 复制的对象参数
 */
export function useDymicList (arr, fields) {
  const copyFields = reactive(fields);

  const pushCol = () => {
    arr.push(fields);
  };

  return {
    copyFields,
    pushCol
  };
}

const mul = (arr) => {
  let m = 0;

  let r = arr.reduce((a, b) => {
    let s1 = a.toString();

    let s2 = b.toString();

    try {
      m += s1.split('.')[1].length;
    } catch (e) {
      console.error(e);
    }
    try {
      m += s2.split('.')[1].length;
    } catch (e) {
      console.error(e);    
    }
    return (
      (Number(s1.replace('.', '')) * Number(s2.replace('.', ''))) /
      Math.pow(10, m)
    );
  });

  return r;
};

// 数字相加
/**
 * @param  {array}    arr 由相加的数字成的数组
 * @return {number}   相加之后的结果
 * 
 */
export function useAdd (arr, adVal = ref(0)) {
  const addArr = () => {
    let r1, r2, m, r;

    adVal = arr.reduce((a, b) => {
      try {
        r1 = a.toString().split('.')[1].length;
      } catch (e) {
        r1 = 0;
      }
      try {
        r2 = b.toString().split('.')[1].length;
      } catch (e) {
        r2 = 0;
      }
      m = Math.pow(10, Math.max(r1, r2));
      return (mul([a, m]) + mul([b, m])) / m;
    });
  };

  
  return {
    adVal,
    addArr
  };
}

// 数字相乘
/**
 * @param  {array}    arr 由相加的数字成的数组
 * @return {number}   相乘之后的结果
 * 
 */
export function useMul (arr, amVal = ref(0)) {
  const mulArr = (arr) => {
    amVal = mul(arr);
  };
  

  return {
    mulArr,
    amVal
  };
}

// 将数据转为tree结构
/**
 * @param {array} arr 数据
 * @param {object} options 其他参数，以哪个字段形成，如children, 必须拥有的字段，如label, value
 */
export function useTree (arr = reactive({val: []}), {
  originChildName = 'child', 
  childField = 'children',
  originChangeName = ['name', 'value'],
  needsFeilds = ['label', 'value']
}) {
  function arr2Tree (args) {
    return arr.map(item => {
      if (item[originChildName] && item[originChildName].length > 0) {
        item[childField] = item[originChildName];
        arr2Tree(item[originChildName]);
      } else {
        item[needsFeilds[0]] = item[originChangeName[0]];
        item[needsFeilds[1]] = item[originChangeName[1]];
      }
      return item;
    });
  }
  return {
    arr
  };
}

/**
 * 根据一个id查找该id父级的id，树形遍历，以children字段遍历
 * @param {array} tree
 * @param {num} id
 * @return tree的ids
 */
export function getTreeIds (tree, id) {
  let pids = reactive({
    val: []
  });

  let c = tree;

  function findTreesIds (tree, id) {
    for (let i = 0; i < tree.length; i++) {
      if (tree[i].id != pids.val[0]) {
        if (!tree[i].children) {
          continue;
        }
        findTreesIds(tree[i].children, id);
      } else {
        tree[i].pid != 0 && pids.val.unshift(tree[i].pid);
        if (tree[i].pid != 0) {
          findTreesIds(c, tree[i].pid);
        } else {
          return;
        }
      }
    }
  }
  findTreesIds(tree, id);
  return {
    pids
  };
}


/**
 * 对象映射，将一个对象的值赋予相同结构但是不同字段的新的对象
 * 使用场景：前端处理的数据与后端需要的数据字段不一致时
 *
 * @param  {object}   obj1 需要处理的json对象
 * @param  {object}   obj2Fileds 由obj1字段对应新的字段所组成的对象
 * @param  {object}   obj2Fileds 可选，当某个字段值还是一个对象时，需要该对象，通过递归方式对obj1的字段重命名
 * @return {object}   返回已经映射成的新的对象
 */
export function O2O (obj1, obj2Fileds, obj3Fileds) {
  let newO = {};

  for (let [key, value] of Object.entries(obj2Fileds)) {
    if (Reflect.has(obj1, key)) {
      if (_.isObject(obj1[key])) {
        try {
          if (Reflect.has(obj3Fileds, key)) {
            newO[obj3Fileds[key]] = O2O(obj1[key], value, obj3Fileds);
          } else {
            newO[key] = O2O(obj1[key], value);
          }
        } catch (e) {
          console.error(e);
        }
      } else {
        newO[value] = obj1[key];
      }
    }
  }
  return newO;
}


// 防抖
/**
 * @param value 值
 * @param {object} options 其他参数, 延迟时间，回调函数
 * 
 */
export function useDebounced (value, {wait, callback}) {

}

// 节流
/**
 * @param value 值
 * @param options 其他参数
 * 
 */
export function useThrottle (value, {wait, callback} ) {

}

// 去重
/**
 * @param value 值
 * @param options 其他参数
 * 
 */
export function useUnique (arr, {fields, callback} ) {

}

// 缓存初始数据
/**
 * @param value 值
 * 
 */
export function useCache (data) {

}

// 笛卡尔乘积
/**
 * @param arr 值
 * 
 */
export function useDescartes ([...arr]) {

}

// 字段验证必填
export function objValidateRequired () {

}