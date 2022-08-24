import { useNavigate } from "react-router-dom";
import axios from "axios";
import { baseurl } from "Components/baseUrl";

// reactstrap components
import {NavItem, NavLink} from "reactstrap";

import React from 'react'


const NavItems = ({role, togglelogin, removerole, userId}) => {

    const nav = useNavigate();
  
    const handlelogout = () => {
      axios
        .get(baseurl+"/user/logout")
        .then((res)=>{
          console.log(res);
          alert("Logout Successfull");
          removerole();
          localStorage.removeItem('role');
          localStorage.removeItem('userid');
        }
        );
    }
  
    switch(role){
      case "college":
        return(
          <>
          <NavItem>
            <NavLink onClick={() => nav("/college-profile", {state:userId})}>
              College Dashboard
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink onClick={() => nav('/upload-record')}>
              Upload placement record
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink onClick={()=> nav('/add-reasons')}>
              Add Reasons of Unemployability
            </NavLink>
          </NavItem>
 
          <NavItem>
              <NavLink onClick={() => nav("/aicte-profile")}>AICTE Statistics</NavLink>
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
              Coorporate Dashboard
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink>
                Reason of Unemployability
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink onClick={() => nav("/aicte-profile")}>AICTE Statistics</NavLink>
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
              <NavLink onClick={() => nav("/aicte-profile")}>AICTE Statistics</NavLink>
            </NavItem>
            <NavItem>
              <NavLink onClick={()=>nav("/unemployability-reasons")}>
                Reason of Unemployability
              </NavLink>
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
                  Sign-In
                </NavLink>
              </NavItem>
            </>
        );
    }
  }

  export default NavItems;