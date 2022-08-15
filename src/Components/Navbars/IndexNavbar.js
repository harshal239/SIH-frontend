import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from './modal.module.css';


// reactstrap components
import {
  Button,
  FormGroup,
  Modal,
  ModalBody,
  Row,
  Col,
  PopoverBody,
  PopoverHeader,
  UncontrolledPopover,
  Collapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  UncontrolledTooltip,
  InputGroup,
  Input,
  InputGroupText,
  InputGroupAddon,
  Label,
  CustomInput
} from "reactstrap";

function IndexNavbar() {
  
  const [modal1, setModal1] = useState(false);
  const [modal2, setModal2] = useState(false);

  
  const [firstFocus, setFirstFocus] = useState(false);
  const [lastFocus, setLastFocus] = useState(false);

  const [navbarColor, setNavbarColor] = useState("navbar-transparent");
  const [collapseOpen, setCollapseOpen] = useState(false);
  const nav = useNavigate();
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
              href="#"
              target="_blank"
              id="navbar-brand"
            >
              Campus Placement
            </NavbarBrand>
            <UncontrolledTooltip target="#navbar-brand">
              Designed by Invision. Coded by Creative Tim
            </UncontrolledTooltip>
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
              <NavItem>
                <NavLink onClick={()=>nav('/login')}>Login</NavLink>
              </NavItem>
              <NavItem>             
                <NavLink onClick={()=>nav('/login-page')}>Login Page</NavLink>
              </NavItem>
              <NavItem>
                <NavLink onClick={()=>nav('/nucleo-icons')}>Nuclie Icons</NavLink>    
              </NavItem>
              <NavItem>
                <NavLink onClick={()=>nav('/landing-page')}>Landing Page</NavLink>
              </NavItem>
              <NavItem>
                <NavLink onClick={()=>nav('profile-page')}>Profile Page</NavLink>
              </NavItem>
              <NavItem>
                <NavLink onClick={()=>nav('/aicte-profile')}>AICTE</NavLink>
              </NavItem>
              <NavItem>
                <NavLink onClick={()=>nav('/college-profile')}>PICT</NavLink>
              </NavItem>
              <NavItem>
                <NavLink onClick={() => setModal1(true)}>Upload placement record</NavLink>
              </NavItem>
              <NavItem>
                <NavLink onClick={() => setModal2(true)}>Sign In</NavLink>
              </NavItem>

            
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
                  <button className={styles.file_upld_btn} type="file" onclick="$('.file-upload-input').trigger( 'click' )">
                    Add file
                  </button>
          
                  <div className={styles.img_upload_wrapper}>
                    <input className={styles.file_upload_input} type="file" onchange="readURL(this);" accept="image/*" />
                    <div className={styles.drag_text}>
                      <h3> or Drag and drop a file here!</h3>
                    </div>
                  </div>

                  
                  <div className={styles.file_upload_content}>
                    <img className={styles.file_upload_image} src="#" alt="your image" />
                    <div className={styles.image_title_wrap}>
                      <button type="button" onclick="removeUpload()" className="image-btn btn btn-danger">
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
                    onClick={() => setModal1(false)}
                  >
                    Close
                  </Button>
                </div>
              </Modal>
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
                      placeholder="Password"
                      type="password"
                      onFocus={() => setLastFocus(true)}
                      onBlur={() => setLastFocus(false)}
                      className={styles.login_input}
                    ></Input>
                  </InputGroup>

                    
                    <FormGroup>
                      <Label for="exampleCheckbox">Role</Label>
                      <div>
                        <CustomInput type="radio" id="exampleCustomRadio" name="customRadio" label="College" />
                        <CustomInput type="radio" id="exampleCustomRadio2" name="customRadio" label="AICTE" />
                        <CustomInput type="radio" id="exampleCustomRadio3" label="Coorporate"/>
                      </div>
                    </FormGroup>
                </ModalBody>
                <div className={`modal-footer ${styles.footer}`}>
                  <Button className="btn-neutral" color="link" type="button" onClick={()=>console.log("Login click")}>
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
              
            </Nav>
          </Collapse>
        </Container>
      </Navbar>


















      
    </>
  );
}

export default IndexNavbar;
