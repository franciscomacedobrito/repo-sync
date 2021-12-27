export const GET_PACKAGE_INFO = 'getPackageInfo';
export const GET_PACKAGE_INFO_BY_ID = 'getPackageInfoById';
export const GET_PACKAGES = 'getPackages';
export const POST_PACKAGE = 'postPackage';

export const GET_LINKS = 'getLinks';
export const CREATE_LINK = 'createLink';
export const LISTEN_LINK = 'listenLink';
export const UPDATE_PACKAGE_ON_CLIENT = 'updatePackageOnClient';
export const GET_PACKAGE_INFO_ON_CLIENT = 'getPackageInfoOnClient';

export const GET_FILE_CONTENT = 'getFileContent';

export const NOTIFY_CLIENT = 'notifyClient';
export const ERROR = 'appError';
//TODO a function should be made to transport the DATA_BASE to the client in order ro reduce calls
// only a few calls would benefit since the gathering must be done on the BE
export const GET_DATABASE = 'getDataBase';
