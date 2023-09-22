import { Button, Modal } from 'antd';
import React, { useState } from 'react';
import './style.css';
interface IBasePoupProps {
  showAddUpdate: boolean;
  setShowAddUpdate: (value: boolean) => void;
  title: string;
  children?: JSX.Element | JSX.Element[];
}
const BasePopup = (props: IBasePoupProps) => {
  const { setShowAddUpdate, showAddUpdate,title,children } = props;
  const handleCancel = () => {
    setShowAddUpdate(false);
  };
  return (
    <Modal
      title={title}
      open={showAddUpdate}
      maskClosable={false}
      onCancel={handleCancel}
      className='base-modal'
      footer={[
        <Button key={1} onClick={handleCancel}>
          Hủy bỏ
        </Button>,
      ]}
      >
      {children}
    </Modal>
  );
};

export default BasePopup;
