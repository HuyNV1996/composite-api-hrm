import { FC } from 'react';
import en_US from './en-US';
import vi_VN from './vi-VN';
import { FormattedMessage, MessageDescriptor, useIntl } from 'react-intl';

export const localeConfig = {
  vi_VN: vi_VN,
  en_US: en_US,
};

type Id = keyof typeof vi_VN;

interface Props extends MessageDescriptor {
  id: Id;
}

export const LocaleFormatter: FC<Props> = ({ ...props }) => {
  const notChildProps = { ...props, children: undefined };

  return <FormattedMessage {...notChildProps} id={props.id} />;
};

type FormatMessageProps = (
  descriptor: Props,
  data?: {
    [param: string]: string;
  },
) => string;

export const useLocale = () => {
  const { formatMessage: _formatMessage, ...rest } = useIntl();
  const t: FormatMessageProps = _formatMessage;

  return {
    ...rest,
    t,
  };
};
