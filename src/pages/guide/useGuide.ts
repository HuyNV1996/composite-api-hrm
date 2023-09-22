import { useRef } from 'react';
import Driver from 'driver.js';
import 'driver.js/dist/driver.min.css';
import './index.less';
import { useLocale } from '@/locales';
import { setUserItem } from '@/stores/user.store';
import { useDispatch } from 'react-redux';

export const useGuide = () => {
  const { t } = useLocale();
  const dispatch = useDispatch();

  const driver = useRef(
    new Driver({
      keyboardControl: false,
      allowClose: false,
      overlayClickNext: true,
      closeBtnText: t({ id: 'app.guide.driverjs.closeBtnText' }),
      prevBtnText: t({ id: 'app.guide.driverjs.prevBtnText' }),
      nextBtnText: t({ id: 'app.guide.driverjs.nextBtnText' }),
      doneBtnText: t({ id: 'app.guide.driverjs.doneBtnText' }),
    })
  );

  const driverStart = () => {
    setTimeout(() => {
      driver.current.defineSteps([
        {
          element: '#sidebar-trigger',
          popover: {
            title: t({ id: 'app.guide.driverStep.sidebarTrigger.title' }),
            description: t({
              id: 'app.guide.driverStep.sidebarTrigger.description',
            }),
            position: 'bottom',
            offset: 10,
            isFirst: true,
          },
        },
        {
          element: '#notice-center',
          popover: {
            title: t({ id: 'app.guide.driverStep.notices.title' }),
            description: t({ id: 'app.guide.driverStep.notices.description' }),
            position: 'bottom',
            offset: -160,
          },
        },
        {
          element: '#language-change',
          popover: {
            title: t({ id: 'app.guide.driverStep.switchLanguages.title' }),
            description: t({
              id: 'app.guide.driverStep.switchLanguages.description',
            }),
            position: 'bottom',
            offset: -170,
          },
        },
        {
          element: '#pageTabs .ant-tabs-nav.ant-tabs-nav-animated',
          popover: {
            title: t({ id: 'app.guide.driverStep.pageTabs.title' }),
            description: t({ id: 'app.guide.driverStep.pageTabs.description' }),
            position: 'bottom',
            offset: 30,
          },
        },
        {
          element: '#pageTabs-actions svg',
          popover: {
            title: t({ id: 'app.guide.driverStep.pageTabsActions.title' }),
            description: t({
              id: 'app.guide.driverStep.pageTabsActions.description',
            }),
            position: 'left',
          },
        },
        {
          element: '#switchTheme span',
          popover: {
            title: t({ id: 'app.guide.driverStep.switchTheme.title' }),
            description: t({
              id: 'app.guide.driverStep.switchTheme.description',
            }),
            position: 'left',
            isLast: true,
          },
        },
      ]);

      localStorage.setItem('newUser', 'false');
      dispatch(
        setUserItem({
          newUser: false,
        })
      );
      driver.current.start();
      console.log('guide started');
    }, 1000);
  };

  return {
    driverStart,
  };
};

export default useGuide;
