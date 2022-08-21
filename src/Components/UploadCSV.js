import React from "react";
import { Modal, ModalBody, Button} from 'reactstrap'
import styles from "./modal.module.css"; 

const UploadCSV = ({isopen, togglemodal}) => {
  return (
    <Modal isOpen={isopen} toggle={togglemodal}>
      <div className="modal-header justify-content-center">
        <button
          className="close"
          type="button"
          onClick={togglemodal}
        >
          <i className="now-ui-icons ui-1_simple-remove"></i>
        </button>
        <h4 className="title title-up">Upload Placement Record</h4>
      </div>
      <ModalBody>
        <div className={styles.fileupload}>
          <button
            className={styles.file_upld_btn}
            type="file"
            onclick="$('.file-upload-input').trigger( 'click' )"
          >
            Add file
          </button>

          <div className={styles.img_upload_wrapper}>
            <input
              className={styles.file_upload_input}
              type="file"
              onchange="readURL(this);"
              accept="image/*"
            />
            <div className={styles.drag_text}>
              <h3> or Drag and drop a file here!</h3>
            </div>
          </div>

          <div className={styles.file_upload_content}>
            <img
              className={styles.file_upload_image}
              src="#"
              alt="your image"
            />
            <div className={styles.image_title_wrap}>
              <button
                type="button"
                onclick="removeUpload()"
                className="image-btn btn btn-danger"
              >
                Remove <span class="image-title">Uploaded Image</span>
              </button>
              <button type="button" className="btn btn-success image-btn">
                Upload <span className="image-title">Upload Image</span>
              </button>
            </div>
          </div>
        </div>
      </ModalBody>

      <div className="modal-footer">
        <Button className="btn btn-success image-btn" type="button">
          Submit
        </Button>
        <Button
          className="image-btn btn btn-danger"
          type="button"
          onClick={togglemodal}
        >
          Close
        </Button>
      </div>
    </Modal>
  );
};

export default UploadCSV;
