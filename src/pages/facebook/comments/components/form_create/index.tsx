import { Col, FormInstance, Row, Spin, Modal, message } from 'antd';
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import MyForm from '@/components/core/form';
import { useLocale } from '@/locales';
import { IFormCreateCampaign, IRule } from './types';
import { apiCreateCampaign, apiUpdateCampaign } from '@/api/campaigns/api';
import { apiGetPostById_FA } from '@/api/posts/api';
import { apiGetCommentById_FA } from '@/api/comments/api';
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

  const _apiGetCommentById_FA = async (idComment: string) => {
    if (!idComment) {
      return;
    }

    try {
      setLoading(true);
      const res = (await apiGetCommentById_FA(idComment)) as any;
      console.log(res);

      if (res) {
        form &&
          form.setFieldsValue({
            title: res.data.title,
            description: res.data.description,
            originalContent: res.data.originalContent,
            link: res.data.link,
            linkTitle: res.data.linkTitle,
            totalLikes: res.data.totalLikes,
            totalReplies: res.data.totalReplies,
            totalShares: res.data.totalShares,
          });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    _apiGetCommentById_FA(idComment!);
  }, [idComment]);

  return (
    <>
      <Modal
        key={idComment}
        title={idComment ? 'View' : t({ id: 'create' })}
        width={'600px'}
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
                    <MyForm.Item
                      innerProps={{
                        placeholder: t(
                          { id: 'placeholder_input' },
                          { msg: 'title' }
                        ),
                        disabled: true,
                      }}
                      label={'Tiêu đề'}
                      name="title"
                      type="input"
                    />
                  </Col>
                  <Col span={24}>
                    <MyForm.Item
                      innerProps={{
                        placeholder: t(
                          { id: 'placeholder_input' },
                          { msg: 'mô tả' }
                        ),
                        disabled: true,
                        rows: 4,
                      }}
                      label={'Mô tả'}
                      name="description"
                      type="input-textarea"
                    />
                  </Col>
                  <Col span={24}>
                    <MyForm.Item
                      innerProps={{
                        placeholder: t(
                          { id: 'placeholder_input' },
                          { msg: 'Nội dung' }
                        ),
                        disabled: true,
                        rows: 7,
                      }}
                      label={'Nội dung'}
                      name="originalContent"
                      type="input-textarea"
                    />
                  </Col>
                  <Col span={12}>
                    <MyForm.Item
                      innerProps={{
                        placeholder: t(
                          { id: 'placeholder_input' },
                          { msg: 'link' }
                        ),
                        disabled: true,
                      }}
                      label={'Link'}
                      name="link"
                      type="input"
                    />
                  </Col>
                  <Col span={12}>
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
                  <Col span={12}>
                    <MyForm.Item
                      innerProps={{
                        placeholder: t(
                          { id: 'placeholder_input' },
                          { msg: 'total replies' }
                        ),
                        disabled: true,
                      }}
                      label={'Like'}
                      name="totalReplies"
                      type="input"
                    />
                  </Col>
                  <Col span={12}>
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
              </Col>
            </Row>
          </MyForm>
        </Spin>
      </Modal>
    </>
  );
};

export default FormCreate;
