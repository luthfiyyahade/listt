// const TARGET = process.env.REACT_APP_API_URL || 'localhost';
// const PORT = process.env.REACT_APP_API_PORT || 1337;
// const HTTP = process.env.REACT_APP_API_HTTP || 'http';
const BASE_URL = "http://8.215.41.233:8282/api/"; //'https://my-json-server.typicode.com/';
const SAMPLE_API_URL = "http://8.215.32.207/testprovider/"; //'https://my-json-server.typicode.com/';

module.exports = {
  footerText: "Copyright Company Name © 2022",
  BASE_URL,
  SAMPLE_API_URL,
  IS_SESSION_TIMEOUT_ACTIVE: false,
  SESSION_TIMEOUT: 1000 * 60 * 9, //

  CAPCTCHA_CHANCES: 2,
  HOLD_TIME: 5,

  tablePageSize: 10,

  timeOut: 1000 * 1800,
};
