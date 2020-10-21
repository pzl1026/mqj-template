import React, {useState, useCallback} from 'react';
import ReactDOM from 'react-dom';
import { Layout, Menu, Dropdown, Avatar, Row, Col, Button} from 'antd';
import { UserOutlined, DownOutlined, MailOutlined, AppstoreOutlined, SettingOutlined, CloseOutlined } from '@ant-design/icons';
import QueueAnim from 'rc-queue-anim';
import Draggable from 'react-draggable';
import {getNavByUrl} from '@/mqj/index';
import 'antd/dist/antd.css';
import './index.scss';
// console.log(getNavByUrl(), 'uuu')
const { Header, Content, Footer } = Layout;
const { SubMenu } = Menu;
const moduleMenu = getNavByUrl();

function MenuAdmin(props){
  return (
    <Menu>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer">
          最近使用应用
        </a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" onClick={() => props.handleModuleShow(true)}>
          所有应用
        </a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer">
          退出登陆
        </a>
      </Menu.Item>
    </Menu>
  );
}

const menu2 = (props) => {
  console.log(props, 'props')
  return(
    <Menu
      style={{ width: 256 }}
    >
      {props.item.children.map(child => {
        console.log(child, 'child')
        return (
        <Menu.Item key={child.key}>{child.title}</Menu.Item>
        )
      })}
    </Menu>
  )
};

const modalRoot = document.getElementById('portal');

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.el = document.createElement('div');
  }

  componentDidMount() {
    modalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.el);
  }

  render() {
    return ReactDOM.createPortal(
      this.props.children,
      this.el
    );
  }
}

function Child(props) {
  const span = 4;
  const arr = new Array(12).fill(7);
  // 这个按钮的点击事件会冒泡到父元素
  // 因为这里没有定义 'onClick' 属性
  return (
    <QueueAnim className="demo-content" animConfig={[
      { opacity: [1, 0], translateY: [0, 200] },
      { opacity: [1, 0], translateY: [0, 200] }
    ]}>
    {
      props.moduleShow ? 
      <div className="module-modal" key="a">
        <a className="module-close" onClick={() => props.handleModuleShow(false)}>
          <CloseOutlined style={{fontSize: "20px", color: "#000"}}/>
        </a>
        <Row gutter={[24, 30]} align="middle">
          {arr.map((item,key) => {
            return (
              <Col className="gutter-row" span={span} key={key}>
                <div className="module-grid">
                  <div className="module-grid-icon">
                    <img src={require('@/assets/dingdan.png')}/>
                  </div>
                  <div className="module-grid-title">订单</div>
                </div>
              </Col>
            )
          })}
        </Row>
      </div> : null
    }
    </QueueAnim>
    
  );
}


export default function Widget() {
  const mounting = 10;
  const [moduleShow, handleModuleShow] = useState(false);
  const [position, setPosition] = useState({x: mounting, y: mounting});
  let handleStop = (e) => {
    let x = document.body.clientWidth / 2 > e.x ? mounting : document.body.clientWidth - mounting - 50;
    let y = e.pageY - 64 - e.offsetY < mounting ? mounting :  e.pageY - 64 - e.offsetY;
    // y = y < document.body.clientHeight - 500 ? document.body.clientHeight - 500 : y;
    console.log(y)
    setPosition({x, y})
  };


  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} style={{float:'left'}}>
          {moduleMenu.menu.map(item => {
            console.log(item.key, 'item.key');
            return (
              <Menu.Item key={item.key}>
                {item.children && item.children.length > 0 ? 
                <Dropdown overlay={menu2({item})} placement="bottomLeft" trigger="click">
                  <span className="header-menu-item">{item.title} <DownOutlined /></span>  
                </Dropdown>: item.title}
              </Menu.Item> 
            )
          })}
        </Menu>
        <div className="layout-header-right">
          <Dropdown overlay={MenuAdmin({handleModuleShow})} placement="bottomCenter">
            <Row justify="space-around" align="middle" style={{height: '64px'}}>
              <Col span={24}>
              <Avatar icon={<UserOutlined />} />
              <span className="layout-username">admin</span>
              </Col>
            </Row>
          </Dropdown>
        </div>
      </Header>
      <div>
        
      </div>
      {/* <Button onClick={() => handleModuleShow(true)}>打开</Button> */}
      {/* <Modal>
      <Draggable
        defaultPosition={{x: 0, y: 0}}
        position={position}
        scale={1}
        onStop={handleStop}
        >
        <div className="module-drag" >
          
        </div>
      </Draggable>
      </Modal> */}
      <Modal>
        <Child moduleShow={moduleShow} handleModuleShow={handleModuleShow}/>
      </Modal>
    </Layout>
  );
}

