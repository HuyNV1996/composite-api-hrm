import { Avatar, Card, CardProps, Skeleton } from 'antd';
import { useState } from 'react';

export interface IMyCardItemProps extends CardProps {
  coverUrl?: string;
  children?: React.ReactNode;
}
const MyCardItem = (props: IMyCardItemProps) => {
  const { loading, title, actions, coverUrl, children, onClick, ...rest } =
    props;
  return (
    <Skeleton loading={loading} avatar active>
      <Card
        style={{ margin: '16px 0', borderRadius: '8px' }}
        hoverable
        cover={
          <img
            alt="cover"
            style={{
              borderRadius: '8px 8px 0 0',
              height: 160,
              objectFit: 'cover',
            }}
            src={coverUrl}
          />
        }
        onClick={onClick}>
        {children}
      </Card>
    </Skeleton>
  );
};

export default MyCardItem;
