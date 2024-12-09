import React from "react";
import { Modal, Button } from 'antd';
import { useSelector, useDispatch } from "react-redux";
import ModalInfoActions from "../../appRedux/reducers/ModalInfoRedux";

const ModalInfo = () => {
    const dispatch = useDispatch();
    const modalInfoState = useSelector(({modalinfo}) => modalinfo)
    return (
        <Modal
          centered
          visible={modalInfoState.showed?modalInfoState.showed:false}
          title={modalInfoState.title?modalInfoState.title:''}
          onOk={modalInfoState.handleOk?modalInfoState.handleOk:() => dispatch(ModalInfoActions.showModalInfo(false)) }
          onCancel={modalInfoState.handleCancel?modalInfoState.handleCancel:() => dispatch(ModalInfoActions.showModalInfo(false)) }
          footer={[
            <Button key="back" onClick={modalInfoState.handleOk?modalInfoState.handleOk:() => dispatch(ModalInfoActions.showModalInfo(false)) }>
              OK
            </Button>
          ]}
        >
          {modalInfoState.content?modalInfoState.content:''}
        </Modal>
)}
export default ModalInfo;


