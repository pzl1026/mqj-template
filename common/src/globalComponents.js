// 加载模块
// import('goods/pages');
if(process.env.NODE_ENV == 'dev') {
  import('openplatform/pages');
}
// import('order/pages');

// 注册全局性组件
import CommonTest from './components/commonTest';
import SearchTable from './components/searchTable';
// import MTable from './components/mtable';
// import MForm from './components/mform';
// import MFormItem from './components/mFormItem';
// import MFormShell from './components/mFormShell';
// import MSearch from './components/msearch';
// import MUploader from './components/mUploader';
// import MRichtext from './components/richText';
import {
  Table,
  Row,
  Col,
  Button,
  Icon,
  Modal,
  Breadcrumb,
  Dropdown,
  Avatar,
  Menu,
  Layout,
  Cascader,
  Checkbox,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Switch,
  TreeSelect,
  Card,
  Collapse,
  Popover,
  Tabs,
  Tooltip,
  Alert,
  Popconfirm,
  Divider,
  Pagination,
  Transfer,
  Tree,
  Space
} from 'ant-design-vue';
import ConfigProvider from 'ant-design-vue/lib/config-provider';

let components = {
  ATable: Table,
  AButton: Button,
  ALayout: Layout,
  ARow: Row,
  ACol: Col,
  AIcon: Icon,
  AModal: Modal,
  ABreadcrumb: Breadcrumb,
  ABreadcrumbItem: Breadcrumb.Item,
  ALayoutHeader: Layout.Header,
  ALayoutContent: Layout.Content,
  ADropdown: Dropdown,
  AAvatar: Avatar,
  AMenu: Menu,
  ASubMenu: Menu.SubMenu,
  AMenuItem: Menu.Item,
  AMenuItemGroup: Menu.ItemGroup,
  ACascader: Cascader,
  ACheckbox: Checkbox,
  ACheckboxGroup: Checkbox.Group,
  ADatePicker: DatePicker,
  ARangePicker: DatePicker.RangePicker,
  AForm: Form,
  AFormItem: Form.Item,
  AInput: Input,
  ATextarea: Input.TextArea,
  AInputSearch: Input.Search,
  AInputNumber: InputNumber,
  ARadio: Radio,
  ARadioGroup: Radio.Group,
  ARadioButton: Radio.Button,
  ASelect: Select,
  ASelectOption: Select.Option,
  ASwitch: Switch,
  ATreeSelect: TreeSelect,
  ACard: Card,
  ACollapse: Collapse,
  APopover: Popover,
  ATabs: Tabs,
  ATabPane: Tabs.TabPane,
  ATooltip: Tooltip,
  AAlert: Alert,
  APopconfirm: Popconfirm,
  ADivider: Divider,
  APagination: Pagination,
  AConfigProvider: ConfigProvider,
  ATransfer: Transfer,
  ATree: Tree,
  ASpace: Space,
  CommonTest,
  SearchTable
  // MTable,
  // MForm,
  // MSearch,
  // MFormItem,
  // MFormShell,
  // MUploader,
  // MRichtext
};

// 注册组件
export function componentsInstall (app) {
  for (let [key, name] of Object.entries(components)) {
    app.component(key, name);
  }
}