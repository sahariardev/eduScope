import AWS from "aws-sdk";
import logger from "../services/logger.service.js";

export const initializeUpload = async (req, res) => {
    try {
        console.log('Initializing upload');
        const {filename} = req.body;
        AWS.config.update({
            region: process.env.AWS_REGION,
            accessKeyId: process.env.AWS_SECRECT_ACCESS_ID,
            secretAccessKey: process.env.AWS_SECRECT_ACCESS_KEY
        });

        const s3 = new AWS.S3();

        const params = {
            Bucket: process.env.AWS_BUCKET,
            Key: filename,
            ContentType: 'video/mp4'
        }
        const multiPartParams = await s3.createMultipartUpload(params).promise();

        return res.status(200).json({uploadId: multiPartParams.UploadId});

    } catch (error) {
        logger.error(`Error : ${error.message}`);
        return res.status(500).json({message: 'Upload failed'});
    }
}

export const uploadChunk = async (req, res) => {
    logger.info(`Uploading file`);
    try {
        const {filename, chunkIndex, uploadId} = req.body;
        const s3 = new AWS.S3({
            region: process.env.AWS_REGION,
            accessKeyId: process.env.AWS_SECRECT_ACCESS_ID,
            secretAccessKey: process.env.AWS_SECRECT_ACCESS_KEY
        });

        const bucketName = process.env.AWS_BUCKET;
        const partNumber = parseInt(chunkIndex) + 1;

        const params = {
            Bucket: bucketName,
            Key: filename,
            UploadId: uploadId,
            PartNumber: parseInt(chunkIndex) + 1,
            Body: req.file.buffer
        }

        logger.info(`putting chunk to s3`);

        const data = await s3.uploadPart(params).promise();
        logger.info(data);
        res.status(200).json({success: true, ETag: data.ETag, partNumber: partNumber});
    } catch (error) {
        logger.error(`Error : ${error.message}`);
        return res.status(500).json({message: 'Upload failed'});
    }
}

export const completeUpload = async (req, res) => {
    try {
        logger.info(`completing upload file`);
        const {filename, uploadId, etags} = req.body;
        const uploadParts = [];
        const s3 = new AWS.S3({
            region: process.env.AWS_REGION,
            accessKeyId: process.env.AWS_SECRECT_ACCESS_ID,
            secretAccessKey: process.env.AWS_SECRECT_ACCESS_KEY
        });

        logger.info(JSON.parse(etags));

        const completeParams = {
            Bucket: process.env.AWS_BUCKET,
            Key: filename,
            UploadId: uploadId,
            MultipartUpload: {Parts: JSON.parse(etags)}
        }

        logger.info(completeParams);

        const completeRes = await s3.completeMultipartUpload(completeParams).promise();

        //info sqs to start transcoding these file
        // also save info in db
        return res.status(200).json({message: "Uploaded successfully"})

    } catch (error) {
        logger.error(`Error : ${error.message}`);
        return res.status(500).json({message: 'Upload failed'});
    }
}