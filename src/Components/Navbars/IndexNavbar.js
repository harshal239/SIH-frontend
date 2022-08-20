import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { baseurl } from "Components/baseUrl";
import styles from "./modal.module.css";

// reactstrap components
import {Button, Modal, ModalBody,ModalHeader, ModalFooter, Collapse, NavbarBrand, Navbar, NavItem, NavLink, Nav, Container, InputGroup, Input, InputGroupText,InputGroupAddon} from "reactstrap";
import NavItems from "./NavItems";
import React from 'react'




function IndexNavbar() {
  const [firstFocus, setFirstFocus] = useState(false);
  const [lastFocus, setLastFocus] = useState(false);

  const [navbarColor, setNavbarColor] = useState("navbar-transparent");
  const [collapseOpen, setCollapseOpen] = useState(false);

  const [username, setuserName] = useState("");
  const [password, setpassword] = useState("");
  const [role, setrole] = useState("none");

  const [modal1, setModal1] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [reasonsModal, setReasonsModal] = useState(false);

  const nav = useNavigate();

  useEffect(()=>{
    // cheking if user is already logged in 
    let checkrole = localStorage.getItem('role');
    console.log(checkrole);
    if (checkrole){
      setrole(checkrole);
    }

  },[])
  
  useEffect(() => {
    const updateNavbarColor = () => {
      if (
        document.documentElement.scrollTop > 399 ||
        document.body.scrollTop > 399
      ) {
        setNavbarColor("");
      } else if (
        document.documentElement.scrollTop < 400 ||
        document.body.scrollTop < 400
      ) {
        setNavbarColor("navbar-transparent");
      }
    };
    window.addEventListener("scroll", updateNavbarColor);
    return function cleanup() {
      window.removeEventListener("scroll", updateNavbarColor);
    };


    
  });

  const handleLogin = () => {
    console.log("login clicked");
    console.log(username, password);
    const data = {
      userName: username,
      password: password,
    };
    axios
      .post(baseurl + "/user/login", data)
      .then((res) => {
        console.log(res.data.body.user.role);
        setrole(res.data.body.user.role);
        setModal2(false);
        localStorage.setItem('role',res.data.body.user.role);
        alert("Login Successfull , role: ", res.data.body.user.role);
      })
      .catch((err) => console.log(err));
  };

  const toggleupload = () => setModal1(!modal1);
  const togglelogin = () => setModal2(!modal2);
  return (
    <>
      {collapseOpen ? (
        <div
          id="bodyClick"
          onClick={() => {
            document.documentElement.classList.toggle("nav-open");
            setCollapseOpen(false);
          }}
        />
      ) : null}
      <Navbar className={"fixed-top " + navbarColor} expand="lg" color="info">
        <Container>
          <div className="navbar-translate">
            <NavbarBrand
              target="_blank"
              id="navbar-brand"
              onClick={() => nav("/homepage")}
            >
              Campus Placement
            </NavbarBrand>
            {/* <UncontrolledTooltip target="#navbar-brand">
              Designed by Invision. Coded by Creative Tim
            </UncontrolledTooltip> */}
            <button
              className="navbar-toggler navbar-toggler"
              onClick={() => {
                document.documentElement.classList.toggle("nav-open");
                setCollapseOpen(!collapseOpen);
              }}
              aria-expanded={collapseOpen}
              type="button"
            >
              <span className="navbar-toggler-bar top-bar"></span>
              <span className="navbar-toggler-bar middle-bar"></span>
              <span className="navbar-toggler-bar bottom-bar"></span>
            </button>
          </div>
          <Collapse
            className="justify-content-end"
            isOpen={collapseOpen}
            navbar
          >
            <Nav navbar>
              {/* custom nav links */}
              {}
              <NavItems role={role} toggleUpload={toggleupload} togglelogin={togglelogin} removerole={()=>setrole("none")}/>

              {/* upload placement record modal */}
              <Modal isOpen={modal1} toggle={() => setModal1(false)}>
                <div className="modal-header justify-content-center">
                  <button
                    className="close"
                    type="button"
                    onClick={() => setModal1(false)}
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
                        <button
                          type="button"
                          className="btn btn-success image-btn"
                        >
                          Upload{" "}
                          <span className="image-title">Upload Image</span>
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
                    onClick={() => setModal1(false)}
                  >
                    Close
                  </Button>
                </div>
              </Modal>

              {/* // sign in modal */}
              <Modal
                modalClassName="modal-mini modal-info"
                toggle={() => setModal2(false)}
                isOpen={modal2}
              >
                <div className="modal-header justify-content-center">
                  <div className="modal-profile">
                    <i className="now-ui-icons users_circle-08"></i>
                  </div>
                </div>
                <ModalBody>
                  <InputGroup className={firstFocus ? "input-group-focus" : ""}>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="fa fa-user-circle"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      value={username}
                      onChange={(e) => setuserName(e.target.value)}
                      placeholder="Username"
                      type="text"
                      onFocus={() => setFirstFocus(true)}
                      onBlur={() => setFirstFocus(false)}
                      className={styles.login_input}
                    ></Input>
                  </InputGroup>
                  <InputGroup className={lastFocus ? "input-group-focus" : ""}>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="now-ui-icons text_caps-small"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      value={password}
                      onChange={(e) => setpassword(e.target.value)}
                      placeholder="Password"
                      type="password"
                      onFocus={() => setLastFocus(true)}
                      onBlur={() => setLastFocus(false)}
                      className={styles.login_input}
                    ></Input>
                  </InputGroup>
                </ModalBody>
                <div className={`modal-footer ${styles.footer}`}>
                  <Button
                    className="btn-neutral"
                    color="link"
                    type="button"
                    onClick={handleLogin}
                  >
                    Login
                  </Button>
                  <Button
                    className="btn-neutral"
                    color="link"
                    type="button"
                    onClick={() => setModal2(false)}
                  >
                    Close
                  </Button>
                </div>
              </Modal>

              {/* view reasons of unemployability modal */}
              <Modal
                isOpen={reasonsModal}
                toggle={() => setReasonsModal(false)}
              >
                <ModalHeader toggle={() => setReasonsModal(false)}>
                  Modal title
                </ModalHeader>
                <ModalBody>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </ModalBody>
                <ModalFooter>
                  <Button color="primary">Do Something</Button>{" "}
                  <Button
                    color="secondary"
                    onClick={() => setReasonsModal(false)}
                  >
                    Cancel
                  </Button>
                </ModalFooter>
              </Modal>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default IndexNavbar;
