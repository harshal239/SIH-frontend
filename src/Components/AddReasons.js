import React, { useState } from "react";
import { Modal, ModalBody, Button, FormGroup, Label, Input } from "reactstrap";

const AddReasons = ({addreasonsModal, toggleAddreason}) => {
  const [reasonArr, setreasonArr] = useState([]);
  const arr = [
    "Lack of Infrastructure",
    "Lack of hands on learning experience",
    "Lack of in-demand skills",
    "Lack of job opportunities",
    "Lack of training & placement resources",
    "Different career interest apart from technical education"
  ];

  const handleOnchange = (e,reason) => {
    if (e.target.checked){
      setreasonArr(curr=>[...curr, reason])
    }
    else{
      let index = reasonArr.indexOf(reason);
      let temp = reasonArr;
      temp.splice(index,1);
      console.log(temp);
      setreasonArr(temp);
    }
  }


  const handleSubmit = () => {
    console.log(reasonArr); // reason array of string
    let userid = localStorage.getItem('userid');  // college id
    // "https://optimizers-sih-backend.herokuapp.com/api/v1/college/PutReasons"
  }
  return (
    <Modal isOpen={addreasonsModal} toggle={toggleAddreason}>
      <div className="modal-header justify-content-center">
        <button className="close" type="button" onClick={toggleAddreason}>
          <i className="now-ui-icons ui-1_simple-remove"></i>
        </button>
        <h4 className="title title-up">Add reasons of Unemployability</h4>
      </div>
      <ModalBody>
              <p className="category">Select reasons</p>

              {
                arr.map(reason => {
                  return(
                    <FormGroup check>
                      <Label check>
                        <Input 
                          type="checkbox"
                          onChange={e=>handleOnchange(e,reason)}
                          // onChange={()=>setreasonArr(curr=>[...curr, reason])}
                          />
                        <span className="form-check-sign"></span>
                        {reason}
                      </Label>
                    </FormGroup>
                  );
                })
              }
              <br/>
                <FormGroup>
                  <Label> If Other than above reasons, please specify</Label>
                  <Input
                    defaultValue=""
                    placeholder="Enter reasons here"
                    type="textbox"          
                    onBlur={(e)=>(e.target.value !== "" && setreasonArr(curr=>[...curr, e.target.value]))}
                  ></Input>
                </FormGroup>
      </ModalBody>

      <div className="modal-footer">
        <Button className="btn btn-success image-btn" type="button"
          onClick={handleSubmit}
        >
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
