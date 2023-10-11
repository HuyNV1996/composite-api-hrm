import { Button, Space, Upload, UploadFile, UploadProps } from 'antd';
import { RcFile, UploadChangeParam } from 'antd/lib/upload';
import React, { useEffect, useState } from 'react';
import { message as $message, Image } from 'antd';
import { ReactComponent as UploadSvg } from '@/assets/icons/ic_upload.svg';
import { IStorageUploadRequest } from '@/api/storage/types';
import { uploadFile } from '@/api/storage/api';
import { DeleteOutlined, LoadingOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import NoImage from '@/assets/icons/no_image.png'
interface uploadFileProps {
  initialValue?: File | string; // Pass the initial value here
  onChange: (file: File | string) => void;
  setPreviewImage: React.Dispatch<React.SetStateAction<string>>;
  setPreviewTitle: React.Dispatch<React.SetStateAction<string>>;
  setPreviewOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isReturnFile: boolean
  fileType: string;
  isMultipleFile?: boolean
}
const index = (props: uploadFileProps) => {
  const {
    initialValue,
    onChange,
    isReturnFile,
    fileType,
    isMultipleFile
  } = props;
  const [file, setFile] = useState<File | null>(null);
  const [fileList, setFileList] = useState<UploadFile[]>([])
  useEffect(() => {
    if (initialValue) {
      if (typeof initialValue === 'string') {
        // Convert URL to File
        fetch(initialValue)
          .then((response) => response.blob())
          .then((blob) => {
            const convertedFile = new File([blob], 'image.jpg', { type: 'image/jpeg' });
            setFile(convertedFile);
          })
          .catch((error) => {
            console.error('Error converting URL to File:', error);
            setFile(null);
          });
      } else {
        setFile(initialValue);
      }
    }
  }, [initialValue]);
  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      $message.error('File tải lên không đúng định dạng');
    }
    const isLt2M = file.size / 1024 / 1024 < 5;
    if (!isLt2M) {
      $message.error('File tải lên không vượt quá 5MB');
    }
    return (isJpgOrPng && isLt2M) || Upload.LIST_IGNORE;
  };
  const handleFileChange = async (info: any) => {
    setFile(info.file.originFileObj);
    if (isReturnFile) {
      onChange(info.file.originFileObj)
    }
    else {
      const body: IStorageUploadRequest = {
        file: info.file.originFileObj,
        fileType: fileType
      }
      const res = await uploadFile(body);
      if (res.status === 1 && res.code === 200) {
        onChange(res.data)
      }
    }
  };
  const handleFileDelete = () => {
    setFile(null);
  }
  const handleChangeMultipleFile: UploadProps['onChange'] = ({ fileList: newFileList }) =>
    setFileList(newFileList);
  const uploadProps = {
    accept: 'image/*',
    showUploadList: false,
    beforeUpload: beforeUpload,
    customRequest: async ({ file, onSuccess, onError }: any) => {
      try {
        console.log(file);
        if (!isReturnFile) {
          const body: IStorageUploadRequest = {
            file: file,
            fileType: fileType
          }
          const res = await uploadFile(body);
          if (res.status === 1 && res.code === 200) {
            onChange(res.data)
            onSuccess(res.data, file);
          }
          else {
            onError(res.data, file);
          }
        } else {
          console.log(file);
          onChange(file)
        }
      }
      catch (error) {
        onError(error, file);
      }
    },
    onChange: handleFileChange,
  };
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  if (isMultipleFile)
    return (
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        fileList={fileList}
        onChange={handleChangeMultipleFile}
      >
        {file ? <img src={URL.createObjectURL(file)} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
      </Upload>
      )
  else {
    return (
      <div>
        {file ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5, maxWidth: 156 }}>
            <Image style={{ objectFit: 'contain' }} src={URL.createObjectURL(file)} alt="Uploaded" />
            <Space>
              <Button
                style={{ color: 'red', margin: 'auto' }}
                icon={<DeleteOutlined />}
                onClick={handleFileDelete}
              >
                Xóa ảnh đã chọn
              </Button>
            </Space>
          </div>
        ) :
          <Upload {...uploadProps}>
            {/* <Button icon={<UploadOutlined />}>Tải ảnh lên</Button> */}
            <img style={{ maxWidth: 120, cursor: 'pointer' }} src={NoImage} />
            {/* <p>Click để chọn ảnh</p> */}
          </Upload>}
      </div>
    );
  }
};

export default index;
