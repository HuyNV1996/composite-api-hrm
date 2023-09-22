import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useLocale } from '@/locales';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLocale();

  return (
    <Result
      status="404"
      title="404"
      subTitle={t({ id: 'gloabal.tips.notfound' })}
      extra={
        <Button type="primary" onClick={() => navigate('/')}>
          {t({ id: 'gloabal.tips.backHome' })}
        </Button>
      }
    ></Result>
  );
};

export default NotFoundPage;
