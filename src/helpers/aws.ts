import AWS from 'aws-sdk'
import * as dotenv from 'dotenv';

import { v4 as uuidv4 } from "uuid";


dotenv.config();

const s3 = new AWS.S3();

s3.config.update({
  region: 'us-east-2',
  accessKeyId: process.env.OBVIOUS_AWS_KEY ?? '',
  secretAccessKey: process.env.OBVIOUS_AWS_SECRET ?? '',
})

const fetchFromS3 = async (key: string) => {
    const params = {
      Bucket: "scrapedphotos", // Ensure this bucket name is correct
      Key: key,
    };

    try {
      const data = await s3.getObject(params).promise();
      return data.Body ? data.Body.toString("base64") : null; // Convert to base64 if needed
    } catch (error) {
      console.error("Error fetching data from S3:", error);
      return null;
    }
};


const uploadToS3 = async (base64Data: string) => {
    let imageUUID = uuidv4();
    const uniqueKey = `uploadedImages/${imageUUID}.jpg`;

    // Convert base64 to binary
    const binaryImg = atob(base64Data);
    const length = binaryImg.length;
    const arrayBuffer = new Uint8Array(new ArrayBuffer(length));

    for(let i = 0; i < length; i++) {
        arrayBuffer[i] = binaryImg.charCodeAt(i);
    }

    const params = {
      Bucket: "scrapedphotos",
      Key: uniqueKey,
      Body: new Blob([arrayBuffer], {type: 'image/jpeg'}),
      ContentType: 'image/jpeg'
    };

    console.log(s3)
    try {
      await s3.upload(params).promise();
      return uniqueKey;
    } catch (error) {
      console.error("Error uploading data to S3:", error);
      return null;
    }
};

export { fetchFromS3, uploadToS3 };