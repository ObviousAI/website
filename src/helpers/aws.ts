import AWS from "aws-sdk";
import { v4 as uuidv4 } from "uuid";

const s3 = new AWS.S3({
    accessKeyId: "AKIAXWYG7NAVSRIQFHK2",
    secretAccessKey: "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",
    region: "us-east-2",
  });

  

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

    try {
      await s3.upload(params).promise();
      return uniqueKey;
    } catch (error) {
      console.error("Error uploading data to S3:", error);
      return null;
    }
};

export { fetchFromS3, uploadToS3 };