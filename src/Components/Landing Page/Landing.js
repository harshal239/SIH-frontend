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
  Col,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  CardImg
} from "reactstrap";
import IndexNavbar from "Components/Navbars/IndexNavbar";
// core components
import Header from "./Header";
import DefaultFooter from "Components/Footers/DefaultFooter.js";
import DarkFooter from "Components/Footers/DarkFooter";
import styles from './landing.module.css';
import lg1 from '../../alumini_assets/img/fun-fact/picture.svg';


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

        <Container>
          <Row>
            <Col md='6'>
      <Card>
        <CardImg top width="100%" src={require("assets/img/login.jpg")} />
        <CardBody>
          <CardTitle>Card title</CardTitle>
          <CardSubtitle>Card subtitle</CardSubtitle>
          <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
          <Button>Button</Button>
        </CardBody>
      </Card>
            </Col>
            
            <Col md='6'>
      <Card>
        <CardImg top width="100%" src={require("assets/img/login.jpg")} alt="Card image cap" />
        <CardBody>
          <CardTitle>Card title</CardTitle>
          <CardSubtitle>Card subtitle</CardSubtitle>
          <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
          <Button>Button</Button>
        </CardBody>
      </Card>
            </Col>
            
            <Col md='6'>
      <Card>
        <CardImg top width="100%" src={require("assets/img/login.jpg")} alt="Card image cap" />
        <CardBody>
          <CardTitle>Card title</CardTitle>
          <CardSubtitle>Card subtitle</CardSubtitle>
          <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
          <Button>Button</Button>
        </CardBody>
      </Card>
            </Col>
            <Col md='6'>
      <Card>
        <CardImg top width="100%" src={require("assets/img/login.jpg")} alt="Card image cap" />
        <CardBody>
          <CardTitle>Card title</CardTitle>
          <CardSubtitle>Card subtitle</CardSubtitle>
          <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
          <Button>Button</Button>
        </CardBody>
      </Card>
            </Col>
          </Row>
        </Container>
        <div className="section section-team text-center">


        <section className={styles.fact_area}>
      <div class="container-fluid">
        <div class="row text-center">
          <div class="col-lg-3 col-sm-6">
            <div class="single-funfact-wrap">
              <div class="funfact-icon">
                <img src="../../alumini_assets/img/fun-fact/user.svg" alt="Funfact" />
              </div>
              <div class="funfact-info">
                <h5 className={styles.fact_count}>4025</h5>
                <p>Members</p>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-sm-6">
            <div class="single-funfact-wrap">
              <div class="funfact-icon">
                    {/* <img src={lg1}/> */}
                <img src="../../alumini_assets/img/fun-fact/picture.svg" alt="Funfact" />
              </div>
              <div class="funfact-info">
              <h5 className={styles.fact_count}>8725</h5>
                <p>Photos</p>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-sm-6">
            <div class="single-funfact-wrap">
              <div class="funfact-icon">
                <img src="../../alumini_assets/img/fun-fact/event.svg" alt="Funfact" />
              </div>
              <div class="funfact-info">
                <h5><span className={styles.fact_count}>321</span>+</h5>
                <p>Events</p>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-sm-6">
            <div class="single-funfact-wrap">
              <div class="funfact-icon">
                <img src="../../alumini_assets/img/fun-fact/medal.svg" alt="Funfact" />
              </div>
              <div class="funfact-info">
                <h5><span className={styles.fact_count}>32</span>+</h5>
                <p>Awards</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

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
                          src={require("assets/img/default-avatar.png")}
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
        {/* <DefaultFooter /> */}
        <DarkFooter/>
      </div>
    </>
  );
}

export default Landing;
