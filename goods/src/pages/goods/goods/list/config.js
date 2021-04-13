
export const formItems = [
  {
    label: 'ID',
    name: 'id',
    rules: {
      required: false,
      message: 'domain can not be null222',
      trigger: 'change',
    },
    value: '222',
    component: {
      name: 'MInput'
    }
  },
  {
    label: 'Name',
    name: 'name',
    span: 8,
    rules: {
      required: false,
      message: 'domain can not be null222',
      trigger: 'change',
    },
    component: {
      name: 'MSelect'
    }
  },
  {
    label: 'Age',
    name: 'age',
    span: 8,
    rules: {
      message: 'domain can not be null222',
      trigger: 'change',
    },
    component: {
      name: 'MInputNumber'
    }
  },
  {
    label: 'Date',
    name: 'date',
    span: 8,
    rules: {
      message: 'domain can not be null222',
      trigger: 'change',
      type: 'object' 
    },
    valueFields:['startTime', 'endTime'],
    value:[],
    component: {
      name: 'MRangePicker'
    }
  }
];
