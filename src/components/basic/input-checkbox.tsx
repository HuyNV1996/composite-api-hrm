import { Checkbox } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import React, { FC } from 'react'

const MyCheckbox  = ({ ...props }) => {

  return (
    <Checkbox {...props} onChange={(e: CheckboxChangeEvent) => props.onChange(e.target.value)}>{props.label}</Checkbox>
  )
}

export default MyCheckbox