// a library to wrap and simplify api calls
import apisauce from "apisauce";
import config from "../util/config";
import {notification, Modal, Row, Col} from 'antd'
import { ExclamationCircleFilled } from "@ant-design/icons";

// our "constructor"
const create = (baseURL = config.SAMPLE_API_URL) => {
  // ------
  // STEP 1
  // ------
  //
  // Create and configure an apisauce-based api object.
  //
  const api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
      // 'Cache-Control': 'no-cache',
      // 'Content-Type': 'application/json',
    },
    // 10 second timeout...
    timeout: 10000 /* * 30 */, //di uncoment = 30 menit
  });

  api.addResponseTransform(async (response) => { 
    if (!response.ok && response.data) { 
      // notification.error({
      //   message: 'Error',
      //   description: response.data.message ? response.data.message : 'Unknown Error From Backend (Code: 1)',
      // })
      Modal.error({
        centered: true,
        icon: <ExclamationCircleFilled />,
        okType: 'danger',
        content: (
          <div>
            <p>{response.data.message ? response.data.message : 'Unknown Error From Backend (Code: 1)'}</p>
          </div>
        ),
        title: <Row type="flex" justify="start" style={{ alignItems: 'center' }} gutter={[5, 0]}>
            <Col>
                <span>Perhatian !</span>
            </Col>
        </Row>,
        onOk() {
  
        },
        onCancel() { },
    });

    }  

    if (!response.ok && response.problem && response.problem === 'TIMEOUT_ERROR') {  
      notification.error({
        message: 'Error',
        description: 'Gagal Terkoneksi ke server, harap periksa koneksi',
      }) 
    }

    if (!response.ok && response.problem && response.problem === 'NETWORK_ERROR') {  
      notification.error({
        message: 'Error',
        description: 'Tidak Dapat Terhubung ke Server',
      }) 
    }

    

    if (response.ok && response.data && response.data.error) {
      notification.error({
        message: 'Error',
        description: response.data.message ? response.data.message : 'Unknown Error From Backend (Code: 2)' ,
      })

    }
  })


  // ------
  // STEP 2
  // ------
  //
  // Define some functions that call the api.  The goal is to provide
  // a thin wrapper of the api layer providing nicer feeling functions
  // rather than "get", "post" and friends.
  //
  // I generally don't like wrapping the output at this level because
  // sometimes specific actions need to be take on `403` or `401`, etc.
  //
  // Since we can't hide from that, we embrace it by getting out of the
  // way at this level.
  //
  const singleInquiryFormRequest = (data) => api.get("grform/"+data);
  const singleInquirySubmitRequest = (data) => api.get("gr/table");
  
  // ------
  // STEP 3
  // ------
  //
  // Return back a collection of functions that we would consider our
  // interface.  Most of the time it'll be just the list of all the
  // methods in step 2.
  //
  // Notice we're not returning back the `api` created in step 1?  That's
  // because it is scoped privately.  This is one way to create truly
  // private scoped goodies in JavaScript.
  //
  return {
    // a list of the API functions from step 2
    singleInquiryFormRequest,
    singleInquirySubmitRequest
  };
};

// let's return back our create method as the default.
export default {
  create,
};
