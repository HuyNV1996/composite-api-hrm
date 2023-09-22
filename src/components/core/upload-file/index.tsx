import { Upload, UploadFile, UploadProps } from 'antd';
import { RcFile } from 'antd/lib/upload';
import React, { useState } from 'react';
import { message as $message } from 'antd';
import { ReactComponent as UploadSvg } from '@/assets/icons/ic_upload.svg';

interface uploadFileProps {
  action_url: string;
  fileList: UploadFile[];
  handleChange: UploadProps['onChange'];
  setPreviewImage: React.Dispatch<React.SetStateAction<string>>;
  setPreviewTitle: React.Dispatch<React.SetStateAction<string>>;
  setPreviewOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const index = (props: uploadFileProps) => {
  const {
    action_url,
    fileList,
    setPreviewOpen,
    handleChange,
    setPreviewImage,
    setPreviewTitle,
  } = props;

  const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      $message.error('Chỉ upload file JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      $message.error('Chỉ upload ảnh nhỏ hơn 2MB!');
    }
    return (isJpgOrPng && isLt2M) || Upload.LIST_IGNORE;
  };
  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1)
    );
  };
  const uploadButton = (
    <div>
      <UploadSvg width={30} height={24} />
      <div style={{ marginTop: 8 }}>Nhấn để tải ảnh</div>
    </div>
  );
  return (
    <Upload
      action={action_url}
      listType="picture-card"
      fileList={fileList}
      maxCount={3}
      multiple
      beforeUpload={beforeUpload}
      onPreview={handlePreview}
      onChange={handleChange}>
      {fileList.length >= 3 ? null : uploadButton}
    </Upload>
  );
};

export default index;
