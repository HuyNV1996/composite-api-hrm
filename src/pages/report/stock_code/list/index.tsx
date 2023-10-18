import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { apiTopStockCode } from '@/api/reports/api';
import { convertTimestampToFormattedDate } from '@/utils/timeStampToDate';

interface DataItem {
  key: string;
  stock: string;
  ten: string;
  san: string;
  site: string;
  total: number;
  createdAt: string;
}


const columns = [
  {
    title: 'Mã cổ phiếu',
    dataIndex: 'stock',
    key: 'stock',
    sorter: (a:any, b:any) => a.stock - b.stock,
  },
  {
    title: 'Công ty sở hữu',
    dataIndex: 'ten',
    key: 'ten',
    sorter: (a:any, b:any) => a.ten - b.ten,
  },
  {
    title: 'Sàn giao dịch',
    dataIndex: 'san',
    key: 'san',
    sorter: (a:any, b:any) => a.san - b.san,
  },
  {
    title: 'Site',
    dataIndex: 'site',
    key: 'site',
    sorter: (a:any, b:any) => a.site - b.site,
  },
  {
    title: 'Total',
    dataIndex: 'total',
    key: 'total',
    sorter: (a:any, b:any) => a.total - b.total,
  },
  {
    title: 'Ngày tạo',
    dataIndex: 'createdAt',
    key: 'createdAt',
    width: 150,
    sorter: (a:any, b:any) => a.createdAt - b.createdAt,
    render: (item:any, record:any) => (
      <span>{item && convertTimestampToFormattedDate(Number(item))}</span>
    ),
  }
];

const MyTable: React.FC = () => {
  const [srcData,setSrcData] = useState([])
  const _apiTopStockCode = async () => {
    const res = await apiTopStockCode('16-10-2023');
    if(res){
      setSrcData(res.data);
    }
  }
  useEffect(() =>{
    _apiTopStockCode();
  },[])
  return (
    <Table<DataItem>
      scroll={{ x: '100%', y: '800px' }}
      dataSource={srcData}
      columns={columns}
      pagination={false} // Set pagination to false
    />
  );
};

export default MyTable;
