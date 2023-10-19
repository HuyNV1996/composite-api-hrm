import React, { useEffect, useState } from 'react';
import { Card, DatePicker, DatePickerProps, Table } from 'antd';
import { apiTopStockCode } from '@/api/reports/api';
import { convertTimestampToFormattedDate } from '@/utils/timeStampToDate';
import moment from 'moment';

interface DataItem {
  key: string;
  stock: string;
  ten: string;
  san: string;
  site: string;
  total: number;
  createdAt: string;
}



const Index: React.FC = () => {
  const columns = [
    {
      title: 'Mã cổ phiếu',
      dataIndex: 'stock',
      key: 'stock',
      width: 100,
      sorter: (a:any, b:any) => a.stock - b.stock,
    },
    {
      title: 'Công ty sở hữu',
      dataIndex: 'ten',
      key: 'ten',
      width: 350,
      sorter: (a:any, b:any) => a.ten - b.ten,
    },
    {
      title: 'Sàn giao dịch',
      dataIndex: 'san',
      key: 'san',
      width: 100,
      sorter: (a:any, b:any) => a.san - b.san,
    },
    {
      title: 'Site',
      dataIndex: 'site',
      key: 'site',
      width: 150,
      sorter: (a:any, b:any) => a.site - b.site,
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
      width: 150,
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
  const [srcData,setSrcData] = useState([]);
  const [date,setDate] = useState<any>( moment().subtract(1, 'days'))
  const [loading, setLoading] = useState<boolean>(false)
  const _apiTopStockCode = async () => {
    setLoading(true)
    const res = await apiTopStockCode(date.format('DD-MM-YYYY'));
    if(res){
      setSrcData(res.data);
      setLoading(false)
    }
  }
  const onChangeDate: DatePickerProps['onChange'] = (date) => {
    setDate(date)
    // console.log(dateString);
  };
  useEffect(() =>{
    _apiTopStockCode();
  },[date])
  return (
    <div>
      <Card>
        <DatePicker 
          value={date}
          onChange={onChangeDate}
          format="DD-MM-YYYY"
          allowClear ={false}
         />
      </Card>
      <Table<DataItem>
        scroll={{ x: '100%', y: '800px' }}
        dataSource={srcData}
        columns={columns}
        loading={loading}
        pagination={false}
      />
    </div>
  );
};

export default Index;
