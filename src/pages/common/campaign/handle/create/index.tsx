import {
  apiCampaignById,
  apiCreateCampaign,
  apiUpdateCampaign,
} from '@/api/campaigns/api';
import MyForm from '@/components/core/form';
import { useLocale } from '@/locales';
import SelectRuleName from '@/pages/components/selects/SelectRuleName';
import SelectRuleOperator from '@/pages/components/selects/SelectRuleOperator';
import { ArrowLeftOutlined } from '@ant-design/icons';
import {
  Button,
  Card,
  Checkbox,
  Col,
  Form,
  FormInstance,
  Row,
  Space,
  Spin,
  Typography,
  message,
} from 'antd';
import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { IFormCreateCampaign, IRule } from '../form_create/types';
import SelectSocial from '@/pages/components/selects/SelectSocial';
const inddex = () => {
  const navigate = useNavigate();
  const { Text } = Typography;
  const { t } = useLocale();
  const [loading, setLoading] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [form] = Form.useForm();
  const { id } = useParams();
  const initalValueForm: IFormCreateCampaign = {
    site: '',
    name: '',
    description: '',
    active: false,
    ruleName: '',
    ruleOperator: '',
    ruleValue: '',
  };
  const goBack = () => {
    navigate('/campaign');
  };
  const onFinish = async () => {
    await form?.validateFields();
    var data = await form?.getFieldsValue();
    const rule: IRule = {
      name: data.ruleName,
      operator: data.ruleOperator,
      value: data.ruleValue,
    };
    console.log(isActive);
    data = id
      ? {
          ...data,
          id: id,
          active: isActive,
          rule: rule,
        }
      : {
          ...data,
          active: isActive,
          rule: rule,
        };
    setLoading(true);
    const res = id
      ? await apiUpdateCampaign(data)
      : await apiCreateCampaign(data);
    if (res) {
      message.info('Tạo chiến thành công!');
      setLoading(false);
      goBack();
    } else {
      setLoading(false);
    }
  };

  const _apiCampaignById = async (idCampaign: String) => {
    if (!idCampaign) {
      return;
    }

    try {
      setLoading(true);
      const res = (await apiCampaignById(idCampaign)) as any;
      console.log(res);

      if (res) {
        form &&
          form.setFieldsValue({
            site: res.data.site,
            name: res.data.name,
            groupId: res.data.groupId,
            active: res.data.active,
            ruleName: res.data.rule?.name,
            ruleOperator: res.data.rule?.operator,
            ruleValue: res.data.rule?.value,
          });
        setIsActive(res.data.active);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log(id);
    _apiCampaignById(id!);
  }, [id]);
  return (
    <>
      <Card className="title-create" style={{ flex: 'none' }}>
        <Space>
          <Text
            style={{ cursor: 'pointer' }}
            onClick={(e: any) => {
              e.preventDefault();
              goBack();
            }}>
            <ArrowLeftOutlined />
          </Text>
          <Typography>{id ? 'Cập nhật' : 'Tạo mới'} chiến dịch</Typography>
        </Space>
      </Card>
      <Card>
        <Spin spinning={loading}>
          <MyForm<IFormCreateCampaign>
            onFinish={onFinish}
            initialValues={initalValueForm}
            form={form}
            labelCol={{ span: 24 }}
            style={{ maxWidth: 600 }}
            layout="vertical">
            <Row gutter={24}>
              <Col span={24}>
                <Row gutter={24}>
                  <Col span={12}>
                    <SelectSocial required />
                  </Col>
                  <Col span={12}>
                    <MyForm.Item
                      innerProps={{
                        placeholder: t(
                          { id: 'placeholder_input' },
                          { msg: 'name' }
                        ),
                      }}
                      label={'Tên chiến dịch'}
                      required
                      name="name"
                      type="input"
                    />
                  </Col>
                  <Col span={12}>
                    <MyForm.Item
                      innerProps={{
                        placeholder: t(
                          { id: 'placeholder_input' },
                          { msg: 'mô tả' }
                        ),
                      }}
                      label={'Mô tả'}
                      name="description"
                      type="input-textarea"
                    />
                  </Col>
                  <Col span={12}>
                    <SelectRuleName required />
                  </Col>
                  <Col span={12}>
                    <SelectRuleOperator required />
                  </Col>
                  <Col span={12}>
                    <MyForm.Item
                      innerProps={{
                        placeholder: t(
                          { id: 'placeholder_input' },
                          { msg: 'rule value' }
                        ),
                      }}
                      label={'Rule value'}
                      required
                      name="ruleValue"
                      type="input-number"
                    />
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="active"
                      initialValue={isActive}
                      rules={[
                        {
                          required: true,
                          message: 'Vui lòng nhập trạng thái!',
                        },
                      ]}>
                      <Checkbox
                        checked={isActive}
                        onChange={e => setIsActive(e.target.checked)}>
                        Active
                      </Checkbox>
                    </Form.Item>
                  </Col>
                </Row>
              </Col>
            </Row>
          </MyForm>
        </Spin>
        <Space>
          <Button
            onClick={(e: any) => {
              e.preventDefault();
              goBack();
            }}>
            Hủy bỏ
          </Button>
          <Button type="primary" onClick={onFinish} loading={loading}>
            {id ? 'Cập nhật' : 'Tạo mới'}
          </Button>
        </Space>
      </Card>
    </>
  );
};

export default inddex;
