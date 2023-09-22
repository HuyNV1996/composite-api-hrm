import React, { useEffect, useRef, useState } from 'react';
import { Button } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import DateRage from '../component/datepicker';
import './style.css';
import MyPage, { MyPageTableOptions } from '@/components/business/page';
import { IExport } from '@/interface/export/export';

interface DownloadButtonProps {
  fileUrl: string;
}
const ExportExcel = () => {
  const downloadRef = useRef<HTMLAnchorElement>(null);
  const [fileUrl, setFileUrl] = useState('');

  useEffect(() => {
    // Gọi API để lấy link URL
    fetch('your-api-endpoint')
      .then(response => response.json())
      .then(data => setFileUrl(data.fileUrl))
      .catch(error => console.log(error));
  }, []);
  const handleDownload = () => {
    if (fileUrl) {
      const link = document.createElement('a');
      link.href = fileUrl;
      link.setAttribute('download', 'filename');
      link.click();
    }
  };
  const tableColums: MyPageTableOptions<IExport> = [];

  return (
    <>
      <DateRage />
      <Button
        className="download-btn"
        type="primary"
        icon={<DownloadOutlined />}
        onClick={handleDownload}
        // disabled={!fileUrl}
      >
        Tải xuống
      </Button>
      <a ref={downloadRef} href={fileUrl} style={{ display: 'none' }}>
        Hidden Download Link
      </a>
    </>
  );
};

export default ExportExcel;
