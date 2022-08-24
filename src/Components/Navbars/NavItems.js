import { useNavigate } from "react-router-dom";
import axios from "axios";
import { baseurl } from "Components/baseUrl";

// reactstrap components
import {NavItem, NavLink} from "reactstrap";

import React from 'react';
import styles from './nav.module.css';

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
          <NavItem className={styles.nav_item}>
            <NavLink onClick={() => nav("/college-profile", {state:userId})}>
              <a className={styles.nav_item}>College Dashboard</a> 
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink onClick={() => nav('/upload-record')}>
            <a className={styles.nav_item}>Upload placement record</a> 
              
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink onClick={()=> nav('/add-reasons')}>
            <a className={styles.nav_item}>Add Reasons of Unemployability</a> 
              
            </NavLink>
          </NavItem>
 
          <NavItem>
              <NavLink onClick={() => nav("/aicte-profile")}>
              <a className={styles.nav_item}>AICTE Statistics</a> 
              </NavLink>
          </NavItem>
          <NavItem>
            <NavLink onClick={()=>handlelogout()}>
            <a className={styles.nav_item}>Logout</a> 
              </NavLink>
          </NavItem>
          </>
        );
      case "corporate":
        return(
          <>
            <NavItem>
              <NavLink onClick={() => nav("/coorporate-profile")}>
              <a className={styles.nav_item}>Coorporate Dashboard</a> 
              
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink>
              <a className={styles.nav_item}>Reason of Unemployability</a> 
                
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink onClick={() => nav("/aicte-profile")}>
              <a className={styles.nav_item}>AICTE Statistics</a> 
            </NavLink>
            </NavItem>
            <NavItem>
            <NavLink onClick={()=>handlelogout()}>
            <a className={styles.nav_item}>Logout</a> 
              </NavLink>
            </NavItem>
          </>
        );
      case "aicte":
        return(
          <>
            <NavItem >
              <NavLink onClick={() => nav("/aicte-profile")}>
              <a className={styles.nav_item}>AICTE Statistics</a> 
                </NavLink>
            </NavItem>
            <NavItem>
              <NavLink onClick={()=>nav("/unemployability-reasons")}>
              <a className={styles.nav_item}>Reason of Unemployability</a> 
                
              </NavLink>
            </NavItem>
            <NavItem>
            <NavLink onClick={()=>handlelogout()}>
            <a className={styles.nav_item}>Logout</a> 
              </NavLink>
            </NavItem>
          </>
        );
      default:
        return(
            <>
              <NavItem>
                <NavLink onClick={() => nav("/sign-up")}>
                <a className={styles.nav_item}>Sign-Up</a> 
                  </NavLink>
              </NavItem>
              <NavItem>
                <NavLink onClick={() => togglelogin()}>
                <a className={styles.nav_item}> Sign-In</a> 
                 
                </NavLink>
              </NavItem>
            </>
        );
    }
  }

  export default NavItems;