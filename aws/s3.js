const AWS = require('./aws')
const config = require('./../config')

const s3 = new AWS.S3({
    apiVersion: config.AWS_S3_VERSION,
    endpoint: config.AWS_S3_ENDPOINT,
    accessKeyId: config.AWS_S3_ACCESS_KEY_ID,
    secretAccessKey: config.AWS_S3_SECRET_ACCESS_KEY,
    region: config.AWS_S3_REGION
});

module.exports = {
    S3: s3,
    bucket: config.AWS_S3_BUCKET
}