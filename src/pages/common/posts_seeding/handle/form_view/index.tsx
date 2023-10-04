import { Button, Col, FormInstance, Row, Spin, Modal, message } from 'antd';
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';

import MyForm from '@/components/core/form';
import { useLocale } from '@/locales';
import { apiGetPostSeedingById } from '@/api/posts/api';
import { IFormCreatePost } from './types';
import SelectSocial from '@/pages/components/selects/SelectSocial';

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
  const initalValueForm: IFormCreatePost = {
    site: '',
    content: '',
    linkImage: '',
    createdAt: '',
  };
  const _apiGetPostSeedingById = async (postID: string) => {
    if (!postID) {
      return;
    }

    try {
      setLoading(true);
      const res = (await apiGetPostSeedingById(postID)) as any;
      console.log(res);

      if (res) {
        form &&
          form.setFieldsValue({
            site: res.data.site,
            content: res.data.content,
            linkImage: res.data.linkImage,
            createdAt: res.data.createdAt,
          });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    _apiGetPostSeedingById(postID!);
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
                    <SelectSocial />
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
                          { msg: 'link ảnh' }
                        ),
                      }}
                      label={'Link ảnh'}
                      name="linkImage"
                      type="input-textarea"
                    />
                  </Col>
                  <Col span={12}>
                    <MyForm.Item
                      innerProps={{
                        placeholder: t(
                          { id: 'placeholder_input' },
                          { msg: 'Ngày tạo' }
                        ),
                      }}
                      label={'Ngày tạo'}
                      name="createdAt"
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
