import { FC } from 'react';
import 'driver.js/dist/driver.min.css';
import { Button } from 'antd';
import { useLocale } from '@/locales';
import useGuide from './useGuide';

const GuidePage: FC = () => {
  const { t } = useLocale();
  const { driverStart } = useGuide();

  return (
    <div className="guide-page ">
      <div className="innerText">
        <p className="guide-intro">
          {t({ id: 'app.guide.guideIntro' })}
          <a
            className="driverjs-link"
            href="https://github.com/kamranahmedse/driver.js"
            rel="noopener noreferrer"
            target="_blank"
          >
            driver.js
          </a>
          .
        </p>
        <Button type="primary" onClick={driverStart}>
          {t({ id: 'app.guide.showGuide' })}
        </Button>
      </div>
    </div>
  );
};

export default GuidePage;
