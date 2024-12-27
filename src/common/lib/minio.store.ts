import * as Minio from "minio";

export const minioClient = new Minio.Client({
  region: process.env.S3_REGION ?? "",
  endPoint: process.env.S3_ENDPOINT ?? "",
  port: 9000,
  useSSL: false,
  accessKey: process.env.S3_ACCESS_KEY ?? "",
  secretKey: process.env.S3_SECRET_ACCESS_KEY ?? "",
});

export const uploadAvatarToMinIO = async (
  objectName: string,
  filePath: string
): Promise<string> => {
  const bucketName = "faive";
  try {
    const bucketExists = await minioClient.bucketExists(bucketName);
    if (!bucketExists) {
      await minioClient.makeBucket(bucketName, "us-east-1");
    }

    await minioClient.fPutObject(bucketName, objectName, filePath);
    return `https://${process.env.S3_ENDPOINT}/${bucketName}/avatar/${objectName}`;
  } catch (error) {
    throw new Error(`Lỗi khi upload ảnh lên MinIO: ${error.message}`);
  }
};

export const uploadProfileUrl = async (
  objectName: string,
  fileBuffer: any
): Promise<string> => {
  const bucketName = "faive";
  try {
    const bucketExists = await minioClient.bucketExists(bucketName);
    if (!bucketExists) {
      await minioClient.makeBucket(bucketName, "us-east-1");
    }

    await minioClient.fPutObject(bucketName, objectName, fileBuffer);
    return `https://${process.env.S3_ENDPOINT}/${bucketName}/avatar/${objectName}`;
  } catch (error) {
    throw new Error(`Lỗi khi upload ảnh lên MinIO: ${error.message}`);
  }
};
