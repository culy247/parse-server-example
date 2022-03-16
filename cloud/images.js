
const composite = require('./images/composite')
const createSample = require('./images/sample')

Parse.Cloud.define('upload', async (request) => {
  const Files = Parse.Object.extend("Files");
  const files = new Files();

  const file = request.params.file;
  files.set("files", file);
  files.save(null, {
    success: function(files) {
      return {
        success: 1,
        data: files
      };
    },
    error: function(files, error) {
      throw new Error({
        success: 0,
        error: error,
        files: files
      });
    }
  });
});

Parse.Cloud.define('composite', async (request) => {

  const outFile = request.params.out || 'out.png';
  const src =  request.params.src;
  const mask = request.params.mask;
  const maskWidth = request.params.mask_width || 100;
  const maskHeight = request.params.mask_height || 100;
  const top = request.params.top || 0;
  const left = request.params.left || 0;
  const blend = request.params.blend || 'multiply';

  const info = await composite({
    out: outFile,
    src: src,
    mask: mask,
    maskWidth: maskWidth,
    maskHeight: maskHeight,
    top: top,
    left: left,
    blend: blend
  });
  return info;
});

Parse.Cloud.define('createSample', async () => {
  const result = await createSample();
  return result;
});
