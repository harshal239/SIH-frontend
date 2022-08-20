import { useNavigate } from "react-router-dom";
import axios from "axios";
import { baseurl } from "Components/baseUrl";
import styles from "./modal.module.css";

// reactstrap components
import {NavItem, NavLink} from "reactstrap";

import React from 'react'


const NavItems = ({role, toggleUpload, togglelogin, removerole}) => {

    const nav = useNavigate();
  
    const handlelogout = () => {
      axios
        .get(baseurl+"/user/logout")
        .then((res)=>{
          console.log(res);
          alert("Logout Successfull");
          removerole();
          localStorage.removeItem('role');
        }
        );
    }
  
    switch(role){
      case "college":
        return(
          <>
          <NavItem>
            <NavLink onClick={() => nav("/college-profile")}>
              College
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink onClick={() => toggleUpload()}>
              Upload placement record
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink onClick={()=>handlelogout()}>Logout</NavLink>
          </NavItem>
          </>
        );
      case "corporate":
        return(
          <>
            <NavItem>
              <NavLink onClick={() => nav("/coorporate-profile")}>
              Coorporate
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink>
                Reason of Unemployability
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink onClick={()=>handlelogout()}>Logout</NavLink>
            </NavItem>
          </>
        );
      case "aicte":
        return(
          <>
            <NavItem>
              <NavLink onClick={() => nav("/aicte-profile")}>AICTE</NavLink>
            </NavItem>
            <NavItem>
              <NavLink onClick={()=>handlelogout()}>Logout</NavLink>
            </NavItem>
          </>
        );
      default:
        return(
            <>
              <NavItem>
                <NavLink onClick={() => nav("/sign-up")}>Sign-Up</NavLink>
              </NavItem>
              <NavItem>
                <NavLink onClick={() => togglelogin()}>
                  Sign In
                </NavLink>
              </NavItem>
            </>
        );
    }
  }

  export default NavItems;