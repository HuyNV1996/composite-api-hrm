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
import UploadImage from '@/components/business/upload-file';
import SelectTypeCampaign from '@/pages/components/selects/SelectTypeCampaign';

const inddex = () => {
  const navigate = useNavigate();
  const { Text } = Typography;
  const { t } = useLocale();
  const [loading, setLoading] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [form] = Form.useForm();
  const { id } = useParams();
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState<string>('');
  const [previewOpen, setPreviewOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>('');
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
    // console.log(isActive);
    data = id
      ? {
          ...data,
          id: id,
          active: isActive,
          rule: rule,
          image: data?.image?.url
        }
      : {
          ...data,
          active: isActive,
          rule: rule,
          image: data?.image?.url
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
            type: res.data.type
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

  const onChangeUpload = (value: any) => {
    console.log(value);
    // setBannerUrl(value);
  };
  const handleCancelPreview = () => {
    setPreviewOpen(false);
  };
  return (
    <div>
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
            layout="vertical">
            <Row gutter={24}>
              <Col span={24}>
                <Row gutter={24}>
                  <Col span={6} xs={24} md={16} lg={6}>
                    <SelectSocial required />
                  </Col>
                  <Col span={6} xs={24} md={16} lg={6}>
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
                  <Col span={6} xs={24} md={16} lg={6}>
                    <SelectTypeCampaign required />
                  </Col>
                  <Col span={6} xs={24} md={16} lg={6}>
                    <SelectRuleName required />
                  </Col>
                  <Col span={6} xs={24} md={16} lg={6}>
                    <SelectRuleOperator required />
                  </Col>
                  <Col span={6} xs={24} md={16} lg={6}>
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
                      type="input"
                    />
                  </Col>
                  <Col span={6} xs={24} md={16} lg={6}>
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
                  <Col span={6} xs={24} md={16} lg={6}>
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
                  <Col span={6} xs={24} md={16} lg={6}>
                    <Form.Item
                      label={'Gửi ảnh'}
                      name="image"
                      // rules={[
                      //   { required: true, message: 'Vui lòng tải ảnh lên!' },
                      // ]}
                      >
                      <UploadImage
                        onChange={onChangeUpload}
                        setPreviewImage={setPreviewImage}
                        setPreviewTitle={setPreviewTitle}
                        setPreviewOpen={setPreviewOpen}
                        initialValue={imageUrl}
                        isReturnFile = {false}
                        fileType="chat_image"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={6} xs={24} md={16} lg={6}>
                    <MyForm.Item
                      innerProps={{
                        placeholder: t(
                          { id: 'placeholder_input' },
                          { msg: 'nội dung' }
                        ),
                        rows: 8
                      }}
                      label={'Nội dung'}
                      // required
                      name="content"
                      type="input-textarea"
                    />
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
    </div>
  );
};

export default inddex;
