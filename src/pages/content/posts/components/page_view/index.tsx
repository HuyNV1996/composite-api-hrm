import { apiCampaignById, apiCreateCampaign, apiUpdateCampaign } from '@/api/campaigns/api'
import MyForm from '@/components/core/form'
import { useLocale } from '@/locales'
import SelectRuleName from '@/pages/components/selects/SelectRuleName'
import SelectRuleOperator from '@/pages/components/selects/SelectRuleOperator'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { Button, Card, Checkbox, Col, Form, FormInstance, Row, Space, Spin, Typography, message } from 'antd'
import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { IFormCreateCampaign, IRule } from '../form_create/types'
import SelectSocial from '@/pages/components/selects/SelectSocial'
import { apiGetPostById } from '@/api/posts/api'
import { IGetPostByIdResponse } from '@/interface/posts/types';
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

    const _apiPostById = async (id: string) => {
        if (!id) {
            return;
        }

        try {
            setLoading(true);
            const res = (await apiGetPostById(id)) as IGetPostByIdResponse;
            const { userEntity } = res.data;
            // console.log(res.data);
            if (res) {
                form &&
                    form.setFieldsValue({
                        ...res.data,
                        userId: userEntity?.id,
                        userName: userEntity?.name,
                        password: userEntity?.password,
                        token: userEntity?.token,
                        userBio: userEntity?.bio,
                        email: userEntity?.email,
                        address: userEntity?.address,
                        userPosts: userEntity?.totalPosts,
                        userLikes: userEntity?.totalLikes,
                        userfollowers: userEntity?.followers,
                        userFllowing: userEntity?.following,
                        // originalContent: res.data.originalContent
                    });
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // console.log(id)
        _apiPostById(id!);
    }, [id]);
    return (
        <div>
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
                        // style={{ maxWidth: 600 }}
                        disabled
                        layout="vertical">
                        <Row gutter={24}>
                            <Col span={16} xs={24} md={16} lg={16}>
                                <Card title='Site'>
                                    <Row gutter={24}>
                                        <Col span={12}>
                                            <MyForm.Item
                                                label={'Site'}
                                                required
                                                name="site"
                                                type="input"
                                            />
                                        </Col>
                                        <Col span={12}>
                                            <MyForm.Item
                                                label={'Nhóm'}
                                                required
                                                name="groupId"
                                                type="input"
                                            />
                                        </Col>
                                        <Col span={12}>
                                            <MyForm.Item
                                                label={'Tiêu đề'}
                                                required
                                                name="title"
                                                type="input"
                                            />
                                        </Col>
                                        <Col span={12}>
                                            <MyForm.Item
                                                label={'Link bài viết'}
                                                required
                                                name="link"
                                                type="input"
                                            />
                                        </Col>
                                        <Col span={24}>
                                            <MyForm.Item
                                                innerProps={{
                                                    rows: 10,
                                                }}
                                                label={'Nội dung'}
                                                required
                                                name="originalContent"
                                                type="input-textarea"
                                            />
                                        </Col>
                                        <Col span={8}>
                                            <MyForm.Item
                                                label={'Số lượng like'}
                                                required
                                                name="totalLikes"
                                                type="input"
                                            />
                                        </Col>
                                        <Col span={8}>
                                            <MyForm.Item
                                                label={'Số lượng bình luận'}
                                                required
                                                name="totalComments"
                                                type="input"
                                            />
                                        </Col>
                                        <Col span={8}>
                                            <MyForm.Item
                                                label={'Số lượng chia sẻ'}
                                                required
                                                name="totalShares"
                                                type="input"
                                            />
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
                            <Col span={8} xs={24} md={8} lg={8}>
                                <Card title='Tác giả'>
                                    <Row gutter={24}>
                                        <Col span={12}>
                                            <MyForm.Item
                                                label={'Tên đăng nhập'}
                                                required
                                                name="userName"
                                                type="input"
                                            />
                                        </Col>
                                        <Col span={12}>
                                            <MyForm.Item
                                                label={'Mật khẩu'}
                                                required
                                                name="password"
                                                type="input"
                                            />
                                        </Col>
                                        <Col span={12}>
                                            <MyForm.Item
                                                label={'Token'}
                                                required
                                                name="token"
                                                type="input"
                                            />
                                        </Col>
                                        <Col span={12}>
                                            <MyForm.Item
                                                label={'Bio'}
                                                required
                                                name="userBio"
                                                type="input"
                                            />
                                        </Col>
                                        <Col span={12}>
                                            <MyForm.Item
                                                label={'email'}
                                                required
                                                name="email"
                                                type="input"
                                            />
                                        </Col>
                                        <Col span={12}>
                                            <MyForm.Item
                                                label={'Địa chỉ'}
                                                required
                                                name="address"
                                                type="input"
                                            />
                                        </Col>
                                        <Col span={8}>
                                            <MyForm.Item
                                                label={'Số lượng bài viết'}
                                                required
                                                name="userPosts"
                                                type="input"
                                            />
                                        </Col>
                                        <Col span={8}>
                                            <MyForm.Item
                                                label={'Số lượng like'}
                                                required
                                                name="userLikes"
                                                type="input"
                                            />
                                        </Col>
                                        <Col span={8}>
                                            <MyForm.Item
                                                label={'Số lượng theo dõi'}
                                                required
                                                name="userfollowers"
                                                type="input"
                                            />
                                        </Col>
                                        <Col span={8}>
                                            <MyForm.Item
                                                label={'Đang follow'}
                                                required
                                                name="userFllowing"
                                                type="input"
                                            />
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
                        </Row>
                    </MyForm>
                </Spin>
            </Card>
        </div>
    )
}

export default inddex