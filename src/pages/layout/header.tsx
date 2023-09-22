import { createElement, FC, useState } from 'react';
import {
  LogoutOutlined,
  UserOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';
import { Layout, Dropdown, Menu, Tooltip, Typography, Avatar } from 'antd';
import { useNavigate } from 'react-router-dom';
import AvatarAccount from '@/assets/header/higod.png';
import { LocaleFormatter, useLocale } from '@/locales';
import Union from '@/assets/logo/Union.svg';
import DropdownIcon from '@/assets/common/dropdown.svg';
import { logoutAsync, setUserItem } from '@/stores/user.store';
import { useDispatch, useSelector } from 'react-redux';
import { setGlobalState } from '@/stores/global.store';
import useLocalStorage from '@/hooks/useLocalStorage';
import { message as $message } from 'antd';

const { Header } = Layout;
const { Title } = Typography;

interface HeaderProps {
  collapsed: boolean;
  toggle: () => void;
}

type Action = 'userInfo' | 'userSetting' | 'logout';

const HeaderComponent: FC<HeaderProps> = ({ collapsed, toggle }) => {
  const { device } = useSelector(state => state.user);
  const { storedValue: token } = useLocalStorage('token');
  const { theme } = useSelector(state => state.global);
  const { name } = useSelector(state => state.login);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useLocale();
  const onActionClick = async (action: Action) => {
    switch (action) {
      case 'logout':
        await logoutAsync();
        navigate('/login');
    }
  };

  const toLogin = () => {
    navigate('/login');
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
      <Menu.Item key="2" onClick={() => onActionClick('logout')}>
        <span>
          <LogoutOutlined style={{ marginRight: 8 }} />
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
        <div
          className="logo"
          style={{ width: collapsed ? 80 : 200, gap: '10px' }}>
          {collapsed ? (
            <img
              src={Union}
              alt=""
              style={{ marginRight: collapsed ? '2px' : '20px' }}
            />
          ) : (
            // <h1>LOGO</h1>
            <>
              <Title level={4}>HRM Admin</Title>
            </>
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
          {token ? (
            <Dropdown overlay={menu}>
              <span className="user-action">
                {/* <img
                  src={AvatarAccount}
                  className="user-avator"
                  alt="avatar"
                  style={{
                    borderRadius: 50,
                  }}
                /> */}
                <Avatar
                  style={{
                    backgroundColor: '#B98868',
                    color: '#fff',
                    marginRight: 5,
                  }}>
                   {localStorage.getItem('username')?.charAt(0) || 'A'}
                </Avatar>
                <h3 style={{marginBottom:0}}>
                  {localStorage.getItem('username')}
                  <img
                    src={DropdownIcon}
                    alt=""
                    style={{ marginLeft: '17px' }}
                  />
                </h3>
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
