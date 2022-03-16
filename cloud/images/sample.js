const path = require('path');
const fs = require('fs');
const S3Service = require('../../aws/s3')

module.exports = async function createSample() {

  const src = path.join(__dirname, './../../sample/src_1.png');
  const mask = path.join(__dirname, './../../sample/mask.jpg');
  const srcData = fs.readFileSync(src);
  const maskData = fs.readFileSync(mask);
  const time = (new Date).getTime();

  const srcLocation = await S3Service.S3.upload({
    Bucket: S3Service.bucket,
    Key: `src_${time}.png`,
    Body: srcData,
    ACL: 'public-read'
  });

  const maskLocation = await S3Service.S3.upload({
    Bucket: S3Service.bucket,
    Key: `mask_${time}.png`,
    Body: maskData,
    ACL: 'public-read'
  });

  return {
    src: srcLocation,
    mask: maskLocation
  };
}
