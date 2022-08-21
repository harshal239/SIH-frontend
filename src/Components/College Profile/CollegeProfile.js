import React, { useRef, useState } from "react";

// reactstrap components
import {
  Button,
  NavItem,
  NavLink,
  Nav,
  TabContent,
  TabPane,
  Container,
  Row,
  Col,
  UncontrolledDropdown,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledTooltip,
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody
} from "reactstrap";

import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
} from "chart.js";

import { Pie, Bar, Line } from "react-chartjs-2";

import {
  PieData,
  BarData,
  Chart3dData,
  mapRegionData,
  LineData,
  hbarData,
} from "../dataset";

import DatamapsIndia from "react-datamaps-india";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import ScrollIntoView from "react-scroll-into-view";

import useIntersection from "Components/CustomHooks/useIntersection";
// core components
import CollegeHeader from "./CollegeHeader";
import DefaultFooter from "Components/Footers/DefaultFooter.js";

import styles from "../profile.module.css";
import axios from "axios"
import { baseurl } from "Components/baseUrl"
// import { getstats } from "./GetData";
// import { useLocation } from 'react-router-dom';

function CollegeProfile() {
  const [filterModal, setfilterModal] = useState(false);
  const [stats, setstats] = useState({});
  
  const getstats = () => {
    let userid = localStorage.getItem('userid');
    let temp;
    axios.get(baseurl + '/chart/placedUnplacedGraph/' + userid)
    .then(res=>{
        console.log(res.data);
        setstats(res.data);
    })
  }
  React.useEffect(() => {
    // console.log(location);
    // let userid = localStorage.getItem('userid');
    // console.log(userid);
    getstats();
    document.body.classList.add("profile-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("profile-page");
      document.body.classList.remove("sidebar-collapse");
    };
  }, []);

  ChartJS.register(
    Legend,
    Tooltip, // common
    ArcElement, // pie
    CategoryScale, // bar
    LinearScale,
    BarElement,
    Title,
    LineElement,
    PointElement
  );

  // dummy data for pie chart

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Chart.js Bar Chart",
      },
    },
  };

  const hbarOptions = {
    indexAxis: "y",
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: "right",
      },
      title: {
        display: true,
        text: "Chart.js Horizontal Bar Chart",
      },
    },
  };

  const pieRef = useRef();
  const barRef = useRef();
  const diversityBarRef = useRef();
  const mapRef = useRef();
  const pieInViewport = useIntersection(pieRef, "-300px");
  const barInViewport = useIntersection(barRef, "-300px");
  const diversityBarInViewport = useIntersection(diversityBarRef, "-300px");
  const statArray = [1, 2, 3, 4, 5, 6];
  const filterArray = [1, 2, 3, 4, 5, 6, 7];

  return (
    <>
      <div className="wrapper">
        <CollegeHeader />
        <div className="section">
          <Container>
            <Row style={{ marginTop: -106 }}>
              {
                // statistics cards
                // console.log(stats)
                (Object.entries(stats).map(([k,v]) => {

                  return (
                    <div className="col-xxl-3 col-md-4">
                      <div className="card info-card sales-card">
                        <div className="card-body">
                          <h5 className="card-title">
                            {k}
                            {/* <span>| 2020</span> */}
                          </h5>
                          <div className="d-flex align-items-center">
                            <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                              <i className="bi bi-people"></i>
                            </div>
                            <div className="ps-3">
                              <h6>{v}</h6>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                }))

                  

                  
                }

              
            </Row>
            <h3 className="title">About</h3>
            <h5 className="description">
              An artist of considerable range, Ryan — the name taken by
              Melbourne-raised, Brooklyn-based Nick Murphy — writes, performs
              and records all of his own music, giving it a warm, intimate feel
              with a solid groove structure. An artist of considerable range.
            </h5>

            {/* FILTERS */}
          </Container>

          <Modal
            isOpen={filterModal}
            toggle={() => setfilterModal(false)}
            fullscreen={true}
            className={styles.modal_size}
            scrollable={false}
            contentClassName={styles.modal__content}
          >
            <ModalHeader toggle={() => setfilterModal(false)}>
              Filters
            </ModalHeader>
            <ModalBody>
              {filterArray.map((item) => {
                return (
                  <Dropdown isOpen={false}>
                    <DropdownToggle
                      caret
                      color="neutral"
                      className={styles.drp_toggle}
                    >
                      Default value
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem header>Header</DropdownItem>
                      <DropdownItem disabled>Action</DropdownItem>
                      <DropdownItem>Another Action</DropdownItem>
                      <DropdownItem divider />
                      <DropdownItem>Another Action</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                );
              })}
            </ModalBody>
            <ModalFooter>
              <Button color="primary">Submit</Button>{" "}
              <Button color="secondary" onClick={() => setfilterModal(false)}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>


          <div className={`container ${styles.graph_container}`}>
            <div className={styles.filter_row}>
              <h3>Graphs and Charts</h3>
              <span
                className="now-ui-icons design_bullet-list-67"
                onClick={() => setfilterModal(true)}
              />

              <div className={styles.filter_container}>
                {filterArray.map((item) => {
                  return (
                    <Dropdown isOpen={false}>
                      <DropdownToggle
                        caret
                        color="neutral"
                        className={styles.drp_toggle}
                      >
                        Default value
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem header>Header</DropdownItem>
                        <DropdownItem disabled>Action</DropdownItem>
                        <DropdownItem>Another Action</DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem>Another Action</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  );
                })}
              </div>
            </div>

            {/* main container for graph and charts */}
            <Row>
              {/* graph nav index */}
              <Col md="3" className={styles.sticky__index}>
                <ul className={styles.graph_index_list}>
                  <li className={pieInViewport ? styles.active : ""}>
                    <i className="now-ui-icons business_chart-pie-36"> </i>
                    Salary Based Pie Chart
                  </li>
                  <li className={barInViewport ? styles.active : ""}>
                    <i className="now-ui-icons business_chart-bar-32"> </i>
                    <ScrollIntoView selector="#barid" alignToTop={true}>
                      <span>Gender Diversity</span>
                    </ScrollIntoView>
                  </li>
                  <li className={diversityBarInViewport ? styles.active : ""}>
                    <i className="now-ui-icons location_map-big" />
                    Top 10 hiring Companies
                  </li>
                </ul>
              </Col>
              <Col md="9" className={styles.graphs_left}>
                <div ref={pieRef} className={styles.pie}>
                  <Pie data={PieData} />
                </div>
                <div ref={barRef} id="barid">
                  <Line options={barOptions} data={LineData} />
                </div>
                <div ref={diversityBarRef}>
                  <Bar options={hbarOptions} data={hbarData} />
                </div>
              </Col>
            </Row>
          </div>
        </div>
        <DefaultFooter />
      </div>
    </>
  );
}

export default CollegeProfile;
