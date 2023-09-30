import {
  Button,
  Col,
  FormInstance,
  Row,
  Spin,
  Modal,
  message,
  Form,
  Checkbox,
} from 'antd';
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import SelectRuleOperator from '@/pages/components/selects/SelectRuleOperator';
import SelectRuleName from '@/pages/components/selects/SelectRuleName';
import MyForm from '@/components/core/form';
import { useLocale } from '@/locales';
import { apiSendMessage } from '@/api/messages/api';
import { IFormMessage } from '@/interface/message/api';
import { IFormCreateCampaign, IRule } from './types';
import MyCheckbox from '@/components/basic/input-checkbox';
import moment, { Moment } from 'moment';
import { apiCreateSeedingUser_FA } from '@/api/users/api';
import {
  apiCampaignById,
  apiCreateCampaign,
  apiUpdateCampaign,
} from '@/api/campaigns/api';
import SelectSocial from '@/pages/components/selects/SelectSocial';
interface Props {
  onClose?: () => void;
  showDrawer?: () => void;
  open?: boolean;
  idCampaign?: string;
  setFoceUpdate?: Dispatch<SetStateAction<boolean>>;
  foceUpdate?: boolean;
  form?: FormInstance<any>;
}

const FormCreate: FC<Props> = ({
  onClose,
  open,
  idCampaign,
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
    data = idCampaign
      ? {
          ...data,
          id: idCampaign,
          active: isActive,
          rule: rule,
        }
      : {
          ...data,
          active: isActive,
          rule: rule,
        };
    setLoading(true);
    const res = idCampaign
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

  const _apiCampaignById = async (idCampaign: String) => {
    if (!idCampaign) {
      return;
    }

    try {
      setLoading(true);
      const res = (await apiCampaignById(idCampaign)) as any;
      console.log(res.data.name);

      if (res) {
        form &&
          form.setFieldsValue({
            site: res.data.site,
            name: res.data.name,
            description: res.data.description,
            active: res.data.active,
            ruleName: res.data.rule?.name,
            ruleOperator: res.data.rule?.operator,
            ruleValue: res.data.rule?.value,
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
    _apiCampaignById(idCampaign!);
  }, [idCampaign]);

  return (
    <>
      <Modal
        key={idCampaign}
        title={idCampaign ? t({ id: 'update' }) : t({ id: 'create' })}
        width={'600px'}
        maskClosable={false}
        onCancel={onClose}
        open={open}
        centered
        destroyOnClose
        bodyStyle={{ paddingBottom: 0 }}
        footer={
          <div style={{ display: 'flex', justifyContent: 'end' }}>
            <Button onClick={onClose}>Hủy bỏ</Button>
            <Button onClick={onFinish} type="primary" loading={loading}>
              Lưu
            </Button>
          </div>
        }>
        <Spin spinning={loading}>
          <MyForm<IFormCreateCampaign>
            onFinish={onFinish}
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
                          { msg: 'name' }
                        ),
                      }}
                      label={'Tên chiến dịch'}
                      required
                      name="name"
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
                  <Col span={12}>
                    <SelectRuleName required />
                  </Col>
                  <Col span={12}>
                    <SelectRuleOperator required />
                  </Col>
                  <Col span={12}>
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
                      type="input-number"
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
