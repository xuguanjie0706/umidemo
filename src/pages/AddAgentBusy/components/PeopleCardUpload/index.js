import React, { useState, useEffect } from 'react';
import { Upload, message, Progress } from 'antd';
import { PlusOutlined, ReloadOutlined } from '@ant-design/icons';
import './index.less';
import api from '@/api';
import compass from './compass';

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}
const PeopleCardUpload = props => {
  const {
    desc = '身份证正面',
    style = { width: 222, height: 140 },
    value,
    onChange,
  } = props;
  // const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(value);
  const [depiction, setDepiction] = useState(desc);
  const [complete, setComplete] = useState(0);
  const [isShow, setIsShow] = useState(false);

  const [status, setStatus] = useState('active');

  useEffect(() => {
    if (value) setImageUrl(value);
  }, [value]);
  // const handleChange = info => {
  //   console.log(info);

  //   if (info.file.status === 'uploading') {
  //     setLoading(true);
  //     return;
  //   }
  //   if (info.file.status === 'done') {
  //     // Get this url from response in real world.
  //     getBase64(info.file.originFileObj, image => {
  //       setImageUrl(image);
  //       setDepiction('重新上传');
  //     });

  //   }
  // };
  const beforeUpload = file => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('请上传 JPG/PNG 格式的文件!');
    }
    // const isLt2M = file.size / 1024 / 1024 < 2;
    // if (!isLt2M) {
    //   message.error('图片不能超过 2MB!');
    // }
    // return isJpgOrPng && isLt2M;
    return isJpgOrPng;
  };

  const onUploadProgress = progressEvent => {
    const completeActive =
      (progressEvent.loaded / progressEvent.total) * 100 || 0;
    setComplete(completeActive);
    if (completeActive === 100) {
      setTimeout(() => {
        setIsShow(false);
      }, 500);
    }
  };

  const upload = async e => {
    const { file } = e;
    const a = await compass(file, 0.4);
    // console.log(a);

    try {
      const formData = new FormData();
      formData.append('file', a);
      setIsShow(true);
      setStatus('active');
      const r = await api.file.upload({ data: formData, onUploadProgress });
      console.log(r);
      if (r) {
        const { absoluteUrl } = r;
        onChange(absoluteUrl);
        setImageUrl(absoluteUrl);
        setTimeout(() => {
          setIsShow(false);
        }, 500);
      } else {
        setStatus('exception');
      }
    } catch (error) {
      console.log(error);
      setIsShow(false);
    }
  };

  return (
    <Upload
      customRequest={upload}
      showUploadList={false}
      beforeUpload={beforeUpload}
    >
      <div className="people-card-upload" style={style}>
        {imageUrl && (
          <img
            src={imageUrl}
            alt="avatar"
            style={{ width: '100%', height: '100%' }}
          />
        )}
        {!isShow ? (
          <div className={`people-card-upload-modal ${imageUrl ? 'done' : ''}`}>
            {/* <div className="icon-r"> */}
            {imageUrl ? (
              <span className="span">重新上传</span>
            ) : (
              <>
                {' '}
                <PlusOutlined size={50} /> <p>{depiction}</p>
              </>
            )}
            {/* </div> */}
          </div>
        ) : (
          <div className="progress">
            {isShow && (
              <Progress
                width={60}
                // strokeColor="#fff"
                status={status}
                type="circle"
                percent={complete}
              />
            )}
          </div>
        )}
      </div>
    </Upload>
  );
};

export default PeopleCardUpload;
