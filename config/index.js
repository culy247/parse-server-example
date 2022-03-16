
const path = require('path');
const S3Adapter = require('@parse/s3-files-adapter');

const NODE_ENV = process.env.NODE_ENV || 'development';

const AWS_S3_ACCESS_KEY_ID = process.env.AWS_S3_ACCESS_KEY_ID || 'AWS_S3_ACCESS_KEY_ID';
const AWS_S3_SECRET_ACCESS_KEY = process.env.AWS_S3_SECRET_ACCESS_KEY || 'AWS_S3_SECRET_ACCESS_KEY';
const AWS_S3_REGION = process.env.AWS_S3_REGION || 'ap-northeast-1';
const AWS_S3_VERSION = process.env.AWS_S3_VERSION || '2006-03-01';
const AWS_S3_BUCKET = process.env.AWS_S3_BUCKET || 'AWS_S3_BUCKET';
const AWS_S3_ENDPOINT = process.env.AWS_S3_ENDPOINT || 'https://s3-' + AWS_S3_REGION + '.amazonaws.com';
const DATABASE_URI = process.env.DATABASE_URI || process.env.MONGODB_URI || process.env.DATABASE_URL || 'mongodb+srv://mongodb_user:mongodb_password@localhost:27017/dev';

const PORT = process.env.PORT || 1337;
const CLOUD_CODE_MAIN = process.env.CLOUD_CODE_MAIN || path.join(__dirname , '/../cloud/main.js');
const APP_ID = process.env.APP_ID || 'myAppId';
const APP_NAME = process.env.APP_NAME || 'myApp';
const MASTER_KEY = process.env.MASTER_KEY || 'MASTER_KEY';
const CLIENT_KEY = process.env.CLIENT_KEY || '';
const JAVASCRIPT_KEY = process.env.JAVASCRIPT_KEY || '';
const REST_API_KEY = process.env.REST_API_KEY || '';
const DOT_NET_KEY = process.env.DOT_NET_KEY || '';
const PARSE_MOUNT = process.env.PARSE_MOUNT || '/parse';
const SERVER_URL = process.env.SERVER_URL || 'http://localhost:' + PORT + PARSE_MOUNT;

const ADMIN_PATH = process.env.ADMIN_PATH || '/admin';
const ADMIN_USER = process.env.ADMIN_USER || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'password';

const adapter = new S3Adapter(
    AWS_S3_ACCESS_KEY_ID, 
    AWS_S3_SECRET_ACCESS_KEY, 
    AWS_S3_BUCKET, 
    {},
    AWS_S3_REGION,
);

const LIVE_QUERY_CLASSES = process.env.LIVE_QUERY_CLASSES || null;

let LIVE_QUERY_ARRAY_CLASSES = [];

if( LIVE_QUERY_CLASSES && LIVE_QUERY_CLASSES.length ) {
  LIVE_QUERY_ARRAY_CLASSES = (LIVE_QUERY_CLASSES.split(',')).filter( (value) => value && value.length > 0 );
}

const appConfig = {
    databaseURI: DATABASE_URI,
    cloud: CLOUD_CODE_MAIN,
    appId: APP_ID,
    masterKey: MASTER_KEY,
    clientKey: CLIENT_KEY, 
    javascriptKey: JAVASCRIPT_KEY, 
    restAPIKey: REST_API_KEY, 
    dotNetKey: DOT_NET_KEY, 
    serverURL: SERVER_URL,
    liveQuery: {
      classNames: LIVE_QUERY_ARRAY_CLASSES,
    },
    filesAdapter: adapter
};

const dashboardConfig = {
    apps: [
      {
        serverURL: SERVER_URL,
        appId: APP_ID,
        masterKey: MASTER_KEY,
        appName: APP_NAME
      }
    ],
    users: [{
      user: ADMIN_USER,
      pass: ADMIN_PASSWORD
    }]
};

module.exports = {
    AWS_S3_ACCESS_KEY_ID,
    AWS_S3_SECRET_ACCESS_KEY,
    AWS_S3_REGION,
    AWS_S3_VERSION,
    AWS_S3_BUCKET,
    AWS_S3_ENDPOINT,
    DATABASE_URI,
    CLOUD_CODE_MAIN,
    PORT,
    APP_ID,
    APP_NAME,
    MASTER_KEY,
    CLIENT_KEY,
    JAVASCRIPT_KEY,
    REST_API_KEY,
    DOT_NET_KEY,
    PARSE_MOUNT,
    SERVER_URL,
    ADMIN_USER,
    ADMIN_PASSWORD,
    NODE_ENV,
    appConfig,
    dashboardConfig,
    ADMIN_PATH,
    LIVE_QUERY_CLASSES,
    LIVE_QUERY_ARRAY_CLASSES
}
