import React from "react";

// reactstrap components
import {
  Button,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col
} from "reactstrap";
import IndexNavbar from "Components/Navbars/IndexNavbar";
// core components
import Header from "./Header";
import DefaultFooter from "Components/Footers/DefaultFooter.js";

function Landing() {
  const [firstFocus, setFirstFocus] = React.useState(false);
  const [lastFocus, setLastFocus] = React.useState(false);
  React.useEffect(() => {
    document.body.classList.add("landing-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("landing-page");
      document.body.classList.remove("sidebar-collapse");
    };
  }, []);


  const teamMembers = ["Utkarsha Nehe", "Vedangi Bhavsar", "Sudarshan Gawale", "Harshal Walunj", "Yuvraj Deshmukh", "Shubham Sardar"];
  return (
    <>
      <div className="wrapper">
      <IndexNavbar isfixed={false}/>
        <Header/>
        <div className="section section-about-us">
          <Container>
            <Row>
              <Col className="ml-auto mr-auto text-center" md="8">
                <h2 className="title">Who we are?</h2>
                <h5 className="description">
                  Campus Placement is a platform which keeps track of campus placement of all technical institutes/universities throughout the country.
                </h5>
              </Col>
            </Row>
            <div className="separator separator-primary"></div>
            <div className="section-story-overview">
              <Row>
                <Col md="6">
                  <div
                    className="image-container image-left"
                    style={{
                      backgroundImage:
                        "url(" + require("assets/img/stat1.jpg") + ")"
                    }}
                  >
                    <p className="blockquote blockquote-info">
                      "Our goal is to reduce issue of unemployment and improvise it substantially " <br></br>
                      <br></br>
                      <small>-NOAA</small>
                    </p>
                  </div>
                  <div
                    className="image-container"
                    style={{
                      backgroundImage:
                        "url(" + require("assets/img/stat3.jpg") + ")"
                    }}
                  ></div>
                </Col>
                <Col md="5">
                  <div
                    className="image-container image-right"
                    style={{
                      backgroundImage:
                        "url(" + require("assets/img/stat2.jpg") + ")"
                    }}
                  ></div>
                  <h3>
                    Project
                  </h3>
                  <p>
                  Our project proposes building an interlinked platform which keeps track of campus placement in all of the technical institutes/universities throughout the country through which government bodies like AICTE can view and analyze the ratio of employability/unemployability across India. 
                  </p>
                  <p>This platform provides critical stats based on different parameters like institute type, state, program, stream, year, salary, etc. which helps the government to come out with appropriate policies for reducing unemployment.
                  </p>
                  <p>Non-conventional hyper parameters like internships, projects, co-curricular achievements, etc. of students are used to predict the employability score of each candidate which in turn helps AICTE to provide equal opportunities/resources and devise the employability decisions one year ahead of time.
                  </p>
                </Col>
              </Row>
            </div>
          </Container>
        </div>
        <div className="section section-team text-center">
          <Container>
            <h2 className="title">Here is our team</h2>
            <div className="team">
              <Row>

                {teamMembers.map(person => {
                  return(
                    <Col md="4">
                      <div className="team-player">
                        <img
                          alt="..."
                          className="rounded-circle img-fluid img-raised"
                          src={require("assets/img/julie.jpg")}
                        ></img>
                        <h4 className="title">{person}</h4>
                        <p className="category text-info">Developer</p>
                        <p className="description">
                          You can write here details about one of your team members.e{" "}
                          <a href="#pablo" onClick={(e) => e.preventDefault()}>
                            links
                          </a>{" "}
                        </p>
                        <Button
                          className="btn-icon btn-round"
                          color="info"
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          <i className="fab fa-twitter"></i>
                        </Button>
                        <Button
                          className="btn-icon btn-round"
                          color="info"
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          <i className="fab fa-instagram"></i>
                        </Button>
                        <Button
                          className="btn-icon btn-round"
                          color="info"
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          <i className="fab fa-facebook-square"></i>
                        </Button>
                      </div>
                    </Col>

                  );
                })}
              </Row>
            </div>
          </Container>
        </div>
        <div className="section section-contact-us text-center">
          <Container>
            <h2 className="title">Contact Us?</h2>
            <p className="description">subtitle.</p>
            <Row>
              <Col className="text-center ml-auto mr-auto" lg="6" md="8">
                <InputGroup
                  className={
                    "input-lg" + (firstFocus ? " input-group-focus" : "")
                  }
                >
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="now-ui-icons users_circle-08"></i>
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="First Name..."
                    type="text"
                    onFocus={() => setFirstFocus(true)}
                    onBlur={() => setFirstFocus(false)}
                  ></Input>
                </InputGroup>
                <InputGroup
                  className={
                    "input-lg" + (lastFocus ? " input-group-focus" : "")
                  }
                >
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="now-ui-icons ui-1_email-85"></i>
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Email..."
                    type="text"
                    onFocus={() => setLastFocus(true)}
                    onBlur={() => setLastFocus(false)}
                  ></Input>
                </InputGroup>
                <div className="textarea-container">
                  <Input
                    cols="80"
                    name="name"
                    placeholder="Type a message..."
                    rows="4"
                    type="textarea"
                  ></Input>
                </div>
                <div className="send-button">
                  <Button
                    block
                    className="btn-round"
                    color="info"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                    size="lg"
                  >
                    Send Message
                  </Button>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        <DefaultFooter />
      </div>
    </>
  );
}

export default Landing;
