import { FC } from 'react';
import { ReactComponent as GuideSvg } from '@/assets/menu/guide.svg';
import { ReactComponent as PermissionSvg } from '@/assets/menu/permission.svg';
import { ReactComponent as HomeSvg } from '@/assets/menu/home.svg';
import { ReactComponent as AccountSvg } from '@/assets/menu/account.svg';
import { ReactComponent as DocumentationSvg } from '@/assets/menu/documentation.svg';
import { ReactComponent as SystemSvg } from '@/assets/menu/system.svg';
import { ReactComponent as MerchantSvg } from '@/assets/menu/merchant.svg';
import { ReactComponent as TransactionSvg } from '@/assets/menu/transaction.svg';
import { ReactComponent as SysvarSvg } from '@/assets/menu/sysvar.svg';
import { ReactComponent as FireAntSvg } from '@/assets/icons/fireant.svg';
import { BorderlessTableOutlined, FacebookFilled, TwitterOutlined } from '@ant-design/icons';
interface CustomIconProps {
  type: string;
}

export const CustomIcon: FC<CustomIconProps> = props => {
  const { type } = props;
  let com = <GuideSvg />;

  if (type === 'guide') {
    com = <GuideSvg />;
  } else if (type === 'permission') {
    com = <PermissionSvg />;
  } else if (type === 'dashboard') {
    com = <HomeSvg />;
  } else if (type === 'account') {
    com = <AccountSvg />;
  } else if (type === 'documentation') {
    com = <DocumentationSvg />;
  } else if (type === 'system') {
    com = <SystemSvg />;
  } else if (type === 'merchant') {
    com = <MerchantSvg />;
  } else if (type === 'transaction') {
    com = <TransactionSvg />;
  } else if (type === 'sysvar') {
    com = <SysvarSvg />;
  } else if (type === 'content') {
    com = <BorderlessTableOutlined />;
  } else if (type === 'facebook'){
    com = <FacebookFilled width={32} height={32} />
  }
  else if (type === 'twitter'){
    com = <TwitterOutlined />
  }
   else {
    com = <GuideSvg />;
  }

  return <span className="anticon">{com}</span>;
};
