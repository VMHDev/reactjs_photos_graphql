// Độ dài của token reset password
export const PASSWORD_RESET_TOKEN_LENGTH = parseInt(
  process.env.REACT_APP_PASSWORD_RESET_TOKEN_LENGTH
    ? process.env.REACT_APP_PASSWORD_RESET_TOKEN_LENGTH
    : '12'
);
// Thời gian hết hạn của token reset password
export const PASSWORD_RESET_TOKEN_EXPIRE = parseFloat(
  process.env.REACT_APP_PASSWORD_RESET_TOKEN_EXPIRE
    ? process.env.REACT_APP_PASSWORD_RESET_TOKEN_EXPIRE
    : '2'
);

// Đường dẫn reset password
export const WEB_DOMAIN = process.env.REACT_APP_WEB_DOMAIN
  ? process.env.REACT_APP_WEB_DOMAIN
  : 'http://localhost/';
export const WEB_PORT = process.env.REACT_APP_PORT
  ? process.env.REACT_APP_PORT
  : '3014';
export const WEB_URL = WEB_DOMAIN + WEB_PORT;

// Timezone
// Ref list value: https://github.com/moment/moment-timezone/blob/develop/data/packed/latest.json
export const TIME_ZONE = process.env.REACT_APP_TIME_ZONE
  ? process.env.REACT_APP_TIME_ZONE
  : 'Etc/GMT+7';

// Chuỗi ký tự bí mật dùng trong mã hóa
export const PASS_PHRASE = process.env.REACT_APP_PASS_PHRASE
  ? process.env.REACT_APP_PASS_PHRASE
  : 'photos_vmhdev_hack';
// Thời gian hết hạn của cookie (Đơn vị là ngày)
export const COOKIES_EXPIRE = process.env.REACT_APP_COOKIES_EXPIRE
  ? process.env.REACT_APP_COOKIES_EXPIRE
  : '1';
// Tên của cookie token
export const COOKIES_TOKEN_NAME = process.env.REACT_APP_COOKIES_TOKEN_NAME
  ? process.env.REACT_APP_COOKIES_TOKEN_NAME
  : 'photos_token_graph';
// Tên của cookie user login
export const COOKIES_USERLOGIN_NAME = process.env
  .REACT_APP_COOKIES_USERLOGIN_NAME
  ? process.env.REACT_APP_COOKIES_USERLOGIN_NAME
  : 'photos_user_login_graph';

// Đường dẫn gọi API
export const API_URL =
  process.env.NODE_ENV !== 'production'
    ? process.env.REACT_APP_API_URL_DEV
      ? process.env.REACT_APP_API_URL_DEV
      : 'http://localhost:3003/api'
    : process.env.REACT_APP_API_URL_PRD
    ? process.env.REACT_APP_API_URL_PRD
    : 'https://somedeployurl';

export const API_URL_GRAPH =
  process.env.NODE_ENV !== 'production'
    ? process.env.REACT_APP_API_URL_GRAPH_DEV
      ? process.env.REACT_APP_API_URL_GRAPH_DEV
      : 'http://localhost:3013'
    : process.env.REACT_APP_API_URL_GRAPH_PRD
    ? process.env.REACT_APP_API_URL_GRAPH_PRD
    : 'https://somedeployurl';
