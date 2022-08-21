import React from "react";
import { Modal, ModalBody, Button } from "reactstrap";

const AddReasons = ({addreasonsModal, toggleAddreason}) => {
  return (
    <Modal isOpen={addreasonsModal} toggle={toggleAddreason}>
      <div className="modal-header justify-content-center">
        <button className="close" type="button" onClick={toggleAddreason}>
          <i className="now-ui-icons ui-1_simple-remove"></i>
        </button>
        <h4 className="title title-up">Add reasons of Unemployability</h4>
      </div>
      <ModalBody></ModalBody>

      <div className="modal-footer">
        <Button className="btn btn-success image-btn" type="button">
          Submit
        </Button>
        <Button
          className="image-btn btn btn-danger"
          type="button"
          onClick={toggleAddreason}
        >
          Close
        </Button>
      </div>
    </Modal>
  );
};

export default AddReasons;
