import { S3Client } from "@aws-sdk/client-s3";

const accessKeyId = "juhf32633hdilbeohxosyh7ux6mq";
const secretAccessKey = "j3fuc5matgmg2crg5jqsykkif7vzhmmsi7iwdow724ohilcakpyik";
const endpoint = "https://gateway.us1.storjshare.io";

export const s3 = new S3Client({
    region: "ap-southeast-2",
    credentials: {
        accessKeyId,
        secretAccessKey,
    },
    endpoint,
});

export const BUCKET_NAME = "ui-boundle";