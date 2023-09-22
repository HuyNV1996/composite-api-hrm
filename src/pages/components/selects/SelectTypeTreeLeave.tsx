import { Form, TreeSelect } from 'antd';
import { useState } from 'react';

const { TreeNode } = TreeSelect;
interface ISelectTypeLeaveProps{
    treeData: any[]
    setTypeLeaveValue: (value: string) => void;
    typeLeaveValue: string;
}
const SelectTypeLeave = (props:ISelectTypeLeaveProps) => {
  const { treeData,setTypeLeaveValue,typeLeaveValue } = props;
  const onChangeSelectTypeLeave = (value: string) => {
    setTypeLeaveValue(value);
  };
  const renderTreeNodes = (data:any) => {
    return data.map((node:any) => {
      if (node.children && node.children.length > 1 && !node.value.includes("TN")) {
        return (
          <TreeNode
            value={node.value}
            title={node.title}
            key={node.value}
            disabled = {true}
          >
            {renderTreeNodes(node.children)}
          </TreeNode>
        );
      }
      else if (node.children && node.children.length === 1 && !node.value.includes("TN")) {
        return (
          <TreeNode
            value={node.children[0].value}
            title={node.title}
            key={node.children[0].value}
          >
            
          </TreeNode>
        )

      }
      else if(!node.value.includes("TN")){
      return (
        <TreeNode
          value={node.value}
          title={node.title}
          key={node.value}
          // disabled={node.disabled}
        />
      );
    }

    });
  };
  return (
    <>
      <Form.Item
        label={'Loại đơn'}
        name="typeLeave"
        rules={[{ required: true, message: 'Chọn loại đơn' }]}>
        <TreeSelect
          style={{ width: '100%' }}
          value={typeLeaveValue}
          showSearch
          allowClear
          dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
          placeholder="Chọn loại đơn"
          treeDefaultExpandAll
          onChange={onChangeSelectTypeLeave}
        >
        {renderTreeNodes(treeData)}
    </TreeSelect>
      </Form.Item>
    </>
  );
};

export default SelectTypeLeave;
