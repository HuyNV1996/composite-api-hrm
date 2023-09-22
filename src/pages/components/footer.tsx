import { Footer } from 'antd/lib/layout/layout';

import MyButton from '@/components/basic/button';
import { FC } from 'react';
import { useLocale } from '@/locales';

interface Props {
  title?: string;
  onFinish?: () => void;
  onClose?: () => void;
}

const BaseFooter: FC<Props> = ({ title, onFinish, onClose }) => {
  const { t } = useLocale();

  return (
    <Footer
      style={{
        borderTop: '1px solid #e8e8e8',
        position: 'fixed',
        left: 0,
        bottom: 0,
        width: '100%',
        backgroundColor: 'white',
        textAlign: 'right',
        boxShadow:
          'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px',
      }}
    >
      <MyButton type="primary" htmlType="submit" onClick={onFinish}>
        {title}
      </MyButton>
      <MyButton type="default" onClick={onClose}>
        {t({ id: 'close' })}
      </MyButton>
    </Footer>
  );
};

export default BaseFooter;
