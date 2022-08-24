import React from "react";

// reactstrap components
import { Button, Container } from "reactstrap";
import styles from './landing.module.css';

// core components

function Header() {
  let pageHeader = React.createRef();

  React.useEffect(() => {
    if (window.innerWidth > 991) {
      const updateScroll = () => {
        let windowScrollTop = window.pageYOffset / 3;
        pageHeader.current.style.transform =
          "translate3d(0," + windowScrollTop + "px,0)";
      };
      window.addEventListener("scroll", updateScroll);
      return function cleanup() {
        window.removeEventListener("scroll", updateScroll);
      };
    }
  });
  return (
    <>
      <div className="page-header page-header-small" style={{"minHeight":"70vh"}}>
        <div
          // className="page-header-image"
          className={`page-header-image ${styles.header_image}`}
          style={{
            backgroundImage: "url(" + require("assets/img/landing_bg.jpg") + ")"
          }}
          ref={pageHeader}
        ></div>
        {/* <div className="content-center"> */}
        <Container>
            <div className="row">
              <div className="col-lg-9" style={{"textAlign":"left"}}>
                <div className={styles.slider_content}>
                  <h2 className={styles.heading}>We Are Proud</h2>
                  <h3>Students of <span>D.H.E. Goa</span></h3>
                  <p>
                     Needs enables you to harness the power of your 
                    network. Whatever may be the need (academic, relocation,
                    career, projects, mentorship, etc. you can ask the community
                    and get responses in three.
                  </p>
                  <div className="slider-btn">
                    <a href="#about-area" class="btn btn-brand smooth-scroll"
                      >our mission</a
                    >
                    <a href="about.html" class="btn btn-brand-rev">our story</a>
                  </div>
                </div>
              </div>
            </div>
            </Container>
          </div>
          {/* <Container className={styles.heading}>

            <h2>We Are Proud</h2>
          </Container> */}
  
        {/* </div> */}
    </>
  );
}

export default Header;
