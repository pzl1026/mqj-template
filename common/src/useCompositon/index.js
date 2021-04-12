import {ref, reactive} from 'vue';

// 显示隐藏
export function useVisible () {
  const visible = ref(false);

  const toggleVisble = () => {
    visible.value = !visible.value;
  };

  return {
    visible,
    toggleVisble
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
export function useAdd (arr) {
  let adVal = ref(0);
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
export function useMul (arr) {
  let amVal = ref(0);
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
export function useTree (arr, {childField = 'children', needsFeilds = ['label', 'value']}) {

}

// 将数据结构转为接口需要的结构
/**
 * @param {object} o1 需要被转换的对象
 * @param {object} o2 被转换之后的所赋值的对象
 * @param {object} fieldObj 对应字段
 */
export function useO2O (o1, o2, fieldObj) {

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