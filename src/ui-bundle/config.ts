import { S3Client } from "@aws-sdk/client-s3";

export const UPLOAD_ENDPOINT = "https://bi8fgdofma.execute-api.us-west-2.amazonaws.com/dev/flux-ui-bundle/upload";

export const s3 = new S3Client({
    region: "decentralized",
    endpoint: "http://init.so",
    credentials: {
        accessKeyId: "test key id",
        secretAccessKey: "test secret key",
    },
});

export const BUCKET_NAME = "flux";

export const LANGUAGE_NAME = "ui-bundle-store";
