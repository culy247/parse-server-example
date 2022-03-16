const S3Service = require('../../aws/s3')

module.exports = async function upload(req) {
  const file = JSON.parse(JSON.stringify(req.files))

  const file_name = file.file.name

  const buffer = new Buffer.from(file.file.data.data)

  const response = await S3Service.S3.upload({
    Bucket: S3Service.bucket,
    Key: file_name,
    Body: buffer,
    ACL: 'public-read'
  });

  return response;
}
