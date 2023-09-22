import MyForm, { MyFormProps } from '@/components/core/form';
import MyButton from '@/components/basic/button';
import { css } from '@emotion/react';

import { Col, Row } from 'antd';
import { useLocale } from '@/locales';
import { isNil } from 'lodash';
import { isObjectDefined } from '@/utils/common';

interface SearchProps<T> extends MyFormProps<T> {
  onSearch: (values: T) => void;
  loading: boolean;
}

const BaseSearch = <T extends object>(props: SearchProps<T>) => {
  const { children, onSearch, loading, ...rest } = props;
  const [form] = MyForm.useForm<T>();

  const { t } = useLocale();

  const onSubmit = async () => {
    const values = await form.validateFields();
    if (values) {
      onSearch(values);
    }
  };
  const handleFieldChange = async () => {
    const values = await form.validateFields();
    console.log(values)
    if (!isObjectDefined(values) || values === null ) {
      await onSubmit();
    }
  };
  const resetFields = async () => {
    form.resetFields();
    const values = await form.validateFields();
    if (!isObjectDefined(values)) {
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
    <div css={styles}>
      <MyForm
        {...rest}
        form={form}
        onValuesChange={handleFieldChange}
        name="advanced_search"
        className="ant-advanced-search-form"
        onKeyDown={handleKeyEnter}>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>{children}</Row>
        {/* {children} */}
        <Row>
          <Col span={24} style={{ textAlign: 'right' }}>
            {/* <MyForm.Item> */}
            <MyButton type="primary" onClick={onSubmit} loading={loading}>
              {t({ id: 'search' })}
            </MyButton>

            <MyButton onClick={() => resetFields()}>
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
