import { FC, ReactElement } from 'react';
import PrivateRoute from './privateRoute';
import { useIntl } from 'react-intl';

const WrapperRouteComponent: FC<any> = ({ titleId, auth, ...props }) => {
  const { formatMessage } = useIntl();

  if (titleId) {
    document.title = formatMessage({
      id: titleId,
    });
  }

  return auth ? <PrivateRoute {...props} /> : (props.element as ReactElement);
};

export default WrapperRouteComponent;
