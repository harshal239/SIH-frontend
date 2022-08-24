import React, { useEffect, useState } from "react";
import { Modal, ModalBody, Button, FormGroup, Label, Input, Container } from "reactstrap";
import IndexNavbar from "./Navbars/IndexNavbar";
import { Dropdown } from "react-dropdown-now";
import axios from "axios";
const AddReasons = () => {
  const [reasonArr, setreasonArr] = useState([]);
  const [otherreason, setotherReason] = useState("");
  const [year, setyear] = useState("");
  const arr = [
    "Lack of Infrastructure",
    "Lack of hands on learning experience",
    "Lack of in-demand skills",
    "Lack of job opportunities",
    "Lack of training & placement resources",
    "Different career interest apart from technical education",
  ];

  const handleOnchange = (e, reason) => {
    if (e.target.checked) {
      setreasonArr((curr) => [...curr, reason]);
    } else {
      let index = reasonArr.indexOf(reason);
      let temp = reasonArr;
      temp.splice(index, 1);
      setreasonArr(temp);
    }
  };

  const handleSubmit = () => {
    let temp = reasonArr;
    if (otherreason !== "") temp.push(otherreason);
    let data = {
      "reasons" : temp,
      "year": parseInt(year)
    }

    console.log(data); // reason array of string

    let userid = localStorage.getItem("userid"); // college id
    // 

    axios.
      put("https://optimizers-sih-backend.herokuapp.com/api/v1/college/PutReasons/"+userid, data)
      .then(res =>{
        alert(res)
      })
      .catch(err=>console.log(err));

  };

  useEffect(() => {
    console.log("in useeffect");
    setreasonArr([]);
    setotherReason("");
  }, []);
  return (
    <div>
      
      <IndexNavbar isfixed={true}/>
      <Container>
        <div className="justify-content-center">

          <h4 className="title title-up">Add reasons of Unemployability</h4>
        </div>
        <div>
          <p className="category">Select reasons</p>

          {arr.map((reason) => {
            return (
              <FormGroup check>
                <Label check>
                  <Input
                    type="checkbox"
                    onChange={(e) => handleOnchange(e, reason)}
                    // checked={(-1 === -1) ? false : true}
                    // onChange={()=>setreasonArr(curr=>[...curr, reason])}
                  />
                  <span className="form-check-sign"></span>
                  {reason}
                </Label>
              </FormGroup>
            );
          })}

          <br />
          <Dropdown
            placeholder="Select Year"
            className="my-className"
            options={[2019, 2020, 2021, 2022]}
            value="one"
            onChange={(item) => {
              setyear(item.value);
            }}
          />
          <br />
          <FormGroup>
            <Label> If Other than above reasons, please specify</Label>
            <Input
              value={otherreason}
              defaultValue=""
              placeholder="Enter reasons here"
              type="textbox"
              onChange={(e) => setotherReason(e.target.value)}
            ></Input>
          </FormGroup>
        </div>

        <div>
          <Button
            className="btn btn-success image-btn"
            type="submit"
            onClick={handleSubmit}
          >
            Submit
          </Button>

        </div>

      </Container>
    </div>


  );
};

export default AddReasons;
