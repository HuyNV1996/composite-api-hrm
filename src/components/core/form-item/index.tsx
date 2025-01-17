import React, { FC, useMemo } from 'react';
import { FormItemProps } from 'antd/lib/form';
import {
  Form,
  Input,
  InputNumber,
  Switch,
  DatePicker,
  Checkbox,
  Radio,
  Select,
  TimePicker
} from 'antd';
import { SearchOutlined } from '@ant-design/icons';

export type ControlTypes =
  | 'input'
  | 'input-number'
  | 'input-search'
  | 'switch'
  | 'date-picker'
  | 'checkbox'
  | 'radio'
  | 'select'
  | 'input-textarea'
  | 'date-picker-range'
  | 'time-picker-range'
  | 'time-picker';

type GetRCPropsType<T> = T extends (props: infer R) => any
  ? R
  : T extends React.ComponentClass<infer R>
  ? R
  : any;
  const { TextArea  } = Input;
  const { RangePicker } = DatePicker;
type InnerProps = {
  input: GetRCPropsType<typeof Input>;
  'input-number': GetRCPropsType<typeof InputNumber>;
  'input-textarea': GetRCPropsType<typeof TextArea>;
  'input-search': GetRCPropsType<typeof Input>;
  switch: GetRCPropsType<typeof Switch>;
  'date-picker': GetRCPropsType<typeof DatePicker>;
  'date-picker-range': GetRCPropsType<typeof RangePicker>;
  'time-picker-range': GetRCPropsType<typeof TimePicker.RangePicker>;
  'time-picker': GetRCPropsType<typeof TimePicker>;
  checkbox: GetRCPropsType<typeof Checkbox>;
  radio: GetRCPropsType<typeof Radio>;
  select: GetRCPropsType<typeof Select>;
};

export interface MyFormItemProps<T extends ControlTypes = ControlTypes>
  extends Omit<FormItemProps, 'required'> {
  type?: T;
  /** 支持 options 的控件如 select checkbox radio 等，非必填 **/
  options?: {
    label: string;
    value: any;
    disabled?: boolean;
  }[];
  /** 控件内部属性，非必填 **/
  innerProps?: InnerProps[T];
  required?: string | boolean;
}

export class ControlMap {
  props: MyFormItemProps;

  constructor(props: MyFormItemProps) {
    this.props = props;
  }

  get innerProps() {
    return this.props.innerProps as object;
  }

  input() {
    return <Input {...this.innerProps} />;
  }

  'input-number'() {
    return <InputNumber {...this.innerProps} style={{ width: '100%' }}/>;
  }
  'input-textarea'() {
    return <TextArea {...this.innerProps} />;
  }
  'input-search'() {
    return <Input
    size='large'
    allowClear
    style={{borderRadius:'100px'}}
    prefix={<SearchOutlined />}
    {...this.innerProps} />;
  }
  switch() {
    return <Switch {...this.innerProps} />;
  }

  'date-picker'() {
    return <DatePicker {...this.innerProps} style={{ width: '100%' }} />;
  }
  'date-picker-range'() {
    return <RangePicker  {...this.innerProps} style={{ width: '100%' }} />;
  }
  'time-picker-range'() {
    return <TimePicker.RangePicker  {...this.innerProps} style={{ width: '100%' }} />;
  }
  'time-picker'() {
    return <TimePicker {...this.innerProps} style={{ width: '100%' }} />;
  }
  checkbox () {
    // highlight-next-line
    return (
      <Checkbox.Group
        children={this.props.children}
        options={this.props.options}
        {...this.innerProps}
      />
    );
  }

  radio() {
    // highlight-next-line
    return (
      <Radio.Group
        children={this.props.children}
        options={this.props.options}
        {...this.innerProps}
      />
    );
  }

  select() {
    // highlight-next-line
    return (
      <Select
        children={this.props.children}
        options={this.props.options}
        {...this.innerProps}
        filterOption={(input, option) =>
      (option?.label?.toString() ?? '').toLowerCase().includes(input.toLowerCase())
    }
        showSearch
      />
    );
  }
}

const MyformItem: FC<MyFormItemProps> = props => {
  // 取出我们自定义的参数，其余的全部原封不动的还给 `Form.Item`
  // type: 用于我们判断外面传进来的控件类型我们再渲染好了直接生成出来
  // children: 因为我们需要自定义 `Form.Item` 的子元素了，如果不取出来但父组件又提供的话会发生冲突
  const { type, required , rules: userRules, ...restProps } = props;

  const rules = useMemo(() => {
    // 如果设置了 rules 属性，说明用户需要完全自定义 rules，不仅仅是必填
    if (userRules) return userRules;

    // 如果设置了 required 属性
    if (required) {
      if (typeof required === 'boolean') {
        return [{ required: true, message: `Vui lòng nhập ${props.label}` }];
      }
      // 自定义 required 文案
      else if (typeof required === 'string') {
        return [{ required: true, message: required }];
      }
    }
  }, [required, userRules, props.label]);

  // highlight-next-line
  const controlMap = new ControlMap(props);

  return (
    <Form.Item {...restProps} rules={rules}>
      {type ? controlMap[type]() : props.children}
    </Form.Item>
  );
};

export default MyformItem;
