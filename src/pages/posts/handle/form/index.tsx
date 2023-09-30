import {
  Button,
  Col,
  FormInstance,
  Row,
  Spin,
  Modal,
  message,
  Tag,
  Form,
} from 'antd';
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';

import MyForm from '@/components/core/form';
import FeaturedIcon from '@/assets/icons/correct.png';
import NotFeaturedIcon from '@/assets/icons/remove.png';
import { useLocale } from '@/locales';
import { apiSendMessage } from '@/api/messages/api';
import { IFormMessage } from '@/interface/message/api';
import { apiPostById } from '@/api/posts/api';
import { IFormCreatePost } from './types';

interface Props {
  onClose?: () => void;
  showDrawer?: () => void;
  open?: boolean;
  postID?: string;
  setFoceUpdate?: Dispatch<SetStateAction<boolean>>;
  foceUpdate?: boolean;
  form?: FormInstance<any>;
}

const FormView: FC<Props> = ({
  onClose,
  open,
  postID,
  foceUpdate,
  setFoceUpdate,
  form,
}) => {
  const { t } = useLocale();
  const [loading, setLoading] = useState(false);
  const [isSentiment, setIsSentiment] = useState();
  const [isTop, setIsTop] = useState(false);
  const [isExpertIdea, setIsExpertIdea] = useState(false);
  const initalValueForm: IFormCreatePost = {
    description: '',
    content: '',
    language: '',
    priority: '',
    link: '',
    linkTitle: '',
    linkDescription: '',
    totalLikes: '',
    totalReplies: '',
    totalShares: '',
    title: '',
    date: '',
  };
  const _apiPostById = async (postID: String) => {
    if (!postID) {
      return;
    }

    try {
      setLoading(true);
      const res = (await apiPostById(postID)) as any;
      console.log(res);

      if (res) {
        form &&
          form.setFieldsValue({
            title: res.data.title,
            description: res.data.description,
            content: res.data.content,
            language: res.data.language,
            priority: res.data.priority,
            link: res.data.link,
            linkTitle: res.data.linkTitle,
            linkDescription: res.data.linkDescription,
            totalLikes: res.data.totalLikes,
            totalReplies: res.data.totalReplies,
            totalShares: res.data.totalShares,
            date: res.data.date,
          });
        setIsSentiment(res.data.sentiment);
        setIsTop(res.data.isTop);
        setIsExpertIdea(res.data.isExpertIdea);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    _apiPostById(postID!);
  }, [postID]);

  return (
    <>
      <Modal
        key={postID}
        title={'Thông tin bài viết'}
        width={'1200px'}
        maskClosable={false}
        onCancel={onClose}
        open={open}
        centered
        destroyOnClose
        bodyStyle={{ paddingBottom: 0 }}
        footer={
          <div style={{ display: 'flex', justifyContent: 'end' }}>
            <Button onClick={onClose}>Hủy bỏ</Button>
          </div>
        }>
        <Spin spinning={loading}>
          <MyForm<IFormCreatePost>
            initialValues={initalValueForm}
            form={form}
            labelCol={{ span: 24 }}
            style={{ margin: 'auto' }}
            layout="vertical">
            <Row gutter={24}>
              <Col span={24}>
                <Row gutter={24}>
                  <Col span={12}>
                    <MyForm.Item
                      innerProps={{
                        placeholder: t(
                          { id: 'placeholder_input' },
                          { msg: 'title' }
                        ),
                      }}
                      label={'Tiêu đề'}
                      required
                      name="title"
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
                    <Form.Item label="Tin tốt">
                      {isSentiment === 1 ? (
                        <img src={FeaturedIcon} alt="image" />
                      ) : (
                        <img src={NotFeaturedIcon} alt="image" />
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <MyForm.Item
                      innerProps={{
                        placeholder: t(
                          { id: 'placeholder_input' },
                          { msg: 'nội dung' }
                        ),
                      }}
                      label={'Nội dung'}
                      name="content"
                      type="input-textarea"
                    />
                  </Col>
                  <Col span={12}>
                    <MyForm.Item
                      innerProps={{
                        placeholder: t(
                          { id: 'placeholder_input' },
                          { msg: 'ngôn ngữ' }
                        ),
                      }}
                      label={'Ngôn ngữ'}
                      name="language"
                      type="input-textarea"
                    />
                  </Col>
                  <Col span={12}>
                    <MyForm.Item
                      innerProps={{
                        placeholder: t(
                          { id: 'placeholder_input' },
                          { msg: 'priority' }
                        ),
                      }}
                      label={'Priority'}
                      name="priority"
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
                      }}
                      label={'Liên kết'}
                      name="link"
                      type="input-textarea"
                    />
                  </Col>
                  <Col span={12}>
                    <MyForm.Item
                      innerProps={{
                        placeholder: t(
                          { id: 'placeholder_input' },
                          { msg: 'linkTitle' }
                        ),
                      }}
                      label={'Link tiêu đề'}
                      name="linkTitle"
                      type="input-textarea"
                    />
                  </Col>
                  <Col span={12}>
                    <MyForm.Item
                      innerProps={{
                        placeholder: t(
                          { id: 'placeholder_input' },
                          { msg: 'linkDescription' }
                        ),
                      }}
                      label={'Link mô tả'}
                      name="linkDescription"
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
                      }}
                      label={'Liên kết'}
                      name="link"
                      type="input-textarea"
                    />
                  </Col>
                  <Col span={12}>
                    <MyForm.Item
                      innerProps={{
                        placeholder: t(
                          { id: 'placeholder_input' },
                          { msg: 'totalLikes' }
                        ),
                      }}
                      label={'Thích'}
                      name="totalLikes"
                      type="input-textarea"
                    />
                  </Col>
                  <Col span={12}>
                    <MyForm.Item
                      innerProps={{
                        placeholder: t(
                          { id: 'placeholder_input' },
                          { msg: 'totalReplies' }
                        ),
                      }}
                      label={'Phản hồi'}
                      name="totalReplies"
                      type="input-textarea"
                    />
                  </Col>
                  <Col span={12}>
                    <MyForm.Item
                      innerProps={{
                        placeholder: t(
                          { id: 'placeholder_input' },
                          { msg: 'totalShares' }
                        ),
                      }}
                      label={'Chia sẻ'}
                      name="totalShares"
                      type="input-textarea"
                    />
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Top">
                      {isTop === true ? (
                        <img src={FeaturedIcon} alt="image" />
                      ) : (
                        <img src={NotFeaturedIcon} alt="image" />
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Chuyên gia">
                      {isExpertIdea === true ? (
                        <img src={FeaturedIcon} alt="image" />
                      ) : (
                        <img src={NotFeaturedIcon} alt="image" />
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <MyForm.Item
                      innerProps={{
                        placeholder: t(
                          { id: 'placeholder_input' },
                          { msg: 'date' }
                        ),
                      }}
                      label={'Ngày tạo'}
                      name="date"
                      type="input-textarea"
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

export default FormView;
