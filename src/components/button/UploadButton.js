import React, { useEffect } from 'react';
import AWS from 'aws-sdk';
import { useState } from 'react';
import ContainedButton from './ContainedButton';
import styled from 'styled-components';
import { CameraIcon } from '../../assets/icons';
import BlurModal from '../modal/BlurModal';
import { requestOCR } from '../../utils/api/student';
import { useNavigate } from 'react-router-dom';

const BlurContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 100vh;
    position: relative;
    align-items: center;

    .blur-image {
        width: 400px;
        height: 400px;
    }
`;
const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-evenly;
    margin-top: 20px;
`;
const StyledInputContainer = styled.div`
    display: flex;
`;
const AttachButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 335px;
    height: 44px;
    border-radius: 4px;
    font-family: 'DXSamgakGimbap Light';
    font-size: 18px;
    color: white;
    background-color: #127fff;

    .camera {
        margin-right: 10px;
    }
`;
const Input = styled.input`
    display: none;
`;

const UploadButton = ({ studentId, workbookId, groupId }) => {
    const [file, setFile] = useState(null);
    const [fileImage, setFileImage] = useState(null);
    const [imageCaptured, setImageCaptured] = useState(false);
    const [OCRres, setOCRres] = useState([]);
    const navigate = useNavigate();

    const requestOCRdata = async (workbookId, imageName) => {
        try {
            const res = await requestOCR(workbookId, imageName);
            setOCRres(res.data.scoreDtoList);
            console.log('OCRRES', OCRres);
        } catch (error) {
            console.error('Error requesting OCR:', error);
        }
    };

    const uploadFile = async () => {
        const S3_BUCKET = 'bada-static-bucket';
        const REGION = 'ap-northeast-2';

        AWS.config.update({
            accessKeyId: process.env.REACT_APP_ACCESS_KEY,
            secretAccessKey: process.env.REACT_APP_SECRET_KEY,
        });

        const s3 = new AWS.S3({
            params: { Bucket: S3_BUCKET },
            region: REGION,
        });

        // Files Parameters
        const fileFormat = file.type.substring(6); // image/~~~
        const imageName = studentId + '_' + workbookId + '.' + fileFormat; // stId_wbId.~~
        const params = {
            Bucket: S3_BUCKET,
            Key: imageName,
            Body: file,
        };

        // Uploading file to s3

        var upload = s3
            .putObject(params)
            .on('httpUploadProgress', (evt) => {})
            .promise();

        await upload.then((err, data) => {
            // console.log(err);
            requestOCRdata(workbookId, imageName);
        });
        setImageCaptured(false);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const imageUrl = URL.createObjectURL(file);
        setFile(file);
        setFileImage(imageUrl);
        setImageCaptured(true);
    };
    const cancleOnClick = () => {
        setImageCaptured(false);
    };

    useEffect(() => {
        if (OCRres.length > 0) {
            console.log('Navigating with OCR results:', OCRres);
            navigate('/stuResult', { state: { workbookId, OCRres, groupId } });
        }
    }, [OCRres, navigate, workbookId]);

    return (
        <div>
            {imageCaptured && (
                <BlurContainer>
                    <BlurModal
                        innerDatas={
                            <>
                                <img className="blur-image" src={fileImage} alt="userImage" />
                                <ButtonContainer>
                                    <ContainedButton btnType="primary" size="mid" text="제출" onClick={uploadFile} />
                                    <ContainedButton
                                        btnType="primary"
                                        size="mid"
                                        text="다시 찍기"
                                        onClick={cancleOnClick}
                                    />
                                </ButtonContainer>
                            </>
                        }
                    />
                </BlurContainer>
            )}
            <label htmlFor="file">
                <StyledInputContainer>
                    <AttachButton>
                        <img className="camera" src={CameraIcon} alt="camera" />
                        사진 찍어 제출하기
                    </AttachButton>
                    <Input
                        type="file"
                        id="file"
                        capture="environment"
                        accept="image/jpg, image/png, image/jpeg"
                        onChange={handleFileChange}
                    />
                </StyledInputContainer>
            </label>
        </div>
    );
};

export default UploadButton;
