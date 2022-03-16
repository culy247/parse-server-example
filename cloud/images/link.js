const axios = require('axios')
const config = require('./../../config')

async function parseLink(link) {
  try {
    const response = await axios({ url: link, responseType: "arraybuffer" });
    return Buffer.from(response)
  }catch(e){
    return null
  }
}

function buildS3Link(path) {
  const region = config.AWS_S3_REGION.includes('us-east-1') ? '' : ('-' + config.AWS_S3_REGION);
  return `https://${config.AWS_S3_BUCKET}.s3${region}.amazonaws.com/${path}`
}

module.exports = {
  parseLink,
  buildS3Link
}
