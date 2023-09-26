import { createElement, FC } from 'react';
import {
  LogoutOutlined,
  UserOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';
import { Layout, Dropdown, Menu, Tooltip } from 'antd';
import { useNavigate } from 'react-router-dom';
import HeaderNoticeComponent from './notice';
import AvatarAccount from '@/assets/header/higod.png';
import { ReactComponent as LanguageSvg } from '@/assets/header/language.svg';
// import { ReactComponent as ZhCnSvg } from '@/assets/header/zh_CN.svg';
import { ReactComponent as ViVnSvg } from '@/assets/header/vi_VN.svg';
import { ReactComponent as EnUsSvg } from '@/assets/header/en_US.svg';
import { ReactComponent as MoonSvg } from '@/assets/header/moon.svg';
import { ReactComponent as SunSvg } from '@/assets/header/sun.svg';
import { LocaleFormatter, useLocale } from '@/locales';
import Logo from '@/assets/logo/logoVNM.svg';
import Union from '@/assets/logo/Union.svg';
import { logoutAsync, setUserItem } from '@/stores/user.store';
import { useDispatch, useSelector } from 'react-redux';
import { setGlobalState } from '@/stores/global.store';
import useLocalStorage from '@/hooks/useLocalStorage';

const { Header } = Layout;

interface HeaderProps {
  collapsed: boolean;
  toggle: () => void;
}

type Action = 'userInfo' | 'userSetting' | 'logout';

const HeaderComponent: FC<HeaderProps> = ({ collapsed, toggle }) => {
  const { locale, device } = useSelector(state => state.user);
  const { storedValue: token } = useLocalStorage('token');
  const { storedValue: user } = useLocalStorage('user');
  const dataUser = user && JSON.parse(user)
  const { theme } = useSelector(state => state.global);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useLocale();

  const onActionClick = async (action: Action) => {
    switch (action) {
      case 'userInfo':
        return;
      case 'userSetting':
        return;
      case 'logout':
        const res = Boolean(await dispatch(logoutAsync()));
        res && navigate('/login');
        return;
    }
  };

  const toLogin = () => {
    navigate('/login');
  };

  const selectLocale = ({ key }: { key: any }) => {
    dispatch(setUserItem({ locale: key }));
    localStorage.setItem('locale', key);
  };

  const onChangeTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';

    localStorage.setItem('theme', newTheme);
    dispatch(
      setGlobalState({
        theme: newTheme,
      })
    );
  };
  const menu = (
    <Menu>
      {/* <Menu.Item key="1" onClick={() => navigate(`/user-profile/${dataUser.id}`)}>
        <span>
          <UserOutlined />
          <span>
            <LocaleFormatter id="header.avator.account" />
          </span>
        </span>
      </Menu.Item>
      <Menu.Divider /> */}
      <Menu.Item key="2" onClick={() => onActionClick('logout')}>
        <span>
          <LogoutOutlined />
          <span>
            <LocaleFormatter id="header.avator.logout" />
          </span>
        </span>
      </Menu.Item>
    </Menu>
  );

  return (
    <Header className="layout-page-header bg-2">
      {device !== 'MOBILE' && (
        <div className="logo" style={{ width: collapsed ? 80 : 200 }}>
          {collapsed ? (
            // <img
            //   src={Logo}
            //   alt=""
            //   style={{ marginRight: collapsed ? '2px' : '20px' }}
            // />
            <h1>Tool</h1>
          ) : (
            // <img src={Union} alt="" style={{ width: 150 }} />
            <h1>Social Tools</h1>
          )}
        </div>
      )}
      <div className="layout-page-header-main">
        <div onClick={toggle}>
          <span id="sidebar-trigger">
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </span>
        </div>
        <div className="actions">
          <Tooltip
            title={t({
              id:
                theme === 'dark'
                  ? 'gloabal.tips.theme.lightTooltip'
                  : 'gloabal.tips.theme.darkTooltip',
            })}>
            <span>
              {createElement(theme === 'dark' ? SunSvg : MoonSvg, {
                onClick: onChangeTheme,
              })}
            </span>
          </Tooltip>
          {/* <HeaderNoticeComponent /> */}
          {token ? (
            <Dropdown overlay={menu}>
              <span className="user-action">
                <img
                  src={AvatarAccount}
                  className="user-avator"
                  alt="avator"
                  style={{
                    borderRadius: 50,
                    boxShadow: '5px 8px 24px 5px rgba(208, 216, 243, 0.6)',
                  }}
                />
              </span>
            </Dropdown>
          ) : (
            <span style={{ cursor: 'pointer' }} onClick={toLogin}>
              {t({ id: 'gloabal.tips.login' })}
            </span>
          )}
        </div>
      </div>
    </Header>
  );
};

export default HeaderComponent;
