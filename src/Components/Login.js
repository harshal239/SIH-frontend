import { useState} from "react";
import axios from "axios";
import { baseurl } from "Components/baseUrl";
import {Modal, ModalBody, Input, InputGroup, InputGroupAddon, InputGroupText, Button} from 'reactstrap'
import styles from "./modal.module.css"; 

const Login = ({isopen, togglemodal, passRole, setId}) => {
    const [username, setuserName] = useState("");
    const [password, setpassword] = useState("");

    const [firstFocus, setFirstFocus] = useState(false);
    const [lastFocus, setLastFocus] = useState(false);

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
            passRole(res.data.body.user.role);
            setId(res.data.body.user._id);
            togglemodal();
            localStorage.setItem('role',res.data.body.user.role);
            localStorage.setItem('userid',res.data.body.user._id);
            alert("Login Successfull , role: ", res.data.body.user.role);
          })
          .catch((err) => console.log(err));
      };

      
  return (
    <Modal
      modalClassName="modal-mini modal-info"
      toggle={togglemodal}
      isOpen={isopen}
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
          onClick={togglemodal}
        >
          Close
        </Button>
      </div>
    </Modal>
  );
};

export default Login;
