import AWS from "aws-sdk";
export async function uploadToS3(file: File) {
  try {
    AWS.config.update({
      accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
      region: process.env.NEXT_PUBLIC_AWS_REGION,
    });

    const s3 = new AWS.S3({
      apiVersion: "2006-03-01",
      params: {
        Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME!,
      },
    });

    const fileKey =
      "uploads/" + Date.now().toString() + "-" + file.name.replace(" ", "-");

    const params = {
      Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME!,
      Body: file,
      Key: fileKey,
      ContentType: file.type,
    };

    const upload = s3
      .putObject(params)
      .on("httpUploadProgress", (evt) => {
        console.log(
          "uploading to s3",
          parseInt(((evt.loaded * 100) / evt.total).toString()) + "%"
        );
      })
      .promise();

    await upload.then((data) => {
      console.log("successfully upload to S3", fileKey);
    });

    return Promise.resolve({
      file_key: fileKey,
      file_name: file.name,
    });
  } catch (error) {}
}

export function getS3Url(fileKey: string) {
  const url = `https://${process.env.NEXT_PUBLIC_AWS_BUCKET_NAME}.s3.ap-southeast-1.amazonaws.com/${fileKey}`;
  return url;
}
