import React, { useEffect, useRef, useState } from 'react';
import { Button } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import './style.css';
import MyPage, { MyPageTableOptions } from '@/components/business/page';
import { IExport } from '@/interface/export/export';

interface DownloadButtonProps {
  fileUrl: string;
  title: string;
}
const index = (props: DownloadButtonProps) => {
  const { fileUrl,title } = props;
  console.log(fileUrl)
  const handleDownload = () => {
    download(fileUrl,title);
  }
  function download(url:string, filename:string) {
    console.log(url);
    fetch(url)
      .then(response => response.blob())
      .then(blob => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        link.click();
    })
    .catch(console.error);
  }
  return (
    <>
      <Button
        className="download-btn"
        type="primary"
        icon={<DownloadOutlined />}
        onClick={handleDownload}
        disabled={fileUrl === undefined}
        // disabled={!fileUrl}
      >
        Tải xuống
      </Button>
      {/* <a ref={downloadRef} href={fileUrl} style={{ display: 'none' }}>
        Hidden Download Link
      </a> */}
    </>
  );
};

export default index;
