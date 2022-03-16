const sharp = require('sharp');
const S3Service = require('../../aws/s3')
const { parseLink, buildS3Link } = require('./link')

module.exports = async function composite(params = {}) {

  if(!params.src) {
    return {
      success: 0,
      error: {
        message: 'No src image path'
      }
    };
  }

  if(!params.mask) {
    return {
      success: 0,
      error: {
        message: 'No  mask image path'
      }
    };
  }

  const outFile = params.out || 'out.png';
  const src =  await parseLink(buildS3Link(params.src));
  const mask = await parseLink(buildS3Link(params.mask));

  if(!src || !mask) {
    return {
      success: 0,
      error: {
        message: `Could not parse link from ${params.src}`
      }
    };
  }

  if(!mask) {
    return {
      success: 0,
      error: {
        message: `Could not parse link from ${params.mask}`
      }
    };
  }

  const maskWidth = params.maskWidth || 100;
  const maskHeight = params.maskHeight || 100;
  const top = params.top || 0;
  const left = params.left || 0;
  const blend = params.blend || 'multiply';

  const maskDest = await sharp(mask)
  // .flatten(true)
    .resize(maskWidth, maskHeight, {
      kernel: sharp.kernel.nearest,
      fit: 'contain',
      position: 'left top',
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    })
    .png({progressive: true})
    .toBuffer();

  const dest = await sharp(src);

  const info = await dest
    .composite([
      { input: maskDest, top: top, left: left, blend: blend },
    ])
    .toBuffer({ resolveWithObject: true })
  //.toFile(outFile)
    .then(({data, info}) => {
      return S3Service.S3.upload({
        Bucket: S3Service.bucket,
        Key: outFile,
        Body: data,
        ACL: 'public-read'
      })
        .promise()
        .then(function (response) {
          return {
            success: 1,
            error: null,
            info: Object.assign(info, response),
          };
        })
        .catch(function(err) {
          return {
            success: 0,
            error: err,
            info: info
          };
        });
    })
    .catch((err) => {
      return {
        success: 0,
        error: err,
        info: null
      };
    });

  return info;

}
