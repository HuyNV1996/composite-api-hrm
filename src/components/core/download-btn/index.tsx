import React, { useEffect, useRef, useState } from 'react';
import { Button } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import './style.css';

interface DownloadButtonProps{
    fileUrl: string;
}
const DownloadButton = () => {
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
      if (downloadRef.current) {
        downloadRef.current.click();
      }
    }
  };

  return (
    <>
      <Button className='download-btn'
      type="primary" icon={<DownloadOutlined />}
      onClick={handleDownload}
      disabled={!fileUrl}
      >
        Tải xuống
      </Button>
      <a
        ref={downloadRef}
        href={fileUrl}
        style={{ display: 'none' }}
      >
        Hidden Download Link
      </a>
    </>
  );
};

export default DownloadButton;
