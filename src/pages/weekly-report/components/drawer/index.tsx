import Tabs from './tabs';
import './style.css';
import { Space, Typography } from 'antd';
import { useState } from 'react';
import { CloseOutlined } from '@ant-design/icons';
interface DrawerProps {
  onClose?: () => void;
  isShow: boolean;
  setForceUpdate?: any;
  forceUpdate: boolean;
}
const {Title } = Typography;
const index = (props: DrawerProps) => {
  const { isShow, onClose,setForceUpdate,forceUpdate} = props;
  return isShow ? (
    <div className="drawer-container">
      <div className="drawer-close-btn" onClick={onClose}><CloseOutlined /></div>
      {/* <Title className="drawer-title" level={4}>
        Thông tin chấm công
      </Title> */}
      <Space className="drawer-content">
        <Tabs setForceUpdate={setForceUpdate} forceUpdate={forceUpdate}/>
      </Space>
    </div>
  ) : null;
};

export default index;
