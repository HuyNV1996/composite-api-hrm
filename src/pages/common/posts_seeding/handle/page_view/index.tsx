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
import TagComponent from '../../components/tags';
const inddex = () => {
  const navigate = useNavigate();
  const { Text } = Typography;
  const { t } = useLocale();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const { id } = useParams();
  const [tagsValue, setTagsValue] = useState<string[]>([]);
  const initalValueForm: IFormCreateCampaign = {
    site: '',
    content: '',
    linkImage: '',
    createdAt: '',
    tag: ['']
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
      console.log(res.data);

      if (res) {
        form &&
          form.setFieldsValue({
            site: res.data.site,
            content: res.data.content,
            groupId: res.data.groupId,
            userID: res.data.userEntity.name,
            tag: res.data.tag
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
  
  const onChangeTags = (value: any) => {
    // console.log(value)
  };
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
            disabled
            labelCol={{ span: 24 }}
            // style={{ maxWidth: 600 }}
            layout="vertical">
            <Row gutter={24}>
              <Col span={24}>
                <Row gutter={24}>
                  <Col span={8}>
                    <SelectSocial required/>
                  </Col>
                  <Col span={8}>
                    <SelectGroup />
                  </Col>
                  <Col span={8}>
                    <SelectUsers />
                  </Col>
                  {/* Tags */}
                  <Col span={24}>
                    <Form.Item label={'Tags'} required name="tag">
                      <TagComponent
                        onChange={onChangeTags}
                        viewMode={id != null}
                        value={tagsValue}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <MyForm.Item
                      innerProps={{
                        placeholder: t(
                          { id: 'placeholder_input' },
                          { msg: 'nội dung' }
                        ),
                        rows: 8
                      }}
                      label={'Nội dung'}
                      required
                      name="content"
                      type="input-textarea"
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
          </MyForm>
        </Spin>
      </Card>
    </>
  );
};

export default inddex;
