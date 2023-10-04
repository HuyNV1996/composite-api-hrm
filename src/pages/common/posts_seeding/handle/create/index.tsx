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
import {
  apiCreateSeedingPost,
  apiGetPostSeedingById,
  apiUpdatePostSeeding,
} from '@/api/posts/api';
import SelectGroup from '@/pages/components/selects/SelectGroup';
import SelectUsers from '@/pages/components/selects/SelectUser';
const inddex = () => {
  const navigate = useNavigate();
  const { Text } = Typography;
  const { t } = useLocale();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const { id } = useParams();
  const initalValueForm: IFormCreateCampaign = {
    site: '',
    content: '',
    linkImage: '',
    createdAt: '',
  };
  const goBack = () => {
    navigate('/posts-seeding');
  };
  const onFinish = async () => {
    await form?.validateFields();
    var data = await form?.getFieldsValue();
    console.log(data);

    setLoading(true);
    const res = id
      ? await apiUpdatePostSeeding(data)
      : await apiCreateSeedingPost(data);
    if (res) {
      message.info('Tạo post seeding thành công!');
      setLoading(false);
      goBack();
    } else {
      setLoading(false);
    }
  };

  const _apiPostSeedingById = async (id: string) => {
    if (!id) {
      return;
    }

    try {
      setLoading(true);
      const res = (await apiGetPostSeedingById(id)) as any;
      console.log(res.data.user.name);

      if (res) {
        form &&
          form.setFieldsValue({
            site: res.data.site,
            content: res.data.content,
            groupId: res.data.groupId,
            userID: res.data.user.name,
          });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    _apiPostSeedingById(id!);
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
                    <SelectSocial />
                  </Col>
                  <Col span={12}>
                    <MyForm.Item
                      innerProps={{
                        placeholder: t(
                          { id: 'placeholder_input' },
                          { msg: 'content' }
                        ),
                      }}
                      label={'Nội dung'}
                      required
                      name="content"
                      type="input"
                    />
                  </Col>
                  <Col span={12}>
                    <SelectGroup required />
                  </Col>
                  <Col span={12}>
                    <SelectUsers required />
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
