import MyForm from '@/components/core/form'
import { useLocale } from '@/locales'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { Button, Card, Col, Form, Row, Space, Spin, Typography, message } from 'antd'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { IFormCreateCampaign } from '../form_create/types'
import { apiCreateSeedingPost, apiGetPostById } from '@/api/posts/api'
import { IGetPostByIdResponse } from '@/interface/posts/types';
import SelectSocial from '@/pages/components/selects/SelectSocial'
import SelectGroup from '@/pages/components/selects/SelectGroup'
import SelectUsers from '@/pages/components/selects/SelectUser'
const inddex = () => {
  const navigate = useNavigate()
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
    navigate('/posts');
  }
  const onFinish = async () => {
    await form?.validateFields();
    var data = await form?.getFieldsValue();
    const body = {
      userId: data.userID,
      content: data.description,
      site: data.site,
      groupId: data.groupId
    }
    setLoading(true);
    const res = await apiCreateSeedingPost(body)
    if (res.status === 1) {
      message.info('Tạo bài viết thành công!');
      setLoading(false);
      goBack();
    } else {
      setLoading(false);
    }
  };

  const _apiPostById = async (id: string) => {
    if (!id) {
      return;
    }

    try {
      setLoading(true);
      const res = (await apiGetPostById(id)) as IGetPostByIdResponse;
      const { user } = res.data;
      if (res) {
        form &&
          form.setFieldsValue({
            ...res.data,
            userId: user.id,
            userName: user.name,
            password: user.password,
            token: user.token,
            userBio: user.bio,
            email: user.email,
            address: user.address,
            userPosts: user.totalPosts,
            userLikes: user.totalLikes,
            userfollowers: user.followers,
            userFllowing: user.following,
          });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    _apiPostById(id!);
  }, [id]);
  return (
    <>
      <Card className='title-create' style={{ flex: 'none' }}>
        <Space>
          <Text
            style={{ cursor: 'pointer' }}
            onClick={(e: any) => {
              e.preventDefault();
              goBack();
            }}>
            <ArrowLeftOutlined />
          </Text>
          <Typography>Thông tin bài viết</Typography>
        </Space>
      </Card>
      <Card>
        <Spin spinning={loading}>
          <MyForm<IFormCreateCampaign>
            // onFinish={onFinish}
            initialValues={initalValueForm}
            form={form}
            labelCol={{ span: 24 }}
            layout="vertical">
            <Row gutter={24}>
              <Col span={16}>
                <Card title='Bài viết'>
                  <Row gutter={24}>
                    <Col span={12}>
                      <SelectSocial />
                    </Col>
                    <Col span={12}>
                      <SelectGroup />
                    </Col>
                    <Col span={12}>
                      <MyForm.Item
                        label={'Tiêu đề'}
                        name="title"
                        type="input"
                      />
                    </Col>
                    <Col span={12}>
                      <MyForm.Item
                        label={'Link bài viết'}
                        name="link"
                        type="input"
                      />
                    </Col>
                    <Col span={24}>
                      <MyForm.Item
                        innerProps={{
                          rows: 4,
                        }}
                        label={'Nội dung'}
                        required
                        name="description"
                        type="input-textarea"
                      />
                    </Col>
                    <Col span={8}>
                      <MyForm.Item
                      innerProps={{
                        disabled: true
                      }}
                        label={'Số lượng like'}
                        required
                        name="totalLikes"
                        type="input"
                      />
                    </Col>
                    <Col span={8}>
                      <MyForm.Item
                      innerProps={{
                        disabled: true
                      }}
                        label={'Số lượng bình luận'}
                        name="totalComments"
                        type="input"
                      />
                    </Col>
                    <Col span={8}>
                      <MyForm.Item
                      innerProps={{
                        disabled: true
                      }}
                        label={'Số lượng chia sẻ'}
                        required
                        name="totalShares"
                        type="input"
                      />
                    </Col>
                  </Row>
                </Card>
              </Col>
              <Col span={8}>
                <Card title='Thông tin bài đăng'>
                  <Row gutter={24}>
                    <Col span={24}>
                      <SelectUsers required />
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
          </MyForm>
        </Spin>
        <Space style={{marginTop:15}}>
          <Button
            onClick={(e: any) => {
              e.preventDefault();
              goBack();
            }}>Hủy bỏ</Button>
          <Button type='primary' onClick={onFinish} loading={loading}>{id ? 'Tạo bài đăng' : 'Tạo mới'}</Button>
        </Space>
      </Card>
    </>
  )
}

export default inddex