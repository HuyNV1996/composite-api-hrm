import { Button, Col, Drawer, FormInstance, Row, Spin, Upload } from 'antd';
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { message as $message } from 'antd';
import MyForm from '@/components/core/form';
import { DownloadOutlined, UploadOutlined } from '@ant-design/icons';
import { type } from 'os';
import { DOMAIN_IMPORT_CONTRACT_API } from '@/api/constApi';
import { request } from '@/api/request';



interface Props {
    onClose?: () => void;
    showDrawerImport?: () => void;
    importOpen?: boolean;
    setForceUpdate?: Dispatch<SetStateAction<boolean>>;
    forceUpdate?: boolean;
    form?: FormInstance<any>;
}
const FileForm: FC<Props> = ({
    onClose,
    showDrawerImport,
    importOpen,
    setForceUpdate,
    forceUpdate,
    form
}) => {
    const [loading, setLoading] = useState(false);
    const [fileContract, setFileContract] = useState<any>();
    const onFinish = async () => {
        await form?.validateFields();
        const data = form?.getFieldsValue();
        console.log(data)
        try {
            const url = DOMAIN_IMPORT_CONTRACT_API.IMPORT
            var formData = new FormData();
            formData.append("file", fileContract);
            setLoading(true);
            const res = await request("post", url, formData)
            if (res) {
                $message.success(`Import thành công và có ${res.duplicate.length} mã nhân viên bị trùng là ${res.duplicate.join(",")}`);
                setForceUpdate!(true);
                onClose!();
            }
        } catch (error) {
            $message.error('Import thất bại');
        } finally {
            setLoading(false);

        }


    }
    const handleDownload = () => {
        fetch("https://dl.dropboxusercontent.com/scl/fi/o63qyj8fbwzso749vie3f/Master-File-MMN.xlsx?rlkey=t69zlcn4f2pyj81ybbeplt9yj&dl=0")
            .then(response => response.blob())
            .then(blob => {
                const link = document.createElement("a");
                link.href = URL.createObjectURL(blob);
                link.download = "Master-File-Template.xlsx";
                link.click();
            })
            .catch(console.error);
    }
    const customRequest = async ({ file, onSuccess, onError, onProgress }: any) => {
        setFileContract(file);
        onSuccess("ok")
    };
    return (
        <>
            <Drawer
                title="Import hợp đồng và nhân viên"
                width={320}
                onClose={onClose}
                open={importOpen}
                destroyOnClose
                bodyStyle={{ paddingBottom: 80 }}
                footer={
                    <div style={{ display: 'flex', justifyContent: 'end' }}>
                        <Button key={1} onClick={onClose}>
                            Hủy
                        </Button>
                        <Button
                            key={2}
                            onClick={onFinish}
                            type="primary"
                            loading={loading}>
                            Lưu
                        </Button>
                    </div>
                }
            >
                <Spin spinning={loading}>
                    <MyForm<any>
                        onFinish={onFinish}
                        form={form}
                        layout="vertical">
                        <MyForm.Item
                            name="file"
                            required
                            label="File"
                        >
                            <Upload
                                customRequest={customRequest}
                            >
                                <Button icon={<UploadOutlined />}>Click to Upload</Button>
                            </Upload>
                            <Button
                                style={{ marginTop: 10 }}
                                type="primary"
                                onClick={handleDownload}
                                icon={<DownloadOutlined />}
                            >
                                Tải xuống Template
                            </Button>
                        </MyForm.Item>
                    </MyForm>
                </Spin>

            </Drawer>
        </>
    )
}

export default FileForm;

