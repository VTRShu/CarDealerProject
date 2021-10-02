import React from 'react';
import { Upload, Button, Space, Modal } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
const UploadFile = () => {

    const onFileRemove = (file) => {
        const { confirm } = Modal
        return new Promise((resolve, reject) => {
            confirm({

                title: 'Are you sure you want to Delete ?',
                onOk: () => {
                    resolve(true)
                    console.log(`${file.name}`)
                },
                onCancel: () => {
                    reject(true)
                }
            })
        })
    }
    return (
        <Space direction="vertical" style={{ width: '100%' }} size="large">
            <Upload
                action="https://localhost:5001/api/Image"
                name="picture"
                listType="picture"
                maxCount={3}
                multiple
                onChange={(file) => {
                    console.log(file.fileList[0].name);
                }}
                onRemove={onFileRemove}
            >
                <Button icon={<UploadOutlined />}>Upload (Max: 3)</Button>
            </Upload>
        </Space>
    )
}
export default UploadFile;