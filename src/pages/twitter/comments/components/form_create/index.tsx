import { Col, FormInstance, Row, Spin, Modal, message, Card } from 'antd';
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import MyForm from '@/components/core/form';
import { useLocale } from '@/locales';
import { IFormCreateCampaign, IRule } from './types';
import { apiCreateCampaign, apiUpdateCampaign } from '@/api/campaigns/api';
import { apiGetPostById_FA } from '@/api/posts/api';
import { apiGetCommentById_FA, apiGetCommentById_FB, apiGetCommentById_TW } from '@/api/comments/api';
interface Props {
  onClose?: () => void;
  showDrawer?: () => void;
  open?: boolean;
  idComment?: string;
  setFoceUpdate?: Dispatch<SetStateAction<boolean>>;
  foceUpdate?: boolean;
  form?: FormInstance<any>;
}

const FormCreate: FC<Props> = ({
  onClose,
  open,
  idComment,
  foceUpdate,
  setFoceUpdate,
  form,
}) => {
  const { t } = useLocale();
  const [loading, setLoading] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const initalValueForm: IFormCreateCampaign = {
    site: '',
    name: '',
    description: '',
    active: false,
    ruleName: '',
    ruleOperator: '',
    ruleValue: '',
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
    data = idComment
      ? {
        ...data,
        id: idComment,
        active: isActive,
        rule: rule,
      }
      : {
        ...data,
        active: isActive,
        rule: rule,
      };
    setLoading(true);
    const res = idComment
      ? await apiUpdateCampaign(data)
      : await apiCreateCampaign(data);
    if (res) {
      message.info('Tạo chiến thành công!');
      setLoading(false);
      setFoceUpdate && setFoceUpdate(!foceUpdate);
      onClose && onClose();
    } else {
      setLoading(false);
    }
  };

  const _apiGetCommentById_TW = async (idComment: string) => {
    if (!idComment) {
      return;
    }

    try {
      setLoading(true);
      const res = (await apiGetCommentById_TW(idComment)) as any;
      console.log(res);

      if (res) {
        form &&
          form.setFieldsValue({
            commentId: res.data.commentId,
            userName: res.data.facebookUser.userName,
            linkAuth: res.data.facebookUser.link,
            textContent: res.data.faceBookPosts.textContent,
            postUrl: res.data.postUrl,
            linkImage: res.data.facebookUser.linkImage,
            totalLikes: res.data.faceBookPosts.totalLikes,
            totalComments: res.data.faceBookPosts.totalComments,
            totalShares: res.data.faceBookPosts.totalShares,
            commentText: res.data.commentText,
            commentUrl: res.data.commentUrl
          });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    _apiGetCommentById_TW(idComment!);
  }, [idComment]);

  return (
    <>
      <Modal
        key={idComment}
        title={idComment ? 'View' : t({ id: 'create' })}
        width={'800px'}
        className='modal-comment'
        maskClosable={false}
        onCancel={onClose}
        open={open}
        centered
        destroyOnClose
        bodyStyle={{ paddingBottom: 0 }}
        footer={null}>
        <Spin spinning={loading}>
          <MyForm<any>
            onFinish={onFinish}
            initialValues={initalValueForm}
            form={form}
            labelCol={{ span: 24 }}
            style={{ margin: 'auto' }}
            layout="vertical">
            <Row gutter={24}>
              <Col span={24}>
                <Row gutter={24}>
                  <Col span={24}>
                    <Card title='Thông tin bài viết'>
                      <Col span={24}>
                        <MyForm.Item
                          innerProps={{
                            placeholder: t(
                              { id: 'placeholder_input' },
                              { msg: 'id' }
                            ),
                            disabled: true,
                          }}
                          label={'Id'}
                          name="commentId"
                          type="input"
                        />
                      </Col>
                      <Col span={24}>
                        <MyForm.Item
                          innerProps={{
                            placeholder: t(
                              { id: 'placeholder_input' },
                              { msg: 'title' }
                            ),
                            disabled: true,
                          }}
                          label={'Tác giả'}
                          name="userName"
                          type="input"
                        />
                      </Col>
                      <Col span={24}>
                        <MyForm.Item
                          innerProps={{
                            placeholder: t(
                              { id: 'placeholder_input' },
                              { msg: 'title' }
                            ),
                            disabled: true,
                          }}
                          label={'Link tài khoản'}
                          name="linkAuth"
                          type="input"
                        />
                      </Col>
                      <Col span={24}>
                        <MyForm.Item
                          innerProps={{
                            placeholder: t(
                              { id: 'placeholder_input' },
                              { msg: 'bài viết gốc' }
                            ),
                            disabled: true,
                            rows: 4,
                          }}
                          label={'Nội dung bài viết gốc'}
                          name="textContent"
                          type="input-textarea"
                        />
                      </Col>
                      <Row gutter={24}>
                        <Col span={8}>
                          <MyForm.Item
                            innerProps={{
                              placeholder: t(
                                { id: 'placeholder_input' },
                                { msg: 'like' }
                              ),
                              disabled: true,
                            }}
                            label={'Like'}
                            name="totalLikes"
                            type="input"
                          />
                        </Col>
                        <Col span={8}>
                          <MyForm.Item
                            innerProps={{
                              placeholder: t(
                                { id: 'placeholder_input' },
                                { msg: 'total replies' }
                              ),
                              disabled: true,
                            }}
                            label={'Comments'}
                            name="totalComments"
                            type="input"
                          />
                        </Col>
                        <Col span={8}>
                          <MyForm.Item
                            innerProps={{
                              placeholder: t(
                                { id: 'placeholder_input' },
                                { msg: 'total shares' }
                              ),
                              disabled: true,
                            }}
                            label={'Share'}
                            name="totalShares"
                            type="input"
                          />
                        </Col>
                      </Row>
                    </Card>
                  </Col>
                  <Col span={24}>
                    <Card title='Thông tin bình luận' style={{margin: '10px 0px'}}>
                      <Col span={24}>
                        <MyForm.Item
                          innerProps={{
                            placeholder: t(
                              { id: 'placeholder_input' },
                              { msg: 'Nội dung bình luận' }
                            ),
                            disabled: true,
                            rows: 4,
                          }}
                          label={'Nội dung bình luận'}
                          name="commentText"
                          type="input-textarea"
                        />
                      </Col>
                      <Col span={24}>
                        <MyForm.Item
                          innerProps={{
                            placeholder: t(
                              { id: 'placeholder_input' },
                              { msg: 'commentUrl' }
                            ),
                            disabled: true,
                          }}
                          label={'Đường dẫn'}
                          name="commentUrl"
                          type="input"
                        />
                      </Col>
                      
                    </Card>
                  </Col>


                </Row>
              </Col>
            </Row>
          </MyForm>
        </Spin>
      </Modal>
    </>
  );
};

export default FormCreate;
