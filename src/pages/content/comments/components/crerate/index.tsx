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
import { apiGetCommentById } from '@/api/comments/api'
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
        navigate('/comments');
    }
    // const onFinish = async () => {
    //     await form?.validateFields();
    //     var data = await form?.getFieldsValue();
    //     const rule: IRule = {
    //         name: data.ruleName,
    //         operator: data.ruleOperator,
    //         value: data.ruleValue,
    //     };
    //     console.log(isActive);
    //     data = id
    //         ? {
    //             ...data,
    //             id: id,
    //             active: isActive,
    //             rule: rule,
    //         }
    //         : {
    //             ...data,
    //             active: isActive,
    //             rule: rule,
    //         };
    //     setLoading(true);
    //     const res = id
    //         ? await apiUpdateCampaign(data)
    //         : await apiCreateCampaign(data);
    //     if (res) {
    //         message.info('Tạo chiến thành công!');
    //         setLoading(false);
    //         goBack();
    //     } else {
    //         setLoading(false);
    //     }
    // };

    const _apiCommentById = async (id: string) => {
        if (!id) {
            return;
        }

        try {
            setLoading(true);
            const res = (await apiGetCommentById(id)) as any;
            const { user, postId, site, post } = res.data;
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
                        postTitle: post.title,
                        postContent: post.description
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
        _apiCommentById(id!);
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
                    <Typography>Thông tin bình luận</Typography>
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
                            <Col span={16}>
                                    {/* <Card title = 'Bài viết cha'>
                                        <Col span={24}>
                                                <MyForm.Item
                                                    label={'Tiêu đề'}
                                                    required
                                                    name="postTitle"
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
                                                    name="postContent"
                                                    type="input-textarea"
                                                />
                                            </Col>
                                    </Card> */}
                                <Card title='Bình luận'>
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
                                                name="group"
                                                type="input"
                                            />
                                        </Col>
                                        {/* <Col span={12}>
                                            <MyForm.Item
                                                label={'Tiêu đề'}
                                                required
                                                name="title"
                                                type="input"
                                            />
                                        </Col> */}
                                        
                                        {/* <Col span={12}>
                                            <MyForm.Item
                                                innerProps={{
                                                    rows: 4,
                                                }}
                                                label={'Mô tả'}
                                                required
                                                name="description"
                                                type="input-textarea"
                                            />
                                        </Col> */}
                                        <Col span={24}>
                                            <MyForm.Item
                                                innerProps={{
                                                    rows: 4,
                                                }}
                                                label={'Nội dung'}
                                                required
                                                name="originalContent"
                                                type="input-textarea"
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
                                        <Col span={12}>
                                            <MyForm.Item
                                                label={'Số lượng like'}
                                                required
                                                name="totalLikes"
                                                type="input"
                                            />
                                        </Col>
                                        <Col span={12}>
                                            <MyForm.Item
                                                label={'Số lượng bình luận'}
                                                required
                                                name="totalComments"
                                                type="input"
                                            />
                                        </Col>
                                        <Col span={12}>
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
                            <Col span={8}>
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
                                        <Col span={12}>
                                            <MyForm.Item
                                                label={'Số lượng bài viết'}
                                                required
                                                name="userPosts"
                                                type="input"
                                            />
                                        </Col>
                                        <Col span={12}>
                                            <MyForm.Item
                                                label={'Số lượng like'}
                                                required
                                                name="userLikes"
                                                type="input"
                                            />
                                        </Col>
                                        <Col span={12}>
                                            <MyForm.Item
                                                label={'Số lượng theo dõi'}
                                                required
                                                name="userfollowers"
                                                type="input"
                                            />
                                        </Col>
                                        <Col span={12}>
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
        </>
    )
}

export default inddex