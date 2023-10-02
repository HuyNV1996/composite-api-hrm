import MyForm, { MyFormProps } from '@/components/core/form';
import MyButton from '@/components/basic/button';
import { css } from '@emotion/react';

import { Button, Col, Drawer, Row } from 'antd';
import { useLocale } from '@/locales';
import { isObjectDefined } from '@/utils/common';
interface SearchProps<T> extends MyFormProps<T> {
  onSearch: (values: T) => void;
  loading: boolean;
  open: boolean;
  onClose: () => void;
}

const BaseSearch = <T extends object>(props: SearchProps<T>) => {
  const { children, onSearch,onClose, open, loading, ...rest } = props;
  const [form] = MyForm.useForm<T>();

  const { t } = useLocale();

  const onSubmit = async () => {
    const values = await form.validateFields();
    //console.log(values);
    if (values) {
      onSearch(values);
      onClose();
    }
  };
  
  const handleFieldChange = async () => {
    const values = await form.validateFields();
    if (!isObjectDefined(values) || values === null ) {
      await onSubmit();
    }
  };
  const handleKeyEnter = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onSubmit();
    }
  };
  return (
    <div  css={styles}>
      <MyForm
        {...rest}
        form={form}
        name="advanced_search"
        className="ant-advanced-search-form"
        onValuesChange={handleFieldChange}
        onKeyDown={handleKeyEnter}>
        <Row gutter={24}>{children}</Row>
        <Row>
          <Col span={24} style={{ textAlign: 'right' }}>
            {/* <MyForm.Item> */}
            <MyButton type="primary" onClick={onSubmit} loading={loading}>
              {t({ id: 'search' })}
            </MyButton>

            <MyButton onClick={() => form.resetFields()}>
              {t({ id: 'reset' })}
            </MyButton>
            {/* </MyForm.Item> */}
          </Col>
        </Row>
      </MyForm>
    </div>
  );
};

const MySearch = Object.assign(BaseSearch, {
  Item: MyForm.Item,
});

export default MySearch;

const styles = css`
  padding: 20px;
  .ant-form-item {
    margin-bottom: 20px;
  }
`;
